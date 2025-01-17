import './ve-line-clamp.scss';

import { defineComponent } from '@deip/platform-util';

export default defineComponent({
  name: 'VeLineClamp',

  props: {
    lines: {
      type: [Number, String],
      default: null
    },
    tag: {
      type: String,
      default: 'div'
    }
  },

  computed: {
    hasLineClamp() {
      return !!this.lines;
    },

    styles() {
      return this.hasLineClamp ? { '-webkit-line-clamp': this.lines } : {};
    },

    classes() {
      return {
        've-line-clamp': this.hasLineClamp
      };
    }
  },

  render() {
    const Component = this.tag;

    return (
      <Component
        class={this.classes}
        style={this.styles}
      >
        {this.$slots.default}
      </Component>
    );
  }
});
