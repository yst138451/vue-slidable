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
      resizeWatcher: {
        type: Boolean,
        default: true
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
        return Object
          .entries({
            ...defaultEasing,
            ...this.easing
          })
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

        this.$emit(this.expanded ? 'expanded' : 'collapsed');
      }
    },

    created() {
      if (this.resizeWatcher) {
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

    beforeDestroy() {
      if (this.resizeWatcher) {
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