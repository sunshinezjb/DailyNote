vue封装axios基本思路

// Axios 是一个基于 promise 的 HTTP 库，可以用在浏览器和 node.js 中。在vue项目之中使用axios是一个非常明智的选择，因为vue官方已经宣称不再维护vue-resource,并且推荐使用axios.

// 1 为什么选择axios？

// 使用axios可以统一做请求-响应拦截，例如响应时我们将响应信息拦截起来，判断状态码，从而弹出报错信息
// 设定请求超时,例如3000ms未响应则停止请求
// 基于promise,可以很方便地使用then或者catch来处理请求
// 自动转换json数据
// 2 如何使用？

// 可以使用以下方式
npm install axios --save
bower install axios --save
<script src="https://unpkg.com/axios/dist/axios.min.js"></script>

// 3 封装http请求
// 官网给定的实例：
axios.get('/user?ID=12345')
  .then(function(response){
    console.log(response);
  })
  .catch(function(err){
    console.log(err);
  });
//   在此基础上我们应该再次封装http中的post get put delete方法，在具体页面只需要调用接口函数以及传入params即可，其余例如url,header之类的我们应该进行封装。
//   例如在index.vue之中使用一个函数来实现通过id来获取对应的用户信息，返回结果在then方法的result之中
API.getUserInfo({id:'01'}).then((result)=>{})
// 4 实现思路
// 新建一个文件，构建一个axios对象实例 例如axios.js
import axios from 'axios';
import router from '../router';
// 创建axios实例
const service = axios.create({            
  timeout: 30000 // 请求超时时间                                   
})
// 添加request拦截器 
service.interceptors.request.use(config => {         
  return config
}, error => {
  Promise.reject(error)
})
// 添加respone拦截器
service.interceptors.response.use(                  
  response => {
    let res={}; 
    res.status=response.status
    res.data=response.data;
    return res;
  },
  error => {
    if(error.response && error.response.status == 404){
     router.push('/blank.vue')
    }
   
        
    return Promise.reject(error.response)
  }
)

export function get(url, params = {}) {
  params.t = new Date().getTime(); //get方法加一个时间参数,解决ie下可能缓存问题.
  return service({
    url: url,
    method: 'get',
    headers: {     
    },
    params
  })
}


//封装post请求
export function post(url, data = {}) { 
  //默认配置 
  let sendObject={
    url: url,
    method: 'post',
    headers: {
      'Content-Type':'application/json;charset=UTF-8'       
    },
    data:data
  };
  sendObject.data=JSON.stringify(data);
  return service(sendObject)
}

//封装put方法 (resfulAPI常用)
export function put(url,data = {}){
  return service({
    url: url,
    method: 'put',
    headers: {
      'Content-Type':'application/json;charset=UTF-8'       
    },
    data:JSON.stringify(data)
  }) 
}
//删除方法(resfulAPI常用)
export function deletes(url){
  return service({
    url: url,
    method: 'delete',
    headers: {}
  }) 
}

//不要忘记export
export {
  service
}
// 上述代码主要实现一个基本的axios封装，请求成功时获取响应对象，我们主需要获取几个有用的信息即可，例如状态码，数据即可，同时处理错误，例如返回404我们跳转到一个新界面

// 封装接口函数
// 新建文件，例如api.js
import {get, post,deletes,put} from './axios.js' ;//导入axios实例文件中方法
let bsae_api = process.env.BASE_API ? './'+process.env.BASE_API :'..' //获取项目api请求地址
//根据id获取用户信息
export const getUserInfoById=(id)=>{
    return get(`${bsae_api}/web/user/${id}`); //resfulapi风格
}
// 具体页面使用 index.vue
import API from '@/utils/api'
getUserInfo(){
  API.getUserInfoById('01).then((result)=>{
   }).catch((error)=>{
 })
}
// 以上就是一些axios封装的基本介绍



