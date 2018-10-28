<template>
  <el-card>
    <div slot="header">
      <span class="header__content">Страница не найдена</span>
    </div>
    <el-row>
      <el-col :md="2" :lg="5" :xl="7" class="hidden-sm-and-down"></el-col>
      <el-col :xs="24" :sm="24" :md="20" :lg="14" :xl="10">
        <div class="el-col__logo-404 float-left"></div>
        <div class="el-col__info-404 float-left">
          <strong>404</strong>
          Запрашиваемая страница не найдена!
          <div class="buttons">
            <el-button size="mini" icon="el-icon-back" @click="$router.push({name:'index'})">На главную</el-button>
          </div>
        </div>
      </el-col>
      <el-col :md="2" :lg="5" :xl="7" class="hidden-sm-and-down"></el-col>
    </el-row>
  </el-card>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';

  @Component
  export default class Error404 extends Vue {
  }
</script>
