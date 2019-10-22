<template>
  <div>
    <van-tabbar v-model="active" safe-area-inset-bottom @change='changeTab' active-color="#e7525c"
  inactive-color="#000">
      <van-tabbar-item icon="wap-home-o">首页</van-tabbar-item>
      <van-tabbar-item icon="apps-o">分类</van-tabbar-item>
      <van-tabbar-item icon="shopping-cart-o">购物车</van-tabbar-item>
      <van-tabbar-item icon="user-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { Tabbar, TabbarItem } from 'vant';
@Component({
  name: 'pageFoot',
  components: {
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem,
  },
})
export default class Foot extends Vue {
  private active: number = 0;
  @Watch('$route.path')
  private watchPath(newVal: any, oldVal: any) {
    if (newVal === '/') {
      this.active = 0;
    }
    if (newVal === '/search') {
      this.active = 1;
    }
    if (newVal === '/shopCar') {
      this.active = 2;
    }
    if (newVal === '/mine') {
      this.active = 3;
    }
  }
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
        this.$router.replace('/');
      } else if (index === 1) {
        this.$router.replace('/search');
      } else if (index === 2) {
        this.$router.replace('/shopCar');
      } else if (index === 3) {
        this.$router.replace('/mine');
      }
  }
}
</script>
