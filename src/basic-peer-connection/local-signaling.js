function LocalSignaling() {
  //TODO replace with https://github.com/daniellmb/MinPubSub or similar
}


LocalSignaling.prototype.send = function() {

};

LocalSignaling.getHandler = function() {
  if (!this._instance) {
    this._instance = new LocalSignaling();
  }
  return this._instance;
};

module.exports = LocalSignaling;
