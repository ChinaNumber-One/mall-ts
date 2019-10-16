<template>
  <div class="index">
    <router-view/>
    <Foot />
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';
import Foot from '../components/Foot.vue';
@Component({
  components: {
    Foot,
  },
})
export default class Home extends Vue {}
</script>
