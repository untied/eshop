
import store from './utils/store';

// добавление типов в объект Vue
declare module 'vue/types/vue' {
  interface Vue {
    $bus: Vue;
    $store: typeof store;
  }
}
