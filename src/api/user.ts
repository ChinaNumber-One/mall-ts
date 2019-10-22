import ajax from '@/axios/interceptors';
export default {
  test() {
    return ajax.get('/api/user/test');
  },
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
  addAddress(param: object): any {
    return ajax.post('/api/user/addAddress', param);
  },
  getAddress(): any {
    return ajax.get('/api/user/getAddress');
  },
  editorAddress(param: object): any {
    return ajax.post('/api/user/editorAddress', param);
  },
  deleteAddress(param: object): any {
    return ajax.post('/api/user/deleteAddress', param);
  },
};
