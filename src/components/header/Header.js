import {ExcelComponent} from '@core/ExcelComponent'
import * as actions from '@/redux/actions'
import {$} from '@core/dom'
import {defaultTitle} from '@/constants'

export class Header extends ExcelComponent {
  static className = 'excel__header'

  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: ['input'],
      ...options
    })
  }

  toHTML() {
    const title = this.store.getState().title
    return `
      <input type="text" class="input" value="${title || defaultTitle}">

      <div>

        <div class="button">
          <i class="material-icons">restore_from_trash</i>
        </div>

        <div class="button">
          <i class="material-icons">exit_to_app</i>
        </div>

      </div>
    `
  }

  onInput(event) {
    const $target = $(event.target)
    this.$dispatch(actions.changeTitle($target.text()))
  }
}