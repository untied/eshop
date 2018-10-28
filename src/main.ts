import Vue from 'vue';
import App from './App.vue';
import router from './utils/router';
import store from './utils/store';

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'element-ui/lib/theme-chalk/display.css';
import 'font-awesome/css/font-awesome.min.css';

Vue.use(ElementUI);

import { BusPlugin } from './utils/bus';

Vue.use(BusPlugin);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
