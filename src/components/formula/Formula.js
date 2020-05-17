import {ExcelComponent} from '@core/ExcelComponent'

export class Formula extends ExcelComponent {
  static className = 'excel__formula'

  constructor($root, options) {
    super($root, {
      name: 'Formula',
      listeners: ['input', 'keydown'],
      subscribe: ['currentText'],
      ...options
    })
  }

  init() {
    super.init()
    this.$formula = this.$root.find('#formula')

    this.$on('table:select', $cell => {
      this.$formula.text($cell.data.value)
    })
  }

  toHTML() {
    return `
      <div class="info">fx</div>
      <div 
        class="input"
        id="formula"
        contenteditable 
        spellcheck="false"
      ></div>
    `
  }

  storeChanged({currentText}) {
    this.$formula.text(currentText)
  }

  onInput(event) {
    const text = this.$formula.text().trim()
    this.$emit('formula:input', text)
  }

  onKeydown(event) {
    const keys = [
      'Enter',
      'Tab'
    ]

    if (keys.includes(event.key)) {
      event.preventDefault()

      this.$emit('formula:done')
    }
  }
}