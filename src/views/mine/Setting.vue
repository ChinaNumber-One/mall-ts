<template>
  <div class="home">
    <van-nav-bar
      title="设置"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <ul class='contentUl'>
      <p class='title'>个人信息</p>
      <li class='border-bottom'>
        <span class='label'>头像</span>
        <div class='liContent'>
          <van-uploader class='logoImg' :after-read='afterRead'>
            <img :src="userInfo.avatar" alt="" class="userImg">
          </van-uploader>
        </div>
        <van-icon name="arrow" />
      </li>
      <li class='border-bottom' @click='showChangeNameDialog = true'>
        <span class='label'>昵称</span>
        <div class='liContent'>{{userInfo.name}}</div>
        <van-icon name="arrow" />
      </li>
      <li class='border-bottom' @click="showChangeSexDialog = true">
        <span class='label'>性别</span>
        <div class='liContent'>{{userInfo.sex||'未完善'}}</div>
        <van-icon name="arrow" />
      </li>
      <li class='border-bottom' @click="showChangeBirthDialog = true">
        <span class='label'>生日</span>
        <div class='liContent'>{{userInfo.birth||'未完善'}}</div>
        <van-icon name="arrow" />
      </li>
      <li class='border-bottom' @click="showChangeAreaDialog = true">
        <span class='label'>地区</span>
        <div class='liContent'>{{userInfo.areaText||'未完善'}}</div>
        <van-icon name="arrow" />
      </li>
      <p class='title'>账号安全</p>
      <li class='border-bottom' @click="showChangePhoneDialog = true">
        <span class='label'>修改手机号</span>
        <div class='liContent'>{{userInfo.phone}}</div>
        <van-icon name="arrow" />
      </li>
      <li class='border-bottom' @click='showChangePasswordDialog = true'>
        <span class='label'>修改密码</span>
        <div class='liContent'></div>
        <van-icon name="arrow" />
      </li>
    </ul>
    <CutImg :img="orginAvatar" :show="showChangeAvatarDialog" @closeCutImg="closeCutImg" @getImgData='getImgData'/>
    <van-dialog
      v-model="showChangeNameDialog"
      title="更改昵称"
      show-cancel-button
      :beforeClose="changeUserNameConfirm">
      <van-field
        placeholder='昵称'
        size='large'
        v-model='userName'
        class='border-bottom input'
        @focus='errorName = false'
        clearable
        :error='errorName'
        right-icon='question-o'
        @click-right-icon="$toast({message:'2-12位，只能由中英文，数字，下划线，减号组成','position':'bottom'})"
      />
    </van-dialog>
    <van-dialog
      v-model="showChangeSexDialog"
      title="更改性别"
      show-cancel-button
      :beforeClose="changeSexConfirm">
      <van-radio-group v-model="sex" class='sexBox'>
        <van-radio class='radio' name="男">男</van-radio>
        <van-radio class='radio' name="女">女</van-radio>
      </van-radio-group>
    </van-dialog>
    <van-popup position="bottom" v-model="showChangeBirthDialog">
      <van-datetime-picker
      title="设置出生日期"
      v-model="birth"
      type="date"
      :min-date="minDate"
      :max-date="maxDate"
      @confirm="changeBirthConfirm"
      @cancel="showChangeBirthDialog = false"/>
    </van-popup>
    <van-popup position="bottom" v-model="showChangeAreaDialog">
      <van-area 
        :area-list="areaList" 
        @confirm="changeAreaConfirm"
        @cancel="showChangeAreaDialog = false"
        :value='userInfo.areaCode'/>
    </van-popup>
    <van-dialog
      v-model="showChangePhoneDialog"
      title="修改手机号"
      show-cancel-button
      :beforeClose='changePhoneConfirm'>
      <van-field
        placeholder='原手机号'
        label="原手机号"
        v-model='userInfo.phone'
        type='number'
        class='border-bottom input'
        readonly/>
      <van-field
        placeholder='新手机号'
        label="新手机号"
        v-model='phoneN'
        :maxlength='11'
        type='number'
        class='border-bottom input'
        @focus='errorPhoneN = false'
        clearable
        :error='errorPhoneN'
        right-icon='question-o'
        @click-right-icon="$toast({message:'仅支持国内11位手机号','position':'bottom'})"/>
      <van-field
        label="验证密码"
        v-model='password'
        type='password'
        placeholder='密码'
        class='border-bottom input'
        clearable
        right-icon='question-o'
        @click-right-icon="$toast({message:'6-16位，数字、字母、特殊符号中最少包括两种','position':'bottom'})"/>
    </van-dialog>
    <van-dialog
      v-model="showChangePasswordDialog"
      title="修改密码"
      show-cancel-button
      :beforeClose='changePasswordConfirm'>
      <van-field
        label="原密码"
        v-model='passwordO'
        type='password'
        placeholder='原密码'
        class='border-bottom input'
        clearable
        right-icon='question-o'
        @click-right-icon="$toast({message:'6-16位，数字、字母、特殊符号中最少包括两种','position':'bottom'})"/>
      <van-field
        label="新密码"
        v-model='passwordN'
        type='password'
        placeholder='新密码'
        class='border-bottom input'
        clearable
        :error='errorPassword'
        @focus='errorPassword = false'
        right-icon='question-o'
        @click-right-icon="$toast({message:'6-16位，数字、字母、特殊符号中最少包括两种','position':'bottom'})"/>
      <van-field
        label="确认密码"
        v-model='passwordNr'
        type='password'
        placeholder='再次输入新密码'
        class='border-bottom input'
        clearable
        :error='errorPasswordR'
        @focus='errorPasswordR = false'/>
    </van-dialog>
    <PageLoading v-show='showLoading' />
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';
import { NavBar, Uploader, Icon, Dialog, Field, RadioGroup, Radio, Popup, DatetimePicker, Area } from 'vant';
import CutImg from '@/components/cutImg.vue';
import PageLoading from '@/components/pageLoading.vue';
import province_list from '@/utils/citys';
import { nameReg, phoneReg, passwordReg } from '@/utils/regRxp';
import { User } from '@/api/index';
@Component({
  name: 'settingIndex',
  components: {
    CutImg,
    PageLoading,
    [NavBar.name]: NavBar,
    [Uploader.name]: Uploader,
    [Dialog.Component.name]: Dialog.Component,
    [Icon.name]: Icon,
    [Field.name]: Field,
    [RadioGroup.name]: RadioGroup,
    [Radio.name]: Radio,
    [Popup.name]: Popup,
    [DatetimePicker.name]: DatetimePicker,
    [Area.name]: Area,
  },
})
export default class SettingIndex extends Vue {
  private areaList: object = province_list; // 地区 数据
  private userInfo: any = {}; // userInfo （接口返回的数据）
  private userName: string = ''; // 修改用户名 input 绑定数据  为何不用userInfo.name?  输入框修改后 未知是否确定修改 或是否修改成功。故不能将原数据进行绑定，下同
  private sex: string = ''; // 性别
  private phoneN: string = ''; // 修改手机号 --- 新手机号
  private password: string = ''; // 修改手机号  需要验证的密码
  private passwordO: string = ''; // 修改密码  原密码
  private passwordN: string = ''; // 修改密码  新密码
  private passwordNr: string = ''; // 修改密码  重复新密码
  private orginAvatar: string = ''; // 用户选择的图片（剪裁之前）
  private showChangeAvatarDialog: boolean = false;
  private showChangeNameDialog: boolean = false;
  private showChangeSexDialog: boolean = false;
  private showChangeBirthDialog: boolean = false;
  private showChangeAreaDialog: boolean = false;
  private showChangePhoneDialog: boolean = false;
  private showChangePasswordDialog: boolean = false;
  private showLoading: boolean = false;
  private errorName: boolean = false; // 用户名 格式错误 红色提示
  private errorPhoneN: boolean = false;
  private errorPassword: boolean = false;
  private errorPasswordR: boolean = false;
  private minDate: Date = new Date('1900-01-01');
  private maxDate: Date = new Date();
  private birth: Date = new Date('1995-06-06');
  private mounted() {
    this.showLoading = true;
    this.getUserInfo();
  }
  private onClickLeft() {
    this.$router.replace('/mine');
  }
  private async getUserInfo() {
    const userInfo = await User.getUserInfo();
    this.userInfo = userInfo.data.userInfo;
    this.userName = userInfo.data.userInfo.name;
    this.sex = userInfo.data.userInfo.sex || '';
    this.birth = this.userInfo.birth ? new Date(this.userInfo.birth) : new Date('1995-06-06');
    this.showLoading = false;
  }
  private afterRead(files: any) {
    const { content, file } = files;
    this.showChangeAvatarDialog = true;
    this.orginAvatar = content;
  }
  private closeCutImg(flag: boolean) {
    this.showChangeAvatarDialog = flag;
  }
  private getImgData(imgData: string, flag: boolean) {
    this.userInfo.avatar = imgData;
    this.showChangeAvatarDialog = flag;
    this.updateUserInfo({
      avatar: imgData,
    });
  }
  private async changeUserNameConfirm(action: string, done: any) {
    if (action === 'confirm') {
      if (this.userName === this.userInfo.name) {
        return done();
      }
      if (!nameReg.test(this.userName)) {
        this.$notify({ type: 'danger', message: '昵称不合法！' });
        this.errorName = true;
        return done(false);
      } else {
        this.errorName = false;
        const res = await this.updateUserInfo({
          name: this.userName,
        });
        if (res) {
          done();
          this.userInfo.name = this.userName;
        } else {
          done(false);
        }
      }
    } else {
      this.userName = this.userInfo.name;
      done();
    }
  }
  private async changeSexConfirm(action: string, done: any) {
    if (action === 'confirm') {
      if (this.sex === this.userInfo.sex) {
        return done();
      }
      const res = await this.updateUserInfo({
        sex: this.sex,
      });
      if (res) {
        this.userInfo.sex = this.sex;
        done();
      } else {
        done(false);
      }
    } else {
      done();
    }
  }
  private async changePhoneConfirm(action: string, done: any) {
    if (action === 'confirm') {
      if (!phoneReg.test(this.phoneN.trim())) {
        this.$notify({ type: 'danger', message: '手机号格式错误！' });
        this.errorPhoneN = true;
        return done(false);
      } else {
        this.errorPhoneN = false;
      }
      if (!this.password) {
        this.$notify({ type: 'danger', message: '请输入密码！' });
        return done(false);
      }
      if (this.phoneN === this.userInfo.phone) {
        this.$notify({ type: 'danger', message: '新手机号与原手机号相同！' });
        return done(false);
      }
      const res = await User.changeUserPhone({
        phone: this.userInfo.phone,
        phoneN: this.phoneN,
        password: this.password,
      });
      if (res.data.status === 1) {
        this.$notify({
          type: 'success',
          duration: 1000,
          message: '修改成功！',
        });
        this.userInfo.phone = this.phoneN;
        done();
        this.phoneN = '';
        this.password = '';
      } else {
        this.$notify({
          type: 'danger',
          duration: 2000,
          message: res.data.msg,
        });
        done(false);
      }
    } else {
      done();
    }
  }
  private async changePasswordConfirm(action: string, done: any) {
    if (action === 'confirm') {
      if (!passwordReg.test(this.passwordN)) {
        this.$notify({ type: 'danger', message: '密码格式错误！' });
        this.errorPassword = true;
        return done(false);
      } else {
        this.errorPassword = false;
      }
      if (!passwordReg.test(this.passwordN) || this.passwordN !== this.passwordNr) {
        this.$notify({ type: 'danger', message: '两次密码输入不一致！' });
        this.errorPasswordR = true;
        return done(false);
      } else {
        this.errorPasswordR = false;
      }
      const res = await User.changeUserPassword({
        phone: this.userInfo.phone,
        password: this.passwordO,
        passwordN: this.passwordN,
      });
      if (res.data.status) {
        this.$notify({
          type: 'success',
          duration: 1000,
          message: '修改成功！',
        });
        this.passwordO = '';
        this.passwordN = '';
        this.passwordNr = '';
        done();
      } else {
        this.$notify({
          type: 'danger',
          duration: 2000,
          message: res.data.msg,
        });
        done(false);
      }
    } else {
      done();
    }
  }
  private changeBirthConfirm(val: Date) {
    const date = new Date(val);
    const newBirth = date.getFullYear() + '-'
      + ( '0' + (date.getMonth() + 1)).substr(-2) + '-'
      + ('0' + date.getDate() ).substr(-2);
    if (this.userInfo.birth === newBirth) {
      return this.showChangeBirthDialog = false;
    }
    this.userInfo.birth = newBirth;
    this.updateUserInfo({
      birth: this.userInfo.birth,
    });
    this.showChangeBirthDialog = false;
  }
  private changeAreaConfirm(val: any) {
    let areaText = '';
    val.forEach((item: any) => {
      areaText += item.name + ' ';
    });
    if (this.userInfo.areaCode === val[val.length - 1].code) {
      return this.showChangeAreaDialog = false;
    }
    this.userInfo.areaText = areaText;
    this.userInfo.areaCode = val[val.length - 1].code;
    this.updateUserInfo({
      areaText: this.userInfo.areaText,
      areaCode: this.userInfo.areaCode,
    });
    this.showChangeAreaDialog = false;
  }
  private async updateUserInfo(param: any) {
    const res = await User.updateUserInfo(param);
    if (res.data.status === 1) {
      this.$notify({
        type: 'success',
        duration: 1000,
        message: '保存成功！',
      });
    } else {
      this.$notify({
        type: 'warning',
        duration: 2000,
        message: res.data.msg,
      });
    }
    return res.data.status;
  }
}
</script>
<style lang="less" scoped>
  .home {
    .contentUl{
      .title {
        padding: .2rem .2rem;
        color: #999;
        font-size: 14px;
        line-height: .4rem;
      }
      li{
        background: #fff;
        display:flex;
        align-items: center;
        padding: .2rem .4rem;
        line-height: .8rem;
        font-size: 14px;
        .liContent {
          flex:1;
          padding: 0 .2rem;
          color: #999;
          text-align: right;
        }
        .userImg {
          width: 1.2rem;
          height: 1.2rem;
          border-radius: .1rem;
        }
      }
    }
    .sexBox {
      display: flex;
      padding: .3rem .6rem;
      align-items: center;
      .radio {
        flex:1;
      }
    }
  }
</style>

