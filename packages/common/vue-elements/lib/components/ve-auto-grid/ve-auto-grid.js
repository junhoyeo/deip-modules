import './ve-auto-grid.scss';

import { defineComponent } from '@deip/platform-util';
import { convertToUnit } from '@deip/toolbox';
import { genBreakpointCssVarsStyles, genBreakpointProps } from '../../util/breakpoint';

const gapProps = genBreakpointProps('gap', [Number, String]);
const itemWidthProps = genBreakpointProps('itemWidth', [Number, String]);
const colsProps = genBreakpointProps('cols', [Number, String]);

function hasPropsVal(props) {
  return Boolean(
    Object.keys(props)
      .map((prop) => Boolean(this[prop]))
      .filter((val) => val)
      .length
  );
}

const VeAutoGrid = defineComponent({
  name: 'VeAutoGrid',

  props: {
    ...gapProps,
    ...itemWidthProps,
    ...colsProps
  },

  computed: {
    styles() {
      const unitTransformer = (val) => convertToUnit(val);
      return {
        ...genBreakpointCssVarsStyles.call(this, 'gap', unitTransformer),
        ...genBreakpointCssVarsStyles.call(this, 'itemWidth', unitTransformer),
        ...genBreakpointCssVarsStyles.call(this, 'cols')
      };
    },
    classes() {
      return {
        've-auto-grid': true,
        've-auto-grid--auto-fill': this.hasItemWidthProps
      };
    },
    hasItemWidthProps() {
      return hasPropsVal.call(this, itemWidthProps);
    },
    hasColsProps() {
      return hasPropsVal.call(this, colsProps);
    }
  },

  created() {
    if (this.hasItemWidthProps && this.hasColsProps) {
      console.warn('[VeAutoGrid]: Not recommend using "cols" and "item-width" props at same time');
    }
  },

  render() {
    return (
      <div
        class={this.classes}
        style={this.styles}
      >
        {this.$slots.default}
      </div>
    );
  }
});

export default VeAutoGrid;
