import axios from 'axios'

// 创建axios请求实例
const request = axios.create({
  baseURL: '/api', // 设置跨域代理接口统一的前置地址
  timeout: 1000,
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
    'Authorization': localStorage.getItem('token')
  }
})

// 添加请求拦截器
request.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
request.interceptors.response.use(function (response) {
  // 只返回数据
  return response.data
}, function (error) {
  const status = error.response.status
  if (status >= 500) {
    alert('服务繁忙请稍后再试')
  } else if (status >= 400) {
    alert(error.response.data.message)
  }
  // 对响应错误做点什么
  console.dir(error)
  return Promise.reject(error)
})

const get = (url, data) => request.get(url, {
  params: data
})
const post = (url, data) => request.post(url, data);

// const delete = (url, data) => request.delete(url, data)
// const head = (url, data) => request.head(url, data)
// const options = (url, data) => request.options(url, data)
// const put = (url, data) => request.put(url, data)
// const patch = (url, data) => request.patch(url, data)

export {
    get,
    post
  }