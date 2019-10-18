<template>
  <div>
    <div class='page'>
      <van-loading  color="#1989fa" />
    </div>
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';
@Component({
  name: 'pageLoading',
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
}
</style>
