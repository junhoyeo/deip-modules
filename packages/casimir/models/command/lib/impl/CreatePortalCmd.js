import ProtocolEntityCmd from './../base/ProtocolEntityCmd';
import { APP_CMD } from '@deip/constants';
import { assert } from '@deip/toolbox';


class CreatePortalCmd extends ProtocolEntityCmd {

  constructor(cmdPayload) {

    const {
      entityId,
      owner,
      delegate,
      metadata
    } = cmdPayload;

    assert(!!owner, "'owner' is required");
    assert(!!delegate, "'delegate' is required");

    super(APP_CMD.CREATE_PORTAL, cmdPayload);
  }

}


export default CreatePortalCmd;