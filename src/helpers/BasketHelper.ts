
import store from '@/utils/store';

export interface BasketTotal {
  items : number;
  price : number;
}

export interface BasketItem {
  id       : number;
  image    : string;
  name     : string;
  price    : number;
  quantity : number;
  subtotal : number;
}

export class BasketHelper {
  // функция возвращает массив с набором из корзины
  public static getBasketItems(): BasketItem[] {
    const items : BasketItem[] = [];
    for (const i in store.getters.basket) {
      if (store.getters.basket.hasOwnProperty(i)) {
        items.push({
          id       : store.getters.basket[i].id,
          image    : store.getters.basket[i].image,
          name     : store.getters.basket[i].name,
          price    : store.getters.basket[i].price,
          quantity : store.getters.basket[i].quantity,
          subtotal : store.getters.basket[i].price * store.getters.basket[i].quantity,
        });
      }
    }
    return items;
  }

  // функция подсчитывает количество позиций и итоговую сумму в корзине
  public static getBasketPositions(): BasketTotal {
    const basket : any = store.getters.basket;
    const total  : BasketTotal = {
      items : 0,
      price : 0,
    };

    if (basket && basket.length) {
      for (const i in basket) {
        if (basket.hasOwnProperty(i)) {
          total.price += basket[i].quantity * basket[i].price;
        }
      }
      total.items = basket.length;
    }
    return total;
  }

  // функция рассчитывает итоговую сумму в корзине
  public static getBasketTotal(param: any): any[] {
    const { columns, data } = param;
    const total: any = [];

    columns.forEach((column: any, index: number) => {
      if (index === 3) {
        total[index] = 'Итого';
      } else if (index === 4) {
        const values = data.map((item: any) => Number(item[column.property]));
        total[index] = values.reduce((prev: number, curr: number) => {
          const value = Number(curr);
          if (!isNaN(value)) {
            return prev + curr;
          } else {
            return prev;
          }
        }, 0) + '.00 ₽';
      } else {
        total[index] = '';
      }
    });
    return total;
  }
}
