import { assert } from '@deip/toolbox';


class BaseTx {
  constructor({ operations }) {
    this._operations = operations || [];
  }

  addOp(op) {
    assert(!this.isSealed(), "Transaction cannot be modified after it has been sealed");
    this._operations.push(op);
    return this;
  }

  seal() {
    assert(this._operations.length, "Empty transaction cannot be sealed");
    this._isSealed = true;
    return this;
  }

  isSealed() { return this._isSealed; }

  sign() { throw new Error("Not implemented exception!"); }
  finalize() { throw new Error("Not implemented exception!"); }
  getProtocol() { throw new Error("Not implemented exception!"); };

  serialize() { throw new Error("Not implemented exception!"); }
  deserialize() { throw new Error("Not implemented exception!"); }
  static Serialize(tx) { throw new Error("Not implemented exception!"); }
  static Deserialize(serialized) { throw new Error("Not implemented exception!"); }
}


export default BaseTx;