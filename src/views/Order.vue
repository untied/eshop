<template>
  <el-card>
    <div slot="header">
      <span class="header__content">Заказ #{{orderData.ident}} на сумму {{orderData.total}}.00 &#8381;</span>
    </div>
    <el-row>
      <el-col :md="2" :lg="5" :xl="7" class="hidden-sm-and-down"></el-col>
      <el-col :xs="24" :sm="24" :md="20" :lg="14" :xl="10">
        <el-form
          class="send-order"
          ref="send-order"
          :model="orderData"
          :rules="orderRules"
          label-width="180px">
          <el-form-item label="Фамилия" prop="lastName">
            <el-input type="text" v-model="orderData.lastName"></el-input>
          </el-form-item>
          <el-form-item label="Имя" prop="firstName">
            <el-input type="text" v-model="orderData.firstName"></el-input>
          </el-form-item>
          <el-form-item label="Телефон" prop="phone">
            <el-input type="text" v-model="orderData.phone"></el-input>
          </el-form-item>
          <el-form-item label="Email" prop="email">
            <el-input type="email" v-model="orderData.email"></el-input>
          </el-form-item>
          <el-form-item label="Адрес доставки" prop="address">
            <el-input
              type="textarea"
              :rows="3"
              v-model="orderData.address">
            </el-input>
          </el-form-item>
          <el-form-item label="Комментарий к заказу">
            <el-input
              type="textarea"
              :rows="3"
              v-model="orderData.comment">
            </el-input>
          </el-form-item>
        </el-form>
        <div class="el-card__footer">
          <el-button size="mini" type="primary" icon="el-icon-back" @click="$router.push({name:'index'})">К товарам</el-button>
          <el-button size="mini" type="success" icon="el-icon-check" @click="submit()" v-if="orderTotal > 0">Подтвердить</el-button>
        </div>
      </el-col>
      <el-col :md="2" :lg="5" :xl="7" class="hidden-sm-and-down"></el-col>
    </el-row>
  </el-card>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';

  import { BasketHelper, BasketTotal } from '@/helpers/BasketHelper';

  interface OrderData {
    ident     : number;
    total     : number;
    lastName  : string;
    firstName : string;
    email     : string;
    phone     : string;
    address   : string;
    comment   : string;
  }

  @Component
  export default class Basket extends Vue {
    private static readonly ORDER_IDENT_MIN: number = 1000;
    private static readonly ORDER_IDENT_MAX: number = 999999;

    public orderData : OrderData = {
      ident     : this.orderIdent,
      total     : this.orderTotal,
      lastName  : '',
      firstName : '',
      email     : '',
      phone     : '',
      address   : '',
      comment   : '',
    };

    // создание компонента
    public created(): void {
      if (this.orderTotal === 0) {
        this.$router.push({
          name: 'index',
        });
      }
    }

    // правила валидации полей формы
    public get orderRules(): any {
      return {
        lastName: [
          { required: true, message: 'Пожалуйста, укажите Вашу фамилию', trigger: 'blur' },
        ],
        firstName: [
          { required: true, message: 'Пожалуйста, укажите Ваше имя', trigger: 'blur' },
        ],
        phone: [
          { required: true, message: 'Пожалуйста, укажите Ваш номер телефона', trigger: 'blur' },
        ],
        address: [
          { required: true, message: 'Пожалуйста, укажите адрес доставки заказа', trigger: 'blur' },
        ],
        email: [
          { required: true, validator: this.validateEmail.bind(this), trigger: 'blur' },
        ],
      };
    }

    // подтверждение заказа
    public submit(): void {
      const sendOrder: any = this.$refs['send-order'];
      if (sendOrder) {
        sendOrder.validate((isValid: boolean) => {
          if (isValid) {
            this.$alert('Ваш заказ был успешно оформлен! В ближайшее время с Вами свяжется наш менеджер.', 'Выполнено', {
              confirmButtonText: 'OK',
              type: 'info',
              callback: (action: any) => {
                this.$store.dispatch('clab');
                this.$router.push({
                  name: 'index',
                });
              },
            });
          }
        });
      }
    }

    // создание номера заказа
    private get orderIdent(): number {
      const rand = Basket.ORDER_IDENT_MIN + Math.random() * (Basket.ORDER_IDENT_MAX + 1 - Basket.ORDER_IDENT_MIN);
      return Math.floor(rand);
    }

    // подсчет итоговой суммы заказа
    private get orderTotal(): number {
      const basketTotal : BasketTotal = BasketHelper.getBasketPositions();
      return basketTotal.price;
    }

    // валидация email
    private validateEmail(rule: any, value: any, callback: any): void {
      if (value && value.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
        callback();
      } else {
        callback(new Error('Пожалуйста, укажите корректно Ваш Email'));
      }
    }
  }
</script>
