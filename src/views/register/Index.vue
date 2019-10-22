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
    <div class='avatarBox'>
      <van-uploader class='logoImg' :after-read='afterRead'>
        <img :src='defaultAvatar' alt />
        <div class='editorAvatar'>
          <van-icon name='edit' />
        </div>
      </van-uploader>
    </div>
    <div class='content'>
      <van-field
        placeholder='昵称'
        size='large'
        v-model='userName'
        class='border-bottom input'
        @blur='validUserName'
        @focus='errorName = false'
        clearable
        :error='errorName'
        right-icon='question-o'
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
        @focus='errorPhone = false'
        clearable
        :error='errorPhone'
        right-icon='question-o'
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
        :error='errorPwd'
        @blur='validPassword'
        @focus='errorPwd = false'
        right-icon='question-o'
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
        :error='errorRePwd'
        @blur='validRePassword'
        @focus='errorRePwd = false'
      >
        <i class='iconfont icon' slot='left-icon'>&#xe635;</i>
      </van-field>
      <van-button type='danger' class='loginBtn' size='large' @click='register'>注册</van-button>
    </div>
    <CutImg :img="orginAvatar" :show="showDialog" @closeCutImg="closeCutImg" @getImgData='getImgData'/>
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';
import { Icon, NavBar, Uploader, Field, Button} from 'vant';
import CutImg from '@/components/cutImg.vue';
import { nameReg, phoneReg, passwordReg } from '@/utils/regRxp';
import { User } from '@/api';
@Component({
  name: 'registerIndex',
  components: {
    CutImg,
    [Icon.name]: Icon,
    [NavBar.name]: NavBar,
    [Uploader.name]: Uploader,
    [Field.name]: Field,
    [Button.name]: Button,
  },
})
export default class LoginIndex extends Vue {
  private userName: string = '';
  private userPhone: string = '';
  private password: string = '';
  private repassword: string = '';
  private defaultAvatar: string = 'https://static.wordming.cn/img/shuai.jpg';
  private file: any ;
  private errorName: boolean = false;
  private errorPhone: boolean = false;
  private errorPwd: boolean = false;
  private errorRePwd: boolean = false;
  private showDialog: boolean = false;
  private orginAvatar: string = '';
  private cropper: any;
  private validUserPhone() {
    if (!this.userPhone.trim()) {
      return;
    }
    if (!phoneReg.test(this.userPhone.trim())) {
      this.$notify({ type: 'danger', message: '手机号格式错误！' });
      this.errorPhone = true;
    } else {
      this.errorPhone = false;
    }
  }
  private validUserName() {
    if (!this.userName.trim()) {
      return;
    }
    if (!nameReg.test(this.userName)) {
      this.$notify({ type: 'danger', message: '昵称不合法！' });
      this.errorName = true;
    } else {
      this.errorName = false;
    }
  }
  private validPassword() {
    if (!this.password.trim()) {
      return;
    }
    if (!passwordReg.test(this.password)) {
      this.$notify({ type: 'danger', message: '密码格式错误！' });
      this.errorPwd = true;
    } else {
      this.errorPwd = false;
    }
  }
  private validRePassword() {
    if (!this.repassword.trim()) {
      return;
    }
    if (
      !passwordReg.test(this.repassword) ||
      this.repassword !== this.password
    ) {
      this.$notify({ type: 'danger', message: '两次输入密码不一致！' });
      this.errorRePwd = true;
    } else {
      this.errorRePwd = false;
    }
  }
  private afterRead(fileRes: any) {
    this.showDialog = true;
    const { content, file } = fileRes;
    this.file = file;
    this.orginAvatar = content;
  }
  private async register() {
    if (
      !this.userPhone ||
      !this.userName ||
      !this.password ||
      !this.repassword
    ) {
      this.$notify({ type: 'danger', message: '请填写完整！' });
      return;
    }
    if (this.errorName || this.errorPhone || this.errorPwd || this.errorRePwd) {
      this.$notify({ type: 'danger', message: '注册信息不合法！' });
      return;
    }
    const formData = new FormData();
    formData.append('name', this.userName);
    formData.append('phone', this.userPhone);
    formData.append('password', this.password);
    formData.append('avatar', this.defaultAvatar);
    try {
      const res: any = await User.register(formData);
      if (res.data.status === 2) {
        this.$toast({
          message: '注册成功',
          type: 'success',
          duration: 2000,
          onClose: () => {
            this.$router.push('./login');
          },
        });
      } else {
        this.$notify({ type: 'danger', message: res.data.msg });
      }
    } catch (error) {
      this.$notify({ type: 'danger', message: error });
    }
  }
  private closeCutImg(flag: boolean) {
    this.showDialog = flag;
  }
  private getImgData(imgData: string, flag: boolean) {
    this.defaultAvatar = imgData;
    this.showDialog = flag;
  }
  private onClickLeft() {
    this.$router.push('./');
  }
  private onClickRight() {
    this.$router.push('./login');
  }
}
</script>
<style lang='less' scoped>
.home {
  background: #fff;
  position: relative;
  min-height: 100vh;
  .avatarBox {
    background: #e7525c;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.4rem 0;
    .logoImg {
      display: block;
      position: relative;
      height: 1.8rem;
      width: 1.8rem;
      border-radius: 0.9rem;
      overflow: hidden;
      img {
        height: 100%;
        width: 100%;
      }
      .editorAvatar {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        text-align: center;
        background: rgba(0, 0, 0, 0.3);
        color: #e0e0e0;
        font-size: 24px;
      }
    }
  }
  .content {
    font-size: 30px;
    padding: 0 0.4rem;
    padding-top: .4rem;
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

