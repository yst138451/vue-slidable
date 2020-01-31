# Vue Slidable

### Vue component-based utility for showing/hiding an element with "sliding" effect.

Based on David Walsh's [Pure CSS Slide Up and Slide Down](https://davidwalsh.name/css-slide).

## Installation

```bash
npm install @yst/vue-slidable
```

Import and install as plugin:

```js
import Vue from 'vue';
import Slidable from '@yst/vue-slidable';

Vue.use(Slidable);

// With options
Vue.use(Slidable, {});
```

## Options

### Props

#### `expanded`
- type: `boolean`
- default: `false`
