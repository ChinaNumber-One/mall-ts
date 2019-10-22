<template>
  <div class="home">
    <div class="header">
      <div class="userInfo">
        <img :src="userAvatar" alt="默认头像" />
        <p class="userName" @click="login">{{userName}}</p>
      </div>
      <div class="orderInfo">
        <div class="allOrder border-bottom">
          <p>我的订单</p>
          <span>
            查看全部订单
            <van-icon name="arrow" />
          </span>
        </div>
        <ul>
          <li>
            <i class="iconfont">&#xe673;</i>
            <span>待付款</span>
          </li>
          <li>
            <i class="iconfont">&#xe675;</i>
            <span>待发货</span>
          </li>
          <li>
            <i class="iconfont">&#xe671;</i>
            <span>待收货</span>
          </li>
        </ul>
      </div>
      <ul class="pageContent">
        <router-link to="/mine/address" tag='li'>
          <div>
            <van-icon name="location-o" size="20px" />
            <span>管理收货地址</span>
          </div>
          <van-icon name="arrow" />
        </router-link>
        <li>
          <div>
            <van-icon name="send-gift-o" size="20px" />
            <span>领券中心</span>
          </div>
          <van-icon name="arrow" />
        </li>
        <li>
          <div>
            <van-icon name="comment-o" size="20px" />
            <span>常见问题</span>
          </div>
          <van-icon name="arrow" />
        </li>
        <li>
          <div>
            <van-icon name="service-o" size="20px" />
            <span>联系客服</span>
          </div>
          <van-icon name="arrow" />
        </li>
        <router-link to="/mine/setting" tag='li'>
          <div>
            <van-icon name="setting-o" size="20px" />
            <span>信息修改</span>
          </div>
          <van-icon name="arrow" />
        </router-link>
      </ul>
    </div>
    <PageLoading v-show='showLoading' />
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';
import { Icon } from 'vant';
import PageLoading from '@/components/pageLoading.vue';
import { User } from '@/api/index';
@Component({
  name: 'mineIndex',
  components: {
    PageLoading,
    [Icon.name]: Icon,
  },
})
export default class MineIndex extends Vue {
  private userName: string = '请先登录';
  private showLoading: boolean = false;
  private userAvatar: string = 'https://static.wordming.cn/img/shuai.jpg';
  private created() {
    if (localStorage.getItem('ming_token')) {
      this.showLoading = true;
      this.getUserInfo();
    }
  }
  private login() {
    if (!localStorage.getItem('ming_token')) {
      this.$router.push('./login');
    }
  }
  private async getUserInfo() {
    const userInfo = await User.getUserInfo();
    this.userName = userInfo.data.userInfo.name;
    this.userAvatar = userInfo.data.userInfo.avatar;
    this.showLoading = false;
  }
}
</script>

<style scoped lang="less">
.home {
  height: calc(100vh - 50px);
  position: relative;
  .header {
    padding: 0.1rem;
    width: 100%;
    height: 3.5rem;
    background: #e7525c;
    .userInfo {
      display: flex;
      align-items: center;
      img {
        width: 1.2rem;
        height: 1.2rem;
        border-radius: 0.1rem;
        margin: 8px;
        margin-left: 24px;
        // border: 1px solid #fff;
      }
      .userName {
        font-size: 18px;
        color: #fff;
        font-weight: 500;
        margin-left: .14rem;
      }
    }
    .orderInfo {
      margin: 0.2rem 8px;
      background: #fff;
      box-shadow: 0px 0px 5px 2px #c5bfbf;
      border-radius: 0.1rem;
      ul {
        display: flex;
        align-items: center;
        justify-content: space-around;
        padding: 0.3rem 0;
      }
      li {
        display: flex;
        flex-direction: column;
        align-items: center;
        i {
          margin-bottom: 0.12rem;
          font-size: 0.56rem;
        }
      }
      .allOrder {
        padding: 0 0.2rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        line-height: 0.88rem;
        span {
          display: flex;
          align-items: center;
          color: #666;
          font-size: 12px;
        }
        p {
          color: #000;
        }
      }
    }
    .pageContent {
      min-height: 2rem;
      margin: 0.3rem 8px;
      background: #fff;
      box-shadow: 0px 0px 5px 2px #c5bfbf;
      border-radius: 0.1rem;
      padding: 0.2rem 0;
      li {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 0.88rem;
        padding: 0 0.4rem;
        div {
          display: flex;
          align-items: center;
          span {
            margin: 0 12px;
          }
        }
      }
    }
  }
}
</style>
