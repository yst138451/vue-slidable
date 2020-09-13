<template>
  <component
    :is="tag"
    :class="{
      'slidable': true,
      'slidable--collapsed': !expanded
    }"
    :style="{ ...attrs, ...computedEasing }">
    <slot></slot>
  </component>
</template>

<script>
  import debounce from 'lodash.debounce';
  import kebabCase from 'kebab-case';
  import { defaultEasing } from './defaults';

  export default {
    name: 'Slidable',

    props: {
      expanded: {
        type: Boolean,
        default: false
      },
      tag: {
        type: String,
        default: 'div'
      },
      easing: {
        type: Object,
        default: () => ({})
      },
      /**
       * @deprecated
       * This will be removed in future release and be enabled by default (it has been, hence the deprecation plan). 
       * Please use `disableResizeUpdate` to disable it. 
       */
      updateOnResize: {
        type: Boolean,
        default: true
      },
      disableResizeUpdate: {
        type: Boolean,
        default: false
      },
      debounce: {
        type: [Number, Boolean],
        default: 400
      },
      passive: {
        type: Boolean,
        default: true
      }
    },

    model: {
      prop: 'expanded',
      event: 'change'
    },

    data: () => ({
      attrs: {
        maxHeight: 0
      }
    }),

    computed: {
      computedEasing() {
        const easing = {
          ...defaultEasing,
          ...this.easing
        }

        if (typeof easing.duration === 'number') {
          easing.duration = easing.duration + 'ms';
        }

        return Object
          .entries(easing)
          .reduce((seed, [name, value]) => (
            seed[`--easing-${kebabCase(name)}`] = value, seed
          ), {});
      }
    },

    methods: {
      resize() {
        this.attrs.maxHeight = this.expanded
          ? this.$el.scrollHeight + 'px'
          : 0;

        this.$emit('change', this.expanded);
        this.$emit(this.expanded ? 'expanded' : 'collapsed');
      }
    },

    mounted() {
      if (!this.disableResizeUpdate && this.updateOnResize) {
        window.addEventListener('resize', this.resize, { passive: this.passive });

        if (typeof this.debounce === 'number') {
          this.$options.updated = debounce(function () {
            if (this.expanded) {
              this.resize();
            }
          }, this.debounce);
        }
      }
    },

    destroyed() {
      if (!this.disableResizeUpdate && this.updateOnResize) {
        window.removeEventListener('resize', this.resize);
      }
    },

    watch: {
      expanded: 'resize'
    }
  }
</script>

<style lang="scss" scoped>
  .slidable {
    overflow: hidden;
    transition: {
      property: max-height;
      duration: var(--easing-duration);
      timing-function: var(--easing-timing-function);
    }

    &--collapsed {
      max-height: 0;
    }
  }
</style>