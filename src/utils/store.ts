import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const LS_BASKET_KEY      = 'shop-basket';

const SET_GOODS_DATA     = 'SET_GOODS_DATA';
const ADD_BASKET_ITEM    = 'ADD_BASKET_ITEM';
const REMOVE_BASKET_ITEM = 'REMOVE_BASKET_ITEM';
const SETQNT_BASKET_ITEM = 'SETQNT_BASKET_ITEM';
const CLEAR_ALL_BASKET   = 'CLEAR_ALL_BASKET';

export default new Vuex.Store({
  state: {
    goods  : null,
    basket : localStorage.getItem(LS_BASKET_KEY) ? // восстанавливаем корзину из localStorage
      JSON.parse(String(localStorage.getItem(LS_BASKET_KEY))) :
      [],
  },
  mutations: {
    [SET_GOODS_DATA](state: any, goods: any): void {
      state.goods = goods;
    },
    [ADD_BASKET_ITEM](state: any, item: any): void {
      let found: boolean = false;
      for (const i in state.basket) {
        if (state.basket[i].id === item.id) { // товар с заданным id уже есть в корзине
          state.basket[i].quantity += 1;
          found = true;
          break;
        }
      }
      if (!found) { // товара с заданным id еще нет в корзине
        state.basket.unshift({
          id       : item.id,
          name     : item.name,
          image    : item.image,
          price    : item.price,
          quantity : 1,
        });
      }
      localStorage.setItem(LS_BASKET_KEY, JSON.stringify(state.basket)); // сохраняем корзину в localStorage
    },
    [REMOVE_BASKET_ITEM](state: any, id: number): void {
      let index: number = -1;
      for (const i in state.basket) {
        if (state.basket[i].id === id) { // находим товар с заданным id
          index = Number(i);
          break;
        }
      }
      if (index !== -1) { // товар найден
        state.basket.splice(index, 1);
        localStorage.setItem(LS_BASKET_KEY, JSON.stringify(state.basket)); // сохраняем корзину в localStorage
      }
    },
    [SETQNT_BASKET_ITEM](state: any, item: any): void {
      if (item.id && item.quantity) {
        let index: number = -1;
        for (const i in state.basket) {
          if (state.basket[i].id === item.id) { // находим товар с заданным id
            index = Number(i);
            break;
          }
        }
        if (index !== -1) { // товар найден
          state.basket[index].quantity = item.quantity;
          localStorage.setItem(LS_BASKET_KEY, JSON.stringify(state.basket)); // сохраняем корзину в localStorage
        }
      }
    },
    [CLEAR_ALL_BASKET](state: any): void {
      state.basket = [];
      localStorage.setItem(LS_BASKET_KEY, JSON.stringify(state.basket)); // сохраняем корзину в localStorage
    },
  },
  actions: {
    save({commit}, goods: any): void { // сохранение товаров в vuex
      commit(SET_GOODS_DATA, goods);
    },
    pick({commit}, item: any): void { // добавление товара в корзину
      commit(ADD_BASKET_ITEM, item);
    },
    kick({commit}, id: number): void { // удаление товара с заданным id из корзины
      commit(REMOVE_BASKET_ITEM, id);
    },
    qnty({commit}, item): void { // изменение кол-ва товаров с заданным id
      commit(SETQNT_BASKET_ITEM, item);
    },
    clab({commit}): void { // очистка всей корзины
      commit(CLEAR_ALL_BASKET);
    },
  },
  getters: {
    goods: (state: any): any => {
      return state.goods;
    },
    basket: (state: any): any => {
      return state.basket;
    },
  },
});
