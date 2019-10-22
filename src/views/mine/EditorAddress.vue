<template>
  <div class="home">
    <van-nav-bar
      :title='title'
      left-arrow
      @click-left='onClickLeft'
    />
    <van-address-edit
      :area-list="province_list"
      :address-info="addressInfo"
      show-postal
      show-delete
      show-set-default
      @save="onSave"
      @delete="onDelete"
    />
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';
import { NavBar } from 'vant';
import province_list from '@/utils/citys';
import { User } from '@/api/index';
@Component({
  name: 'editorAddress',
  components: {
    [NavBar.name]: NavBar,
  },
})
export default class EditorAddress extends Vue {
  private province_list = province_list;
  private addressInfo = {};
  private title = '';
  private created() {
    const info: any = this.$route.query.addressItem;
    if (info) {
      this.addressInfo = JSON.parse(info);
      this.title = '编辑收货地址';
    } else {
      this.title = '新增收货地址';
    }
  }
  private onClickLeft() {
    this.$router.go(-1);
  }
  private async onSave(content: any) {
    let  res;
    if (this.title === '新增收货地址') {
      res = await User.addAddress({
      ...content,
      address: content.country + ' '
      + content.province + ' '
      + content.city + ' '
      + content.county + ' '
      + content.addressDetail,
      });
    } else {
      content.address = content.country + ' '
      + content.province + ' '
      + content.city + ' '
      + content.county + ' '
      + content.addressDetail;
      res = await User.editorAddress(content);
    }
    if (res.data.status) {
      this.$notify({
        type: 'success',
        message: '保存成功！',
        duration: 1000,
        onClose: () => {
          this.$router.go(-1);
        },
      });
    } else {
      this.$notify({
        type: 'warning',
        message: res.data.msg,
        duration: 2000,
      });
    }
  }
  private async onDelete(content: any) {
    const res = await User.deleteAddress({id: content._id});
    if (res.data.status) {
      this.$notify({
        type: 'success',
        message: res.data.msg,
        duration: 1000,
        onClose: () => {
          this.$router.go(-1);
        },
      });
    } else {
      this.$notify({
        type: 'warning',
        message: res.data.msg,
        duration: 2000,
      });
    }

  }
}
</script>

