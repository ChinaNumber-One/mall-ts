<template>
  <div class="home">
    <van-nav-bar
      title='我的收货地址'
      left-arrow
      @click-left='onClickLeft'
    />
    <van-address-list
      :switchable='false'
      :list="list"
      @add="onAdd"
      @edit="onEdit">
      <p slot="default" class='noAddress' v-if='!list.length'>暂无收货地址</p>
    </van-address-list>
    <PageLoading v-show='showLoading' />
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';
import PageLoading from '@/components/pageLoading.vue';
import { NavBar } from 'vant';
import { User } from '@/api/index';
@Component({
  name: 'addressList',
  components: {
    PageLoading,
    [NavBar.name]: NavBar,
  },
})
export default class AddressList extends Vue {
  private list = [];
  private showLoading = false;
  private mounted() {
    this.showLoading = true;
    this.getAddressList();
  }
  private async getAddressList() {
    const res = await User.getAddress();
    if (res.data.status) {
      this.showLoading = false;
      this.list = res.data.list.filter((item: any) => {
         return item.isDefault === true;
      }).concat(res.data.list.filter((item: any) => {
         return item.isDefault === false;
      }));
    }
  }
  private onAdd() {
    this.$router.push({
      path: '/mine/address/editor',
    });
  }
  private onEdit(item: object, index: number) {
    this.$router.push({
      path: '/mine/address/editor',
      query: { addressItem: JSON.stringify(item)},
    });
  }
  private onClickLeft() {
    this.$router.replace('/mine');
  }
}
</script>
<style lang="less" scoped>
.home {
  .noAddress {
    text-align: center;
    font-size: 16px;
    line-height: 2rem;
  }
}
</style>
