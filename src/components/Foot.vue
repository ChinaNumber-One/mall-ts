<template>
  <div>
    <van-tabbar v-model="active" safe-area-inset-bottom @change='changeTab'>
      <van-tabbar-item icon="wap-home-o">首页</van-tabbar-item>
      <van-tabbar-item icon="search">搜索</van-tabbar-item>
      <van-tabbar-item icon="shopping-cart-o">购物车</van-tabbar-item>
      <van-tabbar-item icon="user-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
@Component
export default class Foot extends Vue {
  private active: number = 0;
  private created() {
    if (this.$route.path === '/') {
      this.active = 0;
    }
    if (this.$route.path === '/search') {
      this.active = 1;
    }
    if (this.$route.path === '/shopCar') {
      this.active = 2;
    }
    if (this.$route.path === '/mine') {
      this.active = 3;
    }
  }
  private changeTab(index: number) {
    if (index === 0) {
        this.$router.push('/');
      } else if (index === 1) {
        this.$router.push('/search');
      } else if (index === 2) {
        this.$router.push('/shopCar');
      } else if (index === 3) {
        this.$router.push('/mine');
      }
  }
}
</script>
