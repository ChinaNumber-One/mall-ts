import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/index',
      component: () => import('../views/Index.vue'),
      children: [
        {
          path: '/',
          name: 'homeIndex',
          meta: {
            title: '首页',
          },
          component: () => import('../views/index/Index.vue'),
        },
        {
          path: 'search',
          name: 'searchIndex',
          meta: {
            title: '搜索',
          },
          component: () => import('../views/search/Index.vue'),
        },
        {
          path: 'shopcar',
          name: 'shopcarIndex',
          meta: {
            title: '购物车',
          },
          component: () => import('../views/shopCar/Index.vue'),
        },
        {
          path: 'mine',
          name: 'mineIndex',
          meta: {
            title: '我的',
          },
          component: () => import('../views/mine/Index.vue'),
        },
      ],
    },
    {
      path: '/login',
      name: 'loginIndex',
      meta: {
        title: '登录',
      },
      component: () => import('../views/login/Index.vue'),
    },
    {
      path: '/register',
      name: 'registerIndex',
      meta: {
        title: '注册',
      },
      component: () => import('../views/register/Index.vue'),
    },
    {
      path: '/mine/setting',
      name: 'settingIndex',
      meta: {
        title: '设置',
      },
      component: () => import('../views/mine/Setting.vue'),
    },
  ],
});
