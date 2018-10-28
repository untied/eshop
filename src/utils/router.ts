import Vue from 'vue';
import Router from 'vue-router';
import Index from '../views/Index.vue';
import Basket from '../views/Basket.vue';
import Order from '../views/Order.vue';
import Error404 from '../views/Error404.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior(to, from, savedPosition) {
    return {x: 0, y: 0};
  },
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index,
    },
    {
      path: '/basket',
      name: 'basket',
      component: Basket,
    },
    {
      path: '/order',
      name: 'order',
      component: Order,
    },
    {
      path: '**',
      name: 'error-404',
      component: Error404,
    },
  ],
});
