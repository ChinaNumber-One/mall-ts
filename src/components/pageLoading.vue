<template>
  <div>
    <div class='page'>
      <van-loading size="1rem"  color="#e7525c" />
    </div>
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';
import { Loading } from 'vant';

@Component({
  name: 'pageLoading',
  components: {
    [Loading.name]: Loading,
  },
})
export default class PageLoading extends Vue {}
</script>
<style lang="less" scoped>
.page {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background: rgba(255,255,255,.7);
  z-index: 400;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}
</style>
