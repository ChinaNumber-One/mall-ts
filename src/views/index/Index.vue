<template>
  <div class="home">
    <div class='searchBox'>
      <img src="https://static.wordming.cn/img/shuai.png" alt="" class='logoImg'>
      <div class='inputBox'>
        <i class="iconfont icon">&#xe63d;</i>
        <span>搜索商品名称</span>
      </div>
      <van-icon name="user-o" size=".6rem" @click='goMinePage'/>
    </div>
    <van-swipe style="margin-top:-1px;">
      <van-swipe-item v-for="(image, index) in images" :key="index" class='swiperItem'>
        <div class='swiperItemBgHalf'></div>
        <img :src="image" alt="">
      </van-swipe-item>
    </van-swipe>
    <van-grid square :column-num="5" :border="false">
      <van-grid-item
        v-for="(item, index) in gridList"
        :key="index"
        :text="item.name">
        <span class='gridIcon-s iconfont' slot="icon">{{item.iconText}}</span>
      </van-grid-item>
    </van-grid>
    <van-notice-bar 
      text="正在开发，上线时间未定～。正在开发，上线时间未定～。正在开发，上线时间未定～。"
      background="#fff"
      color="#333">
      <i slot="left-icon" class="noticeIconText">商城早报</i>
    </van-notice-bar>
  </div>
</template>


<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';
import { Icon, Swipe, SwipeItem, Grid, GridItem, Button, NoticeBar} from 'vant';
@Component({
  name: 'index',
  components: {
    [Icon.name]: Icon,
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [Grid.name]: Grid,
    [GridItem.name]: GridItem,
    [Button.name]: Button,
    [NoticeBar.name]: NoticeBar,
  },
})
export default class Index extends Vue {
  private images = [
    'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/46ea854a06fe30bb930a3b4b426e8c08.jpg?thumb=1&w=720&h=360',
    'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/9e8be30d7e34410bf2cedabff54875cf.jpg?thumb=1&w=720&h=360',
  ];
  private gridList = [{
    name: '甄选鲜果',
    iconText: '11',
  }, {
    name: '营养食材',
    iconText: '·',
  }, {
    name: '禽蛋肉类',
    iconText: '11',
  }, {
    name: '水产海鲜',
    iconText: '预',
  }, {
    name: '粮油调味',
    iconText: '售',
  }, {
    name: '休闲零食',
    iconText: '低',
  }, {
    name: '家庭副食',
    iconText: '价',
  }, {
    name: '酒饮冲调',
    iconText: '提',
  }, {
    name: '日用百货',
    iconText: '前',
  }, {
    name: '更多',
    iconText: '享',
  }];
  private goMinePage() {
    this.$router.replace('/mine');
  }
}
</script>
<style lang="less" scoped>
.home {
  background: #fff;
  min-height: 100vh;
  .searchBox {
    display: flex;
    align-items: center;
    background: #e7525c;
    padding:.2rem;
    color: #fff;
    height: 1.2rem;
    margin: 0;
    .logoImg {
      height: .8rem;
      width: .8rem;
    }
    .inputBox {
      flex:1;
      height: .6rem;
      margin: .1rem 12px;
      padding: 0 8px;
      line-height: calc(.6rem - 2px);
      border: 1px solid #fff;
      border-radius: .08rem;
      .icon {
        margin-right: 4px;
      }

    }
  }
  .swiperItem {
    position: relative;
    height:4.15rem!important;
    width:100%;
    .swiperItemBgHalf {
      margin-top: -2px;
      background: #e7525c;
      height: 55%;
      width: 100%;
      border-bottom-right-radius: .4rem;
      border-bottom-left-radius: .4rem;
    }
    img {
      position: absolute;
      top: 0;
      display: block;
      margin:.2rem;
      width:calc(100% - .4rem);
      height:3.75rem;
      border-radius: .26rem;
    }
  }
  .noticeIconText {
    color: #d20000;
    font-weight: 900;
    padding-right: .1rem;
  }
  .gridIcon-s {
    display: block;
    background: #e7525c;
    color: #EFD4A0;
    border:.04rem solid #E2C076;
    height:.6rem;
    width:.6rem;
    border-radius: .4rem;
    text-align: center;
    line-height: .52rem;
    font-size: 18px;
    margin-bottom: .16rem;
  }
}
</style>
