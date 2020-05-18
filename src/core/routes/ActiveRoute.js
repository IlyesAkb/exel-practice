export class ActiveRoute {
  static path() {
    return window.location.hash.slice(1)
  }

  static redirect(path) {
    window.location.hash = path
  }

  static get param() {
    return ActiveRoute.path().split('/')[1]
  }
}