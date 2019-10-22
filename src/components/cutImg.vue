<template>
  <div class="page" v-if='show'>
    <van-nav-bar
      left-text="取消"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    >
      <van-button type="danger" slot="right" size="small">使用</van-button>
    </van-nav-bar>
    <div class="cropperBox">
      <vue-cropper autoCrop :img="img" :info="false" :outputSize='0.2' ref="cropper" centerBox fixed  :fixedNumber="[1,1]"/>
    </div>
  </div>
</template>

<script lang='ts'>
import { Component, Vue, Prop} from 'vue-property-decorator';
import { NavBar, Button } from 'vant';
import { VueCropper } from 'vue-cropper';
@Component({
  components: {
    VueCropper,
    [NavBar.name]: NavBar,
    [Button.name]: Button,
  },
})
export default class CutImg extends Vue {
  public $refs!: {
    cropper: VueCropper;
  };
  @Prop() private img!: string;
  @Prop() private show!: boolean;
  private onClickLeft() {
    this.$emit('closeCutImg', false);
  }
  private async onClickRight() {
    this.$refs.cropper.getCropData((data: any) => {
      this.$emit('getImgData', data, false);
    });
  }
}
</script>
<style lang="less" scoped>
  .page {
    position: absolute;
    height: 100vh;
    width: 100vw;
    z-index: 300;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    .cropperBox {
      flex:1;
    }
  }
</style>
