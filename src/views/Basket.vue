<template>
  <div>
    <el-card>
      <div slot="header">
        <span class="header__content">Ваша корзина</span>
      </div>
      <el-table
        :data="basket"
        stripe
        show-summary
        :summary-method="basketHelper.getBasketTotal"
        empty-text="В корзине нет товаров"
        style="width:100%">
        <el-table-column prop="icon" label="" width="100">
          <template slot-scope="scope">
            <div class="goods-icon" :style="'background-image: url(\'/img/goods/' + scope.row.image + '\')'"></div>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="Наименование"></el-table-column>
        <el-table-column prop="price" label="Цена" align="left" width="140">
          <template slot-scope="scope">
            {{scope.row.price}}.00 &#8381;
          </template>
        </el-table-column>
        <el-table-column prop="quantity" label="Количество" align="center" width="160">
          <template slot-scope="scope">
            <el-input-number
              v-model="scope.row.quantity"
              controls-position="right"
              size="mini"
              :min="1"
              @change="changeItem(scope.row.id, $event)"></el-input-number>
          </template>
        </el-table-column>
        <el-table-column prop="subtotal" label="Стоимость" align="right" width="140">
          <template slot-scope="scope">
            {{scope.row.subtotal}}.00 &#8381;
          </template>
        </el-table-column>
        <el-table-column label="Удалить" align="center" width="140">
          <template slot-scope="scope">
            <el-button size="mini" type="danger" icon="el-icon-close" round @click="removeItem(scope.row.id)"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="el-card__footer">
        <el-button size="mini" type="primary" icon="el-icon-back" @click="$router.push({name:'index'})">К товарам</el-button>
        <el-button size="mini" type="success" icon="el-icon-check" v-if="!isEmpty" @click="$router.push({name:'order'})">Оформить</el-button>
        <el-button size="mini" type="danger" icon="el-icon-close" v-if="!isEmpty" @click="clearItems()">Очистить</el-button>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';

  import { BasketItem, BasketHelper } from '@/helpers/BasketHelper';

  @Component
  export default class Basket extends Vue {
    public basketHelper : typeof BasketHelper = BasketHelper;

    // геттер возвращает содержимое корзины
    public get basket(): BasketItem[] {
      return BasketHelper.getBasketItems();
    }

    // геттер возвращает признак, что в корзине отсутствуют товары
    public get isEmpty(): boolean {
      const total = BasketHelper.getBasketPositions();
      return total.items === 0;
    }

    // удаление из корзины товара с заданным id
    public removeItem(id: number): void {
      this.$confirm('Вы действительно хотите удалить эту позицию?', 'Внимание', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Отмена',
        type: 'warning',
      }).then(() => {
        this.$store.dispatch('kick', id);
      }).catch(() => {
      });
    }

    // изменение количества товара с заданным id
    public changeItem(id: number, quantity: number): void {
      this.$store.dispatch('qnty', {
        id,
        quantity,
      });
    }

    // очистка корзины
    public clearItems(): void {
      this.$confirm('Вы действительно хотите очистить всю корзину?', 'Внимание', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Отмена',
        type: 'warning',
      }).then(() => {
        this.$store.dispatch('clab');
      }).catch(() => {
      });
    }
  }
</script>
