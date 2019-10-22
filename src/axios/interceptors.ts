import axios from 'axios';
import router from '@/router/router';
import { Notify } from 'vant';
const ajax = axios.create({
  baseURL: 'https://api.wordming.cn',
  // baseURL: 'http://192.168.2.115:5000',
});
ajax.interceptors.request.use((config: any) => {
  if (localStorage.getItem('ming_token')) {
    config.headers.Authorization = localStorage.getItem('ming_token');
  } else {
    // return router.push('./login');
  }
  return config;
}, (error: any) => {
  return Promise.reject(error);
});

ajax.interceptors.response.use((response: any) => {
  return response;
}, (error: any) => {
  if (error.response) {
    switch (error.response.status) {
      case 401:
        Notify({ type: 'danger', message: '登录过期', duration: 2000 , onClose: () => {
          return router.replace({
            path: '/login',
            query: {
              redirect: router.currentRoute.fullPath,
            },
          });
        }});
    }
  }
  return Promise.reject(error);
});

export default ajax;
