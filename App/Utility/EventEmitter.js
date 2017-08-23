
export default class EventEmitter {
  constructor() {
    this.listeners = new Set()
  }

  addListener(callback) {
    this.listeners.add(callback)
    return () => {
      this.listeners.delete(callback)
    }
  }
  addListeners(callbacks) {
    callbacks.forEach((callback) => {
      this.addListener(callback)
    })
  }
  removeAllListeners() {
    this.listeners.clear()
  }
  notifyListenersSync(...args) {
    this.listeners.forEach(callback => {
      callback(...args)
    })
  }
  notifyListeners(...args) {
    const promises = [...this.listeners].map((callback) => Promise.resolve().then(() => callback(...args)))
    return Promise.all(promises)
  }
}
