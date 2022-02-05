import ProtocolEntityCmd from '../base/ProtocolEntityCmd';
import { APP_CMD } from '@deip/constants';
import { assert, isNumber, isObject } from '@deip/toolbox';


class CreateNonFungibleTokenCmd extends ProtocolEntityCmd {

  constructor(cmdPayload) {

    const {
      entityId,
      issuer,
      symbol,
      precision,
      maxSupply,
      description,
      projectTokenSettings
    } = cmdPayload;

    assert(!!issuer, "'issuer' is required");
    assert(!!symbol, "'symbol' is required");
    assert(isNumber(precision), "'precision' must be a number");

    assert(!!projectTokenSettings && isObject(projectTokenSettings), "'projectTokenSettings' is required");
    const { projectId, teamId, licenseRevenue } = projectTokenSettings; // TODO: remove 'teamId'
    assert(!!projectId, "'projectId' is required for project token");
    assert(!!teamId, "'teamId' is required for project token");

    if (licenseRevenue) {
      const { holdersShare } = licenseRevenue;
      assert(!!holdersShare, "'holdersShare' is required for project 'licenseRevenue' option");
    }

    super(APP_CMD.CREATE_NFT, cmdPayload);
  }

}


export default CreateNonFungibleTokenCmd;