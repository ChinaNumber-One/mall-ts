<template>
  <div class="home">
    <!-- {{res}} -->
  </div>
</template>


<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';
@Component
export default class Index extends Vue {
  private res: any = '';
  private async mounted() {
  //  this.res = await this.$http.get('http://127.0.0.1:5000/api/user/test');
  }
}
</script>
