import Vue from 'vue';
import Router from 'vue-router';
import VueMeta from 'vue-meta';
import axios from 'axios'


import routes from './routes';

Vue.use(Router);
Vue.use(VueMeta);
Vue.use(axios);


export function createRouter() {
  return new Router({
    mode: 'history',
    routes: [
      { path: routes.pages.main, component: () => import('./client/components/Main.vue') },
      { path: routes.pages.about, component: () => import('./client/components/About.vue') },
      { path: routes.pages.cart, component: () => import('./client/components/Cart.vue') },
    ],
  });
}
