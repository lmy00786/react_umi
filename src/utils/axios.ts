import axios from 'axios';
import { message } from 'antd';
import qs from 'qs';
const http = axios.create({
  baseURL: '/', // 设置请求的base url
  timeout: 40000,
  transformRequest: function(data, headers) {
    if (data === null || typeof data !== 'object') return data;
    const conType = headers['Content-Type'] || headers.post['Content-Type'];
    if (/urlencoded/i.test(conType)) data = qs.stringify(data);
    if (/json/i.test(conType)) data = JSON.stringify(data);
    return data;
  },
  validateStatus: function(status) {
    return status >= 200 && status < 300;
  },
});
http.defaults.headers.post['Content-Type'] = 'application/json';
http.interceptors.request.use(
  config => {
    const username = sessionStorage.getItem('username');
    if (username) config.headers.username = JSON.parse(username);
    return config;
  },
  config => {
    message.warning('服务器奔了');
    return Promise.reject(config);
  },
);

// 响应 拦截器
http.interceptors.response.use(
  function onfulfilled(response) {
    // 统一处理内部401状态
    if (response.data.code === '401') return message.warning('无权限访问');
    return response.data;
  },
  function onrejected(reason) {
    const response = reason.response;
    if (response) {
      // 服务器有返回内容
      var errormsg = '';
      switch (response.status) {
        case 400:
          errormsg = '错误请求';
          break;
        case 401:
          errormsg = '未登录,请重新登录';
          break;
        case 403:
          errormsg = '拒绝访问';
          break;
        case 404:
          errormsg = '请求错误，未找到该资源';
          break;
        case 405:
          errormsg = '请求方法未允许';
          break;
        case 408:
          errormsg = '请求超时';
          break;
        case 500:
          errormsg = '服务器出错';
          break;
        case 501:
          errormsg = '网络未实现';
          break;
        case 502:
          errormsg = '网络错误';
          break;
        case 503:
          errormsg = '服务不可用';
          break;
        case 504:
          errormsg = '网络超时';
          break;
        case 505:
          errormsg = 'http版本不支持该请求';
          break;
        default:
          errormsg = '连接错误';
      }
      message.warning({ content: errormsg });
      return false;
    } else {
      if (!window.navigator.onLine) message.warning('网络中断');
      else message.warning('服务器奔了');
    }
    return Promise.reject(reason);
  },
);
export default http;
