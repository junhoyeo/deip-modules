import ProtocolCmd from './../base/ProtocolCmd';
import { APP_CMD } from '@deip/constants';
import { assert } from '@deip/toolbox';


class DeclineProposalCmd extends ProtocolCmd {

  constructor(cmdPayload) {

    const {
      // onchain
      entityId,
      account,
      authorityType
    } = cmdPayload;

    assert(!!entityId, "'entityId' is required");
    assert(!!account, "'account' is required");
    assert(!!authorityType, "'authorityType' is required");

    super(APP_CMD.DECLINE_PROPOSAL, cmdPayload);
  }
}


export default DeclineProposalCmd;
