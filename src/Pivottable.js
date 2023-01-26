import { h } from 'vue'

import TableRenderer from './TableRenderer'
import defaultProps from './helper/common'
export default {
  name: 'vue-pivottable',
  mixins: [
    defaultProps
  ],
  computed: {
    rendererItems () {
      return this.renderers || Object.assign({}, TableRenderer)
    }
  },
  methods: {
    createPivottable () {
      const props = this.$props
      return h(this.rendererItems[this.rendererName], {
        props: Object.assign(
          props,
          { localeStrings: props.locales[props.locale].localeStrings }
        )
      })
    },
    createWrapperContainer () {
      return h('div', {
        style: {
          display: 'block',
          width: '100%',
          'overflow-x': 'auto',
          'max-width': this.tableMaxWidth ? `${this.tableMaxWidth}px` : undefined
        }
      }, [
        this.createPivottable(h)
      ])
    }
  },
  render () {
    return this.createWrapperContainer(h)
  },
  renderError (error) {
    return this.renderError(h)
  }
}
