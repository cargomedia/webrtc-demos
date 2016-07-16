function createSignaling() {
  function Signaling() {
    this._listeners = {};
  }

  Signaling.prototype.send = function(event, data) {
    var eventListeners = this._listeners[event];
    if (eventListeners) {
      eventListeners.forEach(function(listener) {
        listener(data);
      });
    }
  };

  Signaling.prototype.on = function(event, listener) {
    var eventListeners = this._listeners[event] || [];
    eventListeners.push(listener);
    this._listeners[event] = eventListeners;
  };

  return new Signaling();
}
