import axios from "axios";
const tr = 0;
// api处理跨域
const apidomain = tr ? "/api" : "http://43.143.44.182:9080/";
axios.defaults.timeout = 15000; // 设置超时时长
axios.defaults.baseURL = apidomain; // 设置请求域名
// axios.defaults.withCredentials = true; // 设置跨域请求携带cookie
// axios.defaults.headers = {
//   'Content-Type': 'application/json;charset=UTF-8',
//   'Access-Control-Allow-Origin': 'http://172.16.106.231:9080',
// }

axios.interceptors.request.use(
  (config) => {
    // if (checkCookie('token')) {
      config.headers.token = sessionStorage.getItem('token')
    // }
    //
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 异常处理
const errorHandle = (callback, data) => {
  if (data.code == 200) {
    callback(data);
  } else {
    console.error("异常消息 ：", data);
    callback(data);
  }
};

/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */
export function fetch(url, params = {}) {
  return new Promise((resolve, reject) => {
    axios
      .get(url, {
        params: params,
      })
      .then((response) => {
        errorHandle(resolve, response.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

/**
 * 封装post请求
 * @param {string}url // 请求地址
 * @param {object}data // 请求参数
 * @returns Promise
 */
export function post(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.post(url, data).then(
      (response) => {
        errorHandle(resolve, response.data);
      },
      (err) => {
        reject(err);
      }
    );
  });
}