import ProtocolCmd from './../base/ProtocolCmd';
import ProtocolEntityCmd from './../base/ProtocolEntityCmd';
import { APP_CMD, APP_PROPOSAL } from '@deip/constants';
import { assert, isString } from '@deip/toolbox';


class CreateProposalCmd extends ProtocolEntityCmd {

  constructor(cmdPayload) {

    const {
      entityId,
      type,
      creator,
      proposedCmds,
      expirationTime,
      reviewPeriodSeconds
    } = cmdPayload;

    assert(!!expirationTime, "'expirationTime' is required");
    assert(isString(expirationTime), "'expirationTime' must be in stringified 'yyyy-MM-ddTHH:mm:ss' format");
    assert(!!type, "'type' is required");
    assert(APP_PROPOSAL[type] !== undefined, "'type' is unknown");
    assert(!!creator, "'creator' is required");

    assert(!!proposedCmds && proposedCmds.length, "Protocol proposal must contain at least 1 ProtocolCmd");
    for (let i = 0; i < proposedCmds.length; i++) {
      const protocolCmd = proposedCmds[i];
      assert(protocolCmd instanceof ProtocolCmd, "Proposal can contain only protocol chain commands");
    }

    super(APP_CMD.CREATE_PROPOSAL, cmdPayload);
  }

  getProposedCmds() {
    return this._cmdPayload.proposedCmds;
  }

  getProposalType() {
    return this._cmdPayload.type;
  }

  serialize() {
    return CreateProposalCmd.Serialize(this);
  }

  deserialize(serialized) {
    return CreateProposalCmd.Deserialize(serialized);
  }

  static Serialize(proposalCmd) {
    return {
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
    const { CMD_PAYLOAD } = serialized;
    const payload = JSON.parse(CMD_PAYLOAD);
    return new CreateProposalCmd({
      ...payload,
      proposedCmds: payload.proposedCmds.map((cmd) => {
        const { CMD_NUM: CMD_NUM } = cmd;
        return CMD_NUM == APP_CMD.CREATE_PROPOSAL
          ? CreateProposalCmd.Deserialize(cmd)
          : ProtocolCmd.Deserialize(cmd)
      })
    });
  }

}


export default CreateProposalCmd;
