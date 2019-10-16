import axios from 'axios';
import router from '@/router/router';
axios.interceptors.request.use((config: any) => {
  if (localStorage.getItem('ming_token')) {
    config.headers.Authorization = localStorage.getItem('ming_token');
  } else {
    // return router.push('./login');
  }
  return config;
}, (error: any) => {
  return Promise.reject(error);
});

axios.interceptors.response.use((response: any) => {
  return response;
}, (error: any) => {
  if (error.response) {
    switch (error.response.status) {
      case 401:
        router.replace({
          path: './login',
          query: {
            redirect: router.currentRoute.fullPath,
          },
        });
    }
  }
  return Promise.reject(error.response.data);
});
