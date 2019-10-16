import Vue from 'vue';
import App from './App.vue';
import router from './router/router';
import store from './store/store';
import '@/style/reset.css';
import '@/style/border.css';
import '@/assets/fonts/iconfont.css';
import Vant from 'vant';
import 'vant/lib/index.css';
import '@/style/theme.less';
import '@/axios/interceptors';
import axios from 'axios';
import VueAxios from 'vue-axios';
Vue.use(VueAxios, axios);
Vue.use(Vant);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
