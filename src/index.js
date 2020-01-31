import Slidable from './Slidable';

export default {
  install(Vue, options = {}) {
    const { name } = Object.assign({
      name: Slidable.name
    }, options);

    Vue.component(name, Slidable);
  }
}