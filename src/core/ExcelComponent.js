import {DomListener} from '@core/DomListener'

export class ExcelComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners)
    this.name = options.name || ''
    this.emitter = options.emitter
    this.store = options.store
    this.subscribe = options.subscribe || []
    this.unsubsubscribers = []

    this.prepare()
  }

  prepare() {}

  toHTML() {
    return ''
  }

  init() {
    this.initDOMListeners()
  }

  storeChanged() {

  }

  isWatching(key) {
    return this.subscribe.includes(key)
  }

  $emit(event, ...args) {
    this.emitter.emit(event, ...args)
  }

  $on(event, fn) {
    const unsub = this.emitter.subscribe(event, fn)
    this.unsubsubscribers.push(unsub)
  }

  $dispatch(action) {
    this.store.dispatch(action)
  }

  destroy() {
    this.removeDOMListeners()
    this.unsubsubscribers.forEach(unsub => unsub())
  }
}