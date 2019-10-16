import Axios from 'axios';

export default {
  register(param: object): any {
    return Axios.post('https://mall.wordming.cn/api/user/register', param);
  },
  login(param: object): any {
    return Axios.post('https://mall.wordming.cn/api/user/login', param);
  },
  getUserInfo(): any {
    return Axios.get('https://mall.wordming.cn/api/user/current');
  },
};
