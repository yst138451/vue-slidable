import Vue from 'vue'
import App from './App.vue'
import VueSlidable from '@yst/vue-slidable';

Vue.use(VueSlidable);

new Vue({
  render: h => h(App),
}).$mount('#app')

Vue.config.productionTip = false