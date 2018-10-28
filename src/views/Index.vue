<template>
  <div>
    <el-card>
      <div slot="header">
        <span class="header__content">Интернет-магазин</span>
      </div>
      <el-row :gutter="15">
        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6" v-for="g in goods" :key="g.id">
          <div class="goods-item">
            <div class="goods-item__image float-left"
              title="Подробная информация о товаре"
              :style="'background-image: url(\'/img/goods/' + g.image + '\')'"
              @click="viewItem(g.id)"></div>
            <div class="goods-item__about float-left">
              <div class="goods-item__item-name">{{g.name}}</div>
              <div class="goods-item__item-price">Цена: {{g.price}}.00 &#8381;</div>
              <div class="goods-item__item-buttons">
                <el-button size="mini"
                  type="success"
                  icon="el-icon-info"
                  title="Подробная информация о товаре"
                  @click="viewItem(g.id)">Подробно</el-button>
                <el-button size="mini" type="primary" icon="el-icon-goods" @click="pickItem(g.id)">В корзину</el-button>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </el-card>
    <el-dialog
      v-if="goodsItem"
      :title="goodsItem.name"
      width="600px"
      :visible.sync="infoDialogVisible">
      <div class="el-dialog__item">
        <div class="el-dialog__item-image float-left" :style="'background-image: url(\'/img/goods/' + goodsItem.image + '\')'"></div>
        <div class="el-dialog__item-description float-right">
          {{goodsItem.description}}
        </div>
        <div class="el-dialog__item-price">Цена: {{goodsItem.price}}.00 &#8381;</div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" type="primary" icon="el-icon-goods" @click="pickItem(goodsItem.id)">В корзину</el-button>
        <el-button size="mini" icon="el-icon-close" @click="infoDialogVisible = false">Закрыть</el-button>
      </span>
    </el-dialog>
    <el-dialog
      :title="'Товар добавлен в корзину'"
      width="800px"
      :visible.sync="basketDialogVisible">
      <el-table
        :data="basket"
        stripe
        show-summary
        :summary-method="basketHelper.getBasketTotal"
        empty-text="В корзине нет товаров"
        style="width:100%">
        <el-table-column prop="icon" label="" width="60">
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
        <el-table-column prop="quantity" label="Количество" align="center" width="110"></el-table-column>
        <el-table-column prop="subtotal" label="Стоимость" align="right" width="140">
          <template slot-scope="scope">
            {{scope.row.subtotal}}.00 &#8381;
          </template>
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" type="primary" icon="el-icon-goods" @click="$router.push({name:'basket'})">Изменить</el-button>
        <el-button size="mini" type="success" icon="el-icon-check" @click="$router.push({name:'order'})">Оформить</el-button>
        <el-button size="mini" icon="el-icon-close" @click="basketDialogVisible = false">Закрыть</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';

  import { BasketItem, BasketHelper } from '@/helpers/BasketHelper';

  interface GoodsItem {
    id          : number;
    name        : string;
    description : string;
    image       : string;
    price       : number;
  }

  @Component
  export default class Index extends Vue {
    public goods               : any[]               = [];
    public goodsItem           : GoodsItem | null    = null;
    public infoDialogVisible   : boolean             = false;
    public basketDialogVisible : boolean             = false;
    public basketHelper        : typeof BasketHelper = BasketHelper;

    // создание компонента
    public created(): void {
      if (this.$store.getters.goods && this.$store.getters.goods.length) { // если товары уже загружены
        this.goods = this.$store.getters.goods;
      } else {
        this.$bus.$on('goods-ready', () => { // если не загружены, то подписываемся на событие загрузки
          if (this.$store.getters.goods) {
            this.goods = this.$store.getters.goods;
          }
        });
      }
    }

    // просмотр информации о товаре
    public viewItem(id: number): void {
      let found: boolean = false;
      for (const i in this.goods) { // поиск товара по id
        if (this.goods[i].id === id) {
          this.goodsItem = {
            id          : this.goods[i].id,
            name        : this.goods[i].name,
            description : this.goods[i].description,
            image       : this.goods[i].image,
            price       : this.goods[i].price,
          };
          found = true;
          break;
        }
      }
      if (found) {
        this.infoDialogVisible = true;
      }
    }

    // положить в корзину
    public pickItem(id: number): void {
      let item: any = null;
      for (const i in this.goods) { // поиск товара по id
        if (this.goods[i].id === id) {
          item = {
            id    : this.goods[i].id,
            name  : this.goods[i].name,
            image : this.goods[i].image,
            price : this.goods[i].price,
          };
          break;
        }
      }
      if (item !== null) {
        this.$store.dispatch('pick', item);
      }
      this.infoDialogVisible   = false;
      this.basketDialogVisible = true;
    }

    // геттер возвращает содержимое корзины
    public get basket(): BasketItem[] {
      return BasketHelper.getBasketItems();
    }
  }
</script>
