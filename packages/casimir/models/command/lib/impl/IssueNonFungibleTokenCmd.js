import ProtocolCmd from '../base/ProtocolCmd';
import { APP_CMD } from '@deip/constants';
import { assert } from '@deip/toolbox';


class IssueNonFungibleTokenCmd extends ProtocolCmd {

  constructor(cmdPayload) {

    const {
      issuer,
      asset,
      recipient,
    } = cmdPayload;

    assert(!!issuer, "'issuer' is required");
    assert(
      !!asset
      && asset.id
      && asset.symbol
      && !isNaN(asset.precision)
      && asset.amount,
      "'asset' is required and should contains 'id', 'symbol', 'precision', 'amount' fields"
    )
    assert(!!recipient, "'recipient' is required");

    super(APP_CMD.ISSUE_NFT, cmdPayload);
  }

}


export default IssueNonFungibleTokenCmd;