<template>
  <el-header>
    <div class="el-header__title" @click="$router.push({name:'index'})">
        <i class="fa fa-car" aria-hidden="true"></i> Автохимия и аксессуары
    </div>
    <basket-widget />
  </el-header>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';

  import BasketWidget from '@/components/BasketWidget.vue';

  @Component({
    components: {
      'basket-widget': BasketWidget,
    },
  })
  export default class PageHeader extends Vue {
  }
</script>
