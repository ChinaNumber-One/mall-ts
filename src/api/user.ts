import ajax from '@/axios/interceptors';
export default {
  register(param: object): any {
    return ajax.post('/api/user/register', param);
  },
  login(param: object): any {
    return ajax.post('/api/user/login', param);
  },
  getUserInfo(): any {
    return ajax.get('/api/user/current');
  },
  updateUserInfo(param: object): any {
    return ajax.post('/api/user/update', param);
  },
  changeUserPhone(param: object): any {
    return ajax.post('/api/user/changePhone', param);
  },
  changeUserPassword(param: object): any {
    return ajax.post('/api/user/changePassword', param);
  },
};
