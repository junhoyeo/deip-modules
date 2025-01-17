import { assert } from '@deip/toolbox';
import PackedTx from './PackedTx';


class BaseTxBuilder {

  _tx;
  _protocolCmds;
  _chainNodeClient;
  _chainOpsRegistry;
  _isTxBuilding;

  constructor(chainNodeClient, chainOpsRegistry) {
    this._tx = null;
    this._chainNodeClient = chainNodeClient;
    this._chainOpsRegistry = chainOpsRegistry;
    this._protocolCmds = [];
    this._isTxBuilding = false;
  }

  clear() {
    this._tx = null;
    this._protocolCmds = [];
  }

  addCmd(protocolCmd) {
    assert(!!this._tx, "Transaction is not initiated");
    assert(protocolCmd.isProtocolOpCmd(), "Transaction can contain only protocol chain related commands");
    const ops = this.cmdToOps(protocolCmd);
    for (let i = 0; i < ops.length; i++) {
      const op = ops[i];
      this._tx.addOp(op);
    }
    this._protocolCmds.push(protocolCmd);
  }

  cmdToOps(protocolCmd) {
    assert(protocolCmd.isProtocolOpCmd(), "Not a protocol chain related command");
    const ops = this._chainOpsRegistry.get(protocolCmd.getCmdNum())(protocolCmd.getCmdPayload(), { cmdToOps: (cmd) => this.cmdToOps(cmd)});
    return ops;
  }

  begin(params) {
    assert(!!!this._isTxBuilding, `Transaction is in progress already`);
    this._isTxBuilding = true;
    return Promise.resolve(this);
  }

  end(params) {
    return this.finalize(params)
      .then((packedTx) => {
        this.clear();
        this._isTxBuilding = false;
        return packedTx;
      });
  }

  finalize(params) {
    return this._tx.finalize(params)
      .then((tx) => {
        return new PackedTx(tx, this._protocolCmds);
      })
  }

}


export default BaseTxBuilder;