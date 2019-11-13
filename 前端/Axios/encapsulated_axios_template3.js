// 第一步：配置axios
// 首先，创建一个Service.js，这里面存放的时axios的配置以及拦截器等，最后导出一个axios对象。我平常elementUI用的比较多，这里你也可以使用自己的UI库。
import axios from 'axios'
import { Message, Loading } from 'element-ui'
const ConfigBaseURL = 'https://localhost:3000/' //默认路径，这里也可以使用env来判断环境
let loadingInstance = null //这里是loading
//使用create方法创建axios实例
export const Service = axios.create({
  timeout: 7000, // 请求超时时间
  baseURL: ConfigBaseURL,
  method: 'post',
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  }
})
// 添加请求拦截器
Service.interceptors.request.use(config => {
  loadingInstance = Loading.service({
    lock: true,
    text: 'loading...'
  })
  return config
})
// 添加响应拦截器
Service.interceptors.response.use(response => {
  loadingInstance.close()
  // console.log(response)
  return response.data
}, error => {
  console.log('TCL: error', error)
  const msg = error.Message !== undefined ? error.Message : ''
  Message({
    message: '网络错误' + msg,
    type: 'error',
    duration: 3 * 1000
  })
  loadingInstance.close()
  return Promise.reject(error)
})
// 具体的拦截器逻辑以具体业务为准，我这里没什么逻辑，只是加了一个全局的loading而已


// 第二步：封装请求
// 这里我再创建一个request.js,这里面放的是具体请求。
import {Service} from './Service'
export function getConfigsByProductId(productId) {
  return Service({
    url: '/manager/getConfigsByProductId',
    params: { productId: productId }
  })
}
export function getAllAndroidPlugins() {
  return Service({
    url: '/manager/getAndroidPlugin ',
    method: 'get'
  })
}
export function addNewAndroidPlugin(data) {
  return Service({
    url: '/manager/addAndroidPlguin',
    data: JSON.stringify(data)
  })
}
// 当然你也可以url再封装一遍，放到另一个文件里，我觉得这样并无什么意义，反而增加复杂度。这里主要注意的是起名问题，建议按功能起名，例如我这里请求方式+功能或者内容+参数,这样子直接看getConfigsByProductId这个名字也是很清晰明了

// 第三步：使用
// 在vue组件中
import {getAllAndroidPlugins,getConfigsByProductId,addNewAndroidPlugin} from '@/api/request.js'
 
getAllAndroidPlugins()
.then(res=>{
 
})

// 全局使用 在main.js中

import {Service} from '@/api/Service.js'
Vue.prototype.$axios=Service
