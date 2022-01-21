import ProtocolEntityCmd from '../base/ProtocolEntityCmd';
import { APP_CMD } from '@deip/constants';
import { assert, isNumber } from '@deip/toolbox';


class CreateFungibleTokenCmd extends ProtocolEntityCmd {

  constructor(cmdPayload) {

    const {
      entityId,
      issuer,
      symbol,
      precision,
      maxSupply,
      description
    } = cmdPayload;

    assert(!!issuer, "'issuer' is required");
    assert(!!symbol, "'symbol' is required");
    assert(isNumber(precision), "'precision' must be a number");

    super(APP_CMD.CREATE_FT, cmdPayload);
  }

}


export default CreateFungibleTokenCmd;