import deipRpc from '@deip/rpc-client';
import { AccessService } from '@deip/access-service';
import { BlockchainService } from '@deip/blockchain-service';

import { Singleton } from '@deip/toolbox';
import { ProposalsHttp } from './ProposalsHttp';

class ProposalsService extends Singleton {
  proposalsHttp = ProposalsHttp.getInstance();
  accessService = AccessService.getInstance();
  blockchainService = BlockchainService.getInstance();

  createProposal({ privKey, username, isApproved = true }, propagate, {
    creator,
    proposedOps,
    expirationTime,
    reviewPeriodSeconds,
    extensions
  },
    refBlock = {},
    preOps = [],
    postOps = []) {
    
    const { refBlockNum, refBlockPrefix } = refBlock;
    const refBlockPromise = refBlockNum && refBlockPrefix
      ? Promise.resolve({ refBlockNum, refBlockPrefix })
      : this.blockchainService.getRefBlockSummary();

    return refBlockPromise
      .then((refBlock) => {

        const [proposal_external_id, create_proposal_op] = deipRpc.operations.createEntityOperation(['create_proposal', {
          creator: creator,
          proposed_ops: proposedOps,
          expiration_time: expirationTime,
          review_period_seconds: reviewPeriodSeconds,
          extensions
        }], refBlock);

        if (isApproved) {

          const update_proposal_op = ['update_proposal', {
            external_id: proposal_external_id,
            active_approvals_to_add: [username],
            active_approvals_to_remove: [],
            owner_approvals_to_add: [],
            owner_approvals_to_remove: [],
            key_approvals_to_add: [],
            key_approvals_to_remove: [],
            extensions: []
          }];

          postOps.unshift(update_proposal_op);
        }

        return this.blockchainService.signOperations([...preOps, create_proposal_op, ...postOps], privKey, refBlock)
          .then((signedTx) => {
            return propagate
              ? this.proposalsHttp.createProposal({ tx: signedTx })
              : Promise.resolve({ tx: signedTx });
          })
      })
  }


  updateProposal({ privKey, username }, {
    externalId,
    activeApprovalsToAdd,
    activeApprovalsToRemove,
    ownerApprovalsToAdd,
    ownerApprovalsToRemove,
    keyApprovalsToAdd,
    keyApprovalsToRemove,
    extensions
  }, propagate = true) {

    const operation = ['update_proposal', {
      external_id: externalId,
      active_approvals_to_add: activeApprovalsToAdd || [],
      active_approvals_to_remove: activeApprovalsToRemove || [],
      owner_approvals_to_add: ownerApprovalsToAdd || [],
      owner_approvals_to_remove: ownerApprovalsToRemove || [],
      key_approvals_to_add: keyApprovalsToAdd || [],
      key_approvals_to_remove: keyApprovalsToRemove || [],
      extensions: extensions || []
    }];

    return this.blockchainService.signOperations([operation], privKey)
      .then((signedTx) => {
        return propagate
          ? this.proposalsHttp.updateProposal({ tx: signedTx })
          : Promise.resolve({ tx: signedTx });
      })
  }

  deleteProposal({ privKey, username }, {
    externalId,
    account,
    authority,
    extensions
  }, propagate = true) {

    const operation = ['delete_proposal', {
      external_id: externalId,
      account,
      authority,
      extensions
    }];
    
    return this.blockchainService.signOperations([operation], privKey)
      .then((signedTx) => {
        return propagate
          ? this.proposalsHttp.deleteProposal({ tx: signedTx })
          : Promise.resolve({ tx: signedTx });
      })
  }

  getProposalsByCreator(account) {
    return deipRpc.api.getProposalsByCreatorAsync(account)
      .then((result) => {
        const proposals = result.map(proposal => {
          const { proposed_transaction: { operations: [[op_name, op_payload], ...rest] } } = proposal;
          const op_tag = deipRpc.operations.getOperationTag(op_name);
          return { ...proposal, action: op_tag, payload: op_payload };
        });
        return proposals;
      })
  }

  getAccountProposals(account, status = 0) {
    return this.proposalsHttp.getAccountProposals(account, status);
  }

  getProposal(externalId) {
    return this.proposalsHttp.getProposal(externalId);
  }

}

export {
  ProposalsService
};
