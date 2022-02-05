import ProtocolCmd from './../base/ProtocolCmd';
import { APP_CMD } from '@deip/constants';
import { assert } from '@deip/toolbox';


class AcceptProposalCmd extends ProtocolCmd {

  constructor(cmdPayload) {

    const {
      // onchain
      entityId,
      account,
      batchWeight
    } = cmdPayload;

    assert(!!entityId, "'entityId' is required");
    assert(!!account, "'account' is required");
    assert(!!batchWeight, "'batchWeight' is required");

    super(APP_CMD.ACCEPT_PROPOSAL, cmdPayload);
  }
}


export default AcceptProposalCmd;
