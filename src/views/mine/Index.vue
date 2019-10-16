<template>
  <div class="home">
    <div class="header">
      <div class="userInfo">
        <img src="@/assets/defaultUserImg.png" alt="默认头像" />
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
        <li>
          <div>
            <van-icon name="location-o" size="20px" />
            <span>管理收货地址</span>
          </div>
          <van-icon name="arrow" />
        </li>
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
        <li @click='logout'>
          <div>
            <van-icon name="setting-o" size="20px" />
            <span>账号设置</span>
          </div>
          <van-icon name="arrow" />
        </li>
      </ul>
    </div>
    <div class="footer"></div>
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';
import { User } from '@/api/index';
// import axios from 'axios';
@Component
export default class MineIndex extends Vue {
  private userName = '请先登录';
  // public async mounted() {}
  private created() {
    if (localStorage.getItem('ming_token')) {
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
  }
  private logout() {
    localStorage.removeItem('ming_token');
    this.userName = '请先登录';
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
    background: #1989fa;
    .userInfo {
      display: flex;
      align-items: center;
      img {
        width: 1.2rem;
        height: 1.2rem;
        border-radius: 0.6rem;
        margin: 8px;
        // border: 1px solid #fff;
      }
      .userName {
        font-size: 18px;
        color: #fff;
        font-weight: 500;
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
