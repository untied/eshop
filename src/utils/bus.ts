
import Vue from 'vue';

export class Bus {
  // экземпляр Vue
  private static bus = new Vue();

  // конструктор
  public constructor() {}

  // геттер возвращает экземпляр Vue
  public static get $bus(): Vue {
    return Bus.bus;
  }
}

// объявление плагина
export function BusPlugin(vue: typeof Vue, options?: any): void {
  vue.prototype.$bus = Bus.$bus;
}
