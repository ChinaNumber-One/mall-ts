<template>
  <div class='home'>
    <van-nav-bar
      title='账号登录'
      left-text='首页'
      right-text='注册'
      left-arrow
      @click-left='onClickLeft'
      @click-right='onClickRight'
    />
    <div class='content'>
      <img src='@/assets/shuai.png' alt class='logoImg' />
      <van-field
        placeholder='手机号'
        size='large'
        v-model='userPhone'
        :maxlength='11'
        type='number'
        class='border-bottom input'
        @blur='validUserPhone'
        clearable
      >
        <i class='iconfont icon' slot='left-icon'>&#xe840;</i>
      </van-field>
      <van-field
        v-model='password'
        size='large'
        :type='pwdType'
        placeholder='密码'
        class='border-bottom input'
        :right-icon="rightIcon"
        clearable
        @click-right-icon="pwdRightIconClick"
      >
        <i class='iconfont icon' slot='left-icon'>&#xe635;</i>
      </van-field>
      <p class='forgetPwd'>忘记密码</p>
      <van-button type='info' class='loginBtn' size='large' @click='login'>登录</van-button>
    </div>
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';
import { phoneReg } from '@/utils/regRxp';

import { User } from '@/api';
@Component({
  name: 'loginIndex',
})
export default class LoginIndex extends Vue {
  private userPhone: string = '';
  private password: string = '';
  private rightIcon: string = 'closed-eye';
  private pwdType: string = 'password';
  private redirectPath: string = '/mine';
  public mounted() {
    if (this.$route.query.redirect && typeof this.$route.query.redirect === 'string') {
      this.redirectPath = this.$route.query.redirect;
    }
  }
  private validUserPhone() {
    if (!this.userPhone.trim()) { return; }
    if (!phoneReg.test(this.userPhone)) {
      this.$notify({ type: 'danger', message: '手机号格式错误！' });
    }
  }
  private onClickLeft() {
    this.$router.push('./');
  }
  private onClickRight() {
    this.$router.push('./register');
  }
  private pwdRightIconClick() {
    if (this.rightIcon === 'closed-eye') {
      this.rightIcon = 'eye-o';
      this.pwdType = 'text';
    } else {
      this.rightIcon = 'closed-eye';
      this.pwdType = 'password';
    }
  }
  private async login() {
    if (!this.userPhone) {
      this.$notify({ type: 'danger', message: '请输入手机号！' });
      return;
    }
    if (!this.password) {
      this.$notify({ type: 'danger', message: '请输入密码！' });
      return;
    }
    try {
      const res: any = await User.login({
          phone: this.userPhone,
          password: this.password,
        });
      if (res.data.status === 2) {
        const token: string = res.data.token;
        localStorage.setItem('ming_token', token);
        this.$toast({message: '登录成功', type: 'success', duration: 2000, onClose: () => {
          this.$router.push(this.redirectPath);
        }});
      } else {
        this.$notify({ type: 'danger', message: res.data.msg });
      }
    } catch (error) {
      this.$notify({ type: 'danger', message: error });
    }
  }
}
</script>
<style lang='less' scoped>
.home {
  background: #fff;
  min-height: 100vh;
  .content {
    font-size: 30px;
    padding: 0 0.4rem;
    .logoImg {
      display: block;
      height: 1.8rem;
      width: 1.8rem;
      background-color: #1989fa;
      border-radius: 0.9rem;
      padding: 0.1rem;
      margin: 0.6rem auto;
    }
    .icon {
      font-size: 20px;
    }
    .input {
      font-size: 16px;
    }
    .van-cell:not(:last-child)::after {
      display: none;
    }
    .forgetPwd {
      font-size: 14px;
      text-align: right;
      color: #666;
      margin-top: 0.2rem;
    }
    .loginBtn {
      margin-top: 0.88rem;
    }
  }
}
</style>

