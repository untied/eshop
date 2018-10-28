<template>
  <el-container>
    <page-header />
    <el-main>
      <router-view />
    </el-main>
  </el-container>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';

  import PageHeader from '@/components/PageHeader.vue';

  @Component({
    components : {
      'page-header': PageHeader,
    },
  })
  export default class App extends Vue {
    // URI файла с данными по товарам
    private static readonly DATA_GOODS = '/data/goods.json';

    // создание компонента
    public created(): void {
      this.loadJSON(App.DATA_GOODS, (goods: any) => {
        this.$store.dispatch('save', goods);
        this.$bus.$emit('goods-ready'); // отправляем событие, что товары загружены
      });
    }

    // загрузка JSON-файла по заданному URI
    private loadJSON(path: string, onSuccess?: any, onError?: any): void {
      const xhr: XMLHttpRequest = new XMLHttpRequest();
      xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          if (xhr.status === 200) {
            if (onSuccess) {
              onSuccess(JSON.parse(xhr.responseText));
            }
          } else if (onError) {
            onError(xhr);
          }
        }
      };
      xhr.open('GET', path, true);
      xhr.send();
    }
  }
</script>
