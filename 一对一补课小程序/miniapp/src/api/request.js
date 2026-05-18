// 全局 baseURL - 真机调试需要替换为可访问的地址
// 生产环境部署时，Vercel 会自动注入环境变量
export const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://one-on-one-tutoring.onrender.com/api';

const TOKEN_KEY = 'token';
export const getToken = () => uni.getStorageSync(TOKEN_KEY);
export const setToken = (t) => uni.setStorageSync(TOKEN_KEY, t);
export const clearToken = () => uni.removeStorageSync(TOKEN_KEY);

export function request(options) {
  const { url, method = 'GET', data, header = {} } = options;
  const token = getToken();
  if (token) header.Authorization = `Bearer ${token}`;

  return new Promise((resolve, reject) => {
    uni.request({
      url: BASE_URL + url,
      method,
      data,
      header: { 'Content-Type': 'application/json', ...header },
      success: (res) => {
        const body = res.data || {};
        if (res.statusCode === 401) {
          clearToken();
          uni.reLaunch({ url: '/pages/login/index' });
          return reject(body);
        }
        if (body.code === 0) resolve(body.data);
        else {
          uni.showToast({ title: body.msg || '请求失败', icon: 'none' });
          reject(body);
        }
      },
      fail: (err) => {
        uni.showToast({ title: '网络错误', icon: 'none' });
        reject(err);
      }
    });
  });
}

export const get = (url, data) => request({ url, method: 'GET', data });
export const post = (url, data) => request({ url, method: 'POST', data });
export const put = (url, data) => request({ url, method: 'PUT', data });
