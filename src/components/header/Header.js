import {ExcelComponent} from '@core/ExcelComponent'
import * as actions from '@/redux/actions'
import {$} from '@core/dom'
import {defaultTitle} from '@/constants'
import {ActiveRoute} from '@core/routes/ActiveRoute'

export class Header extends ExcelComponent {
  static className = 'excel__header'

  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: ['input', 'click'],
      ...options
    })
  }

  toHTML() {
    const title = this.store.getState().title
    return `
      <input type="text" class="input" value="${title || defaultTitle}">

      <div>

        <div class="button" data-type="delete">
          <i class="material-icons"
            data-type="delete"
          >restore_from_trash</i>
        </div>

        <div class="button" data-type="exit">
          <i 
            class="material-icons"
            data-type="exit"
          >exit_to_app</i>
        </div>

      </div>
    `
  }

  onInput(event) {
    const $target = $(event.target)
    this.$dispatch(actions.changeTitle($target.text()))
  }

  onClick(event) {
    const $target = $(event.target)
    const type = $target.data.type
    if (type === 'exit') {
      ActiveRoute.redirect('dashboard')
    } else if (type === 'delete') {
      const decision = confirm('Вы действиетльно хотите удалить эту таблицу?')

      if (decision) {
        localStorage.removeItem('excel:' + ActiveRoute.param)
        ActiveRoute.redirect('dashboard')
      }
    }
  }
}