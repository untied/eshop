<template>
  <div class="el-header__basket">
    <a href="javascript:void(0)" @click="$router.push({name:'basket'})">Ваша корзина <span v-html="basketInfo"></span></a>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';

  import { BasketTotal, BasketHelper } from '@/helpers/BasketHelper';

  @Component
  export default class BasketWidget extends Vue {
    // вывод информации о товарах в корзине
    public get basketInfo(): string {
      const basketTotal : BasketTotal = BasketHelper.getBasketPositions();
      return basketTotal.items ? `(${basketTotal.items} поз. на сумму ${basketTotal.price}.00 &#8381;)` : 'пуста';
    }
  }
</script>
