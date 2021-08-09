import BaseOperationsRegistry from './../../base/BaseOperationsRegistry';
import { assert } from '@deip/toolbox';
import { hexToU8a } from '@polkadot/util';
import { APP_CMD } from '@deip/constants';
import { daoIdToAddress } from './utils';


const SUBSTRATE_OP_CMD_MAP = (chainNodeClient) => {

  return {

    [APP_CMD.CREATE_ACCOUNT]: ({
      entityId,
      isTeamAccount,
      fee,
      creator,
      description,
      authority
    }) => {

      const signatories = authority.active.auths.map((auth) => {
        return auth.name ? daoIdToAddress(`0x${auth.name}`, chainNodeClient.registry) : auth.key;
      });
      const threshold = authority.active.weight;

      if (!isTeamAccount) {
        assert(signatories.length === 1 && threshold === 0, `User DAO must have a threshold equal to 0 with a single signatory`);
      } else {
        assert(signatories.length > 1 && threshold !== 0, `Multisig DAO threshold must be more than 1`);
      }

      const createAccountOp = chainNodeClient.tx.deipOrg.create(
        /* dao_id: */ `0x${entityId}`,
        /* key_source: */ {
          "signatories": signatories,
          "threshold": threshold
        }
      );

      return [createAccountOp];
    },


    [APP_CMD.CREATE_PROJECT]: ({
      entityId,
      teamId,
      description,
      domains,
      isPrivate
    }) => {

      const createProjectOp = chainNodeClient.tx.deipOrg.onBehalf(`0x${teamId}`,
        chainNodeClient.tx.deip.createProject(
          /* "is_private": */ isPrivate,
          /* "external_id": */ `0x${entityId}`,
          /* "team_id": */ { Org: `0x${teamId}` },
          /* "description": */ `0x${description}`,
          /* "domains": */ domains.map((domain) => `0x${domain}`)
        )
      );

      return [createProjectOp];
    },


    [APP_CMD.CREATE_PROPOSAL]: ({
      entityId,
      creator,
      proposedCmds,
      expirationTime,
      reviewPeriodSeconds
    }, { cmdToOps }) => {


      const calls = proposedCmds.reduce((arr, cmd) => {
        const ops = cmdToOps(cmd);
        for (let i = 0; i < ops.length; i++) {
          const op = ops[i];

          const isOnBehalf = op.method.meta.toHex() === chainNodeClient.tx.deipOrg.onBehalf.meta.toHex();
          assert(isOnBehalf, `Proposal can include 'onBehalf' calls only and cannot include account initialization`);

          const daoId = op.method.args[0];
          const method = op.method.args[1];

          const call = chainNodeClient.registry.createType('Call', hexToU8a(method.toHex()), method.meta);
          const extrinsic = chainNodeClient.registry.createType('Extrinsic', call);

          arr.push({ call: extrinsic, account: { Org: daoId.toHex() } });
        }

        return arr;
      }, []);

      const createProposalOp = chainNodeClient.tx.deipOrg.onBehalf(`0x${creator}`,
        chainNodeClient.tx.deipProposal.propose(
          /* batch: */ calls,
          /* external_id: */ `0x${entityId}`
        )
      );

      return [createProposalOp];
    },


    [APP_CMD.UPDATE_PROPOSAL]: ({
      entityId,
      activeApprovalsToAdd,
      activeApprovalsToRemove,
      ownerApprovalsToAdd,
      ownerApprovalsToRemove,
      keyApprovalsToAdd,
      keyApprovalsToRemove
    }) => {

      const approvers = [...(activeApprovalsToAdd || []), ...(ownerApprovalsToAdd || []), ...(keyApprovalsToAdd || [])].reduce((arr, approver) => {
        if (!arr.includes(approver))
          arr.push(approver);
        return arr;
      }, []);

      const rejectors = [...(activeApprovalsToRemove || []), ...(ownerApprovalsToRemove || []), ...(keyApprovalsToRemove || [])].reduce((arr, rejector) => {
        if (!arr.includes(rejector))
          arr.push(rejector);
        return arr;
      }, []);


      assert(approvers.length || rejectors.length, "Proposal can be either approved or rejected");

      const ops = [];
      for (let i = 0; i < approvers.length; i++) {
        const approver = approvers[i];
        const approveProposalOp = chainNodeClient.tx.deipOrg.onBehalf(`0x${approver}`,
          chainNodeClient.tx.deipProposal.decide(
           /* external_id: */ `0x${entityId}`,
           /* decision: */ 'Approve'
          )
        );
        ops.push(approveProposalOp);
      }

      for (let i = 0; i < rejectors.length; i++) {
        const rejector = rejectors[i];
        const rejectProposalOp = chainNodeClient.tx.deipOrg.onBehalf(`0x${rejector}`,
          chainNodeClient.tx.deipProposal.decide(
            /* external_id: */ `0x${entityId}`,
            /* decision: */ 'Reject'
          )
        );
        ops.push(rejectProposalOp);
      }

      return ops;
    },

  }
}


class SubstrateChainOperationsRegistry extends BaseOperationsRegistry {
  constructor(chainNodeClient) {
    super(SUBSTRATE_OP_CMD_MAP(chainNodeClient));
  }
}


export default SubstrateChainOperationsRegistry;
