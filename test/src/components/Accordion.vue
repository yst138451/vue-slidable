<template>
  <div class="accordion">
    <div class="header" @click="toggleState">
      <span v-text="icon"></span>&nbsp;
      <span v-text="label"></span>
    </div>

    <slidable v-model="value" disable-resize-update>
      <div class="content">
        <slot></slot>
      </div>
    </slidable>
  </div>
</template>

<script>
  export default {
    name: 'Accordion',

    props: {
      value: Boolean,
      label: {
        type: String,
        default: 'Expand/collapse'
      }
    },

    computed: {
      icon() {
        return this.value ? '[-]' : '[+]';
      }
    },

    methods: {
      toggleState() {
        this.$emit('input', !this.value);
      }
    }
  }
</script>

<style lang="scss" scoped>
  $padding: 10px;

  .accordion {
    border: 1px solid grey;
    margin-top: 2rem;

    .header {
      cursor: pointer;
      user-select: none;
      padding: $padding;
      background-color: tomato;
      color: #fff;
    }

    .content {
      padding: $padding;
    }
  }
</style>