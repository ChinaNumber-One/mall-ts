<template>
  <div class='home'>
    <van-nav-bar
      title='注册账号'
      left-text='首页'
      right-text='登录'
      left-arrow
      @click-left='onClickLeft'
      @click-right='onClickRight'
    />
    <div class='content'>
      <img src='@/assets/shuai.png' alt class='logoImg' />
      <van-field
        placeholder='用户名'
        size='large'
        v-model='userName'
        class='border-bottom input'
        @blur='validUserName'
        @focus="errorName = false"
        clearable
        :error="errorName"
        right-icon="question-o"
        @click-right-icon="$toast({message:'2-12位，只能由中英文，数字，下划线，减号组成','position':'bottom'})"
      >
        <i class='iconfont icon' slot='left-icon'>&#xe634;</i>
      </van-field>
      <van-field
        placeholder='手机号'
        size='large'
        v-model='userPhone'
        :maxlength='11'
        type='number'
        class='border-bottom input'
        @blur='validUserPhone'
        @focus="errorPhone = false"
        clearable
        :error="errorPhone"
        right-icon="question-o"
        @click-right-icon="$toast({message:'仅支持国内11位手机号','position':'bottom'})"
      >
        <i class='iconfont icon' slot='left-icon'>&#xe840;</i>
      </van-field>
      <van-field
        v-model='password'
        size='large'
        type='password'
        placeholder='密码'
        class='border-bottom input'
        clearable
        :error="errorPwd"
        @blur="validPassword"
        @focus="errorPwd = false"
        right-icon="question-o"
        @click-right-icon="$toast({message:'6-16位，数字、字母、特殊符号中最少包括两种','position':'bottom'})"
      >
        <i class='iconfont icon' slot='left-icon'>&#xe635;</i>
      </van-field>
      <van-field
        v-model='repassword'
        size='large'
        type='password'
        placeholder='再次输入密码'
        class='border-bottom input'
        clearable
        :error="errorRePwd"
        @blur="validRePassword"
        @focus="errorRePwd = false"
      >
        <i class='iconfont icon' slot='left-icon'>&#xe635;</i>
      </van-field>
      <van-button type='info' class='loginBtn' size='large' @click='register'>注册</van-button>
    </div>
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';
import { User } from '@/api';
@Component
export default class LoginIndex extends Vue {
  private userName: string = '';
  private userPhone: string = '';
  private password: string = '';
  private repassword: string = '';
  private errorName: boolean = false;
  private errorPhone: boolean = false;
  private errorPwd: boolean = false;
  private errorRePwd: boolean = false;
  private nameReg: RegExp = /^[\u4e00-\u9fa5A-Za-z0-9-_]{2,12}$/;
  private phoneReg: RegExp = /^1[3-9]\d{9}$/;
  private passwordReg: RegExp = /^(?![0-9]+$)(?![a-z]+$)(?![A-Z]+$)(?!([^(0-9a-zA-Z)])+$)^.{6,16}$/;
  private validUserPhone() {
    if (!this.userPhone.trim()) { return; }
    if (!this.phoneReg.test(this.userPhone.trim())) {
      this.$notify({ type: 'danger', message: '手机号格式错误！' });
      this.errorPhone = true;
    } else {
      this.errorPhone = false;
    }
  }
  private validUserName() {
    if (!this.userName.trim()) { return; }
    if (!this.nameReg.test(this.userName)) {
      this.$notify({ type: 'danger', message: '昵称不合法！' });
      this.errorName = true;
    } else {
      this.errorName = false;
    }
  }
  private validPassword() {
    if (!this.password.trim()) { return; }
    if (!this.passwordReg.test(this.password)) {
      this.$notify({ type: 'danger', message: '密码格式错误！' });
      this.errorPwd = true;
    } else {
      this.errorPwd = false;
    }
  }
  private validRePassword() {
    if (!this.repassword.trim()) { return; }
    if (!this.passwordReg.test(this.repassword) || this.repassword !== this.password) {
      this.$notify({ type: 'danger', message: '两次输入密码不一致！' });
      this.errorRePwd = true;
    } else {
      this.errorRePwd = false;
    }
  }
  private onClickLeft() {
    this.$router.push('./');
  }
  private onClickRight() {
    this.$router.push('./login');
  }
  private async register() {
    if (!this.userPhone || !this.userName || !this.password || !this.repassword) {
      this.$notify({ type: 'danger', message: '请填写完整！' });
      return;
    }
    if (this.errorName || this.errorPhone || this.errorPwd || this.errorRePwd) {
      this.$notify({ type: 'danger', message: '注册信息不合法！' });
      return;
    }
    try {
      const res: any = await User.register({
          name: this.userName,
          phone: this.userPhone,
          password: this.password,
        });
      if (res.data.status === 2) {
        this.$toast({message: '注册成功', type: 'success', onClose: () => {
          this.$router.push('./login');
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
  .van-nav-bar .van-icon,
  .van-nav-bar__text {
    color: #000;
  }
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
    .loginBtn {
      margin-top: 0.88rem;
    }
  }
}
</style>

