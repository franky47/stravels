
export default class EventEmitter {
  constructor () {
    this.listeners = new Set()
  }

  addListener (callback) {
    this.listeners.add(callback)
    return () => {
      this.listeners.delete(callback)
    }
  }
  addListeners (callbacks) {
    callbacks.forEach((callback) => {
      this.addListener(callback)
    })
  }
  removeAllListeners () {
    this.listeners.clear()
  }
  notifyListenersSync (...args) {
    this.listeners.forEach(listener => {
      listener(...args)
    })
  }
  notifyListeners (...args) {
    const wrap = (listener) => Promise.resolve().then(() => listener(...args))
    const promises = [...this.listeners].map((listener) => wrap(listener))
    return Promise.all(promises)
  }
}
