import ProtocolCmd from './../base/ProtocolCmd';
import ProtocolEntityCmd from './../base/ProtocolEntityCmd';
import { APP_CMD } from './../constants';
import { assert } from '@deip/toolbox';


class CreateProposalCmd extends ProtocolEntityCmd {

  constructor(cmdPayload, txContext) {

    const {
      entityId,
      creator,
      proposedCmds,
      expirationTime,
      reviewPeriodSeconds
    } = cmdPayload;


    assert(!!creator, "'creator' is required");
    assert(!!proposedCmds && proposedCmds.length, "Protocol proposal must contain at least 1 ProtocolCmd");
    for (let i = 0; i < proposedCmds.length; i++) {
      const protocolCmd = proposedCmds[i];
      assert(protocolCmd instanceof ProtocolCmd, "Proposal can contain only protocol commands");
    }

    super(APP_CMD.CREATE_PROPOSAL, cmdPayload, txContext);
  }

  getProposedCmds() {
    return this._cmdPayload.proposedCmds;
  }

  getProtocolEntityId() {
    const [opName, { external_id: proposalId }] = this.getProtocolOp();
    return proposalId;
  }

  serialize() {
    return CreateProposalCmd.Serialize(this);
  }

  deserialize(serialized) {
    return CreateProposalCmd.Deserialize(serialized);
  }

  static Serialize(proposalCmd) {
    return {
      PROTOCOL: proposalCmd.getProtocol(),
      CMD_NUM: proposalCmd.getCmdNum(),
      CMD_PAYLOAD: JSON.stringify({
        ...proposalCmd.getCmdPayload(),
        proposedCmds: proposalCmd.getProposedCmds()
          .map((cmd) => {
            const CMD_NUM = cmd.getCmdNum();
            return CMD_NUM == APP_CMD.CREATE_PROPOSAL
              ? CreateProposalCmd.Serialize(cmd)
              : ProtocolCmd.Serialize(cmd)
          })
      })
    };
  }

  static Deserialize(serialized) {
    const { CMD_PAYLOAD, PROTOCOL } = serialized;
    const payload = JSON.parse(CMD_PAYLOAD);
    return new CreateProposalCmd({
      ...payload,
      proposedCmds: payload.proposedCmds.map((cmd) => {
        const { CMD_NUM: CMD_NUM } = cmd;
        return CMD_NUM == APP_CMD.CREATE_PROPOSAL
          ? CreateProposalCmd.Deserialize(cmd)
          : ProtocolCmd.Deserialize(cmd)
      })
    }, { protocol: PROTOCOL });
  }

}


export default CreateProposalCmd;