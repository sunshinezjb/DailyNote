// 1.什么是axios?

// 　　axios是一个基于promise的HTTP库，可用在浏览器和Node.js中

// 2.axios基本用法

// 2.1 安装axios
// npm install axios
// 2.2 引入axios


import axios from 'axios';
// 2.3  axios提供的请求方式

 axios.request(config)
 
 axios.get(url[, config])

 axios.delete(url[, config])
 
 axios.head(url[, config])

 axios.post(url[, data[, config]])

 axios.put(url[, data[, config]])

 axios.patch(url[, data[, config]])

// 常用的只有get/post 方法

// 2.4 配置config文件（请求配置）

// 此处的config是对一些基本信息的配置，例如请求头，baseURL等

// config 请求配置文件

{
  // `url` 是用于请求的服务器 URL
  url: '/user',

  // `method` 是创建请求时使用的方法
  method: 'get', // 默认是 get

  // `baseURL` 将自动加在 `url` 前面，除非 `url` 是一个绝对 URL。
  // 它可以通过设置一个 `baseURL` 便于为 axios 实例的方法传递相对 URL
  baseURL: 'https://some-domain.com/api/',

  // `transformRequest` 允许在向服务器发送前，修改请求数据
  // 只能用在 'PUT', 'POST' 和 'PATCH' 这几个请求方法
  // 后面数组中的函数必须返回一个字符串，或 ArrayBuffer，或 Stream
  transformRequest: [function (data) {
    // 对 data 进行任意转换处理

    return data;
  }],

  // `transformResponse` 在传递给 then/catch 前，允许修改响应数据
  transformResponse: [function (data) {
    // 对 data 进行任意转换处理

    return data;
  }],

  // `headers` 是即将被发送的自定义请求头
  headers: {'X-Requested-With': 'XMLHttpRequest'},

  // `params` 是即将与请求一起发送的 URL 参数
  // 必须是一个无格式对象(plain object)或 URLSearchParams 对象
  params: {
    ID: 12345
  },

  // `paramsSerializer` 是一个负责 `params` 序列化的函数
  // (e.g. https://www.npmjs.com/package/qs, http://api.jquery.com/jquery.param/)
  paramsSerializer: function(params) {
    return Qs.stringify(params, {arrayFormat: 'brackets'})
  },

  // `data` 是作为请求主体被发送的数据
  // 只适用于这些请求方法 'PUT', 'POST', 和 'PATCH'
  // 在没有设置 `transformRequest` 时，必须是以下类型之一：
  // - string, plain object, ArrayBuffer, ArrayBufferView, URLSearchParams
  // - 浏览器专属：FormData, File, Blob
  // - Node 专属： Stream
  data: {
    firstName: 'Fred'
  },

  // `timeout` 指定请求超时的毫秒数(0 表示无超时时间)
  // 如果请求话费了超过 `timeout` 的时间，请求将被中断
  timeout: 1000,

  // `withCredentials` 表示跨域请求时是否需要使用凭证
  withCredentials: false, // 默认的

  // `adapter` 允许自定义处理请求，以使测试更轻松
  // 返回一个 promise 并应用一个有效的响应 (查阅 [response docs](#response-api)).
  adapter: function (config) {
    /* ... */
  },

  // `auth` 表示应该使用 HTTP 基础验证，并提供凭据
  // 这将设置一个 `Authorization` 头，覆写掉现有的任意使用 `headers` 设置的自定义 `Authorization`头
  auth: {
    username: 'janedoe',
    password: 's00pers3cret'
  },

  // `responseType` 表示服务器响应的数据类型，可以是 'arraybuffer', 'blob', 'document', 'json', 'text', 'stream'
  responseType: 'json', // 默认的

  // `xsrfCookieName` 是用作 xsrf token 的值的cookie的名称
  xsrfCookieName: 'XSRF-TOKEN', // default

  // `xsrfHeaderName` 是承载 xsrf token 的值的 HTTP 头的名称
  xsrfHeaderName: 'X-XSRF-TOKEN', // 默认的

  // `onUploadProgress` 允许为上传处理进度事件
  onUploadProgress: function (progressEvent) {
    // 对原生进度事件的处理
  },

  // `onDownloadProgress` 允许为下载处理进度事件
  onDownloadProgress: function (progressEvent) {
    // 对原生进度事件的处理
  },

  // `maxContentLength` 定义允许的响应内容的最大尺寸
  maxContentLength: 2000,

  // `validateStatus` 定义对于给定的HTTP 响应状态码是 resolve 或 reject  promise 。如果 `validateStatus` 返回 `true` (或者设置为 `null` 或 `undefined`)，promise 将被 resolve; 否则，promise 将被 rejecte
  validateStatus: function (status) {
    return status >= 200 && status < 300; // 默认的
  },

  // `maxRedirects` 定义在 node.js 中 follow 的最大重定向数目
  // 如果设置为0，将不会 follow 任何重定向
  maxRedirects: 5, // 默认的

  // `httpAgent` 和 `httpsAgent` 分别在 node.js 中用于定义在执行 http 和 https 时使用的自定义代理。允许像这样配置选项：
  // `keepAlive` 默认没有启用
  httpAgent: new http.Agent({ keepAlive: true }),
  httpsAgent: new https.Agent({ keepAlive: true }),

  // 'proxy' 定义代理服务器的主机名称和端口
  // `auth` 表示 HTTP 基础验证应当用于连接代理，并提供凭据
  // 这将会设置一个 `Proxy-Authorization` 头，覆写掉已有的通过使用 `header` 设置的自定义 `Proxy-Authorization` 头。
  proxy: {
    host: '127.0.0.1',
    port: 9000,
    auth: : {
      username: 'mikeymike',
      password: 'rapunz3l'
    }
  },

  // `cancelToken` 指定用于取消请求的 cancel token
  // （查看后面的 Cancellation 这节了解更多）
  cancelToken: new CancelToken(function (cancel) {
  })
}

//  有了配置文件，我们就可以直接拿来使用，大大减少了很多重复性的代码。例如：

   axios
        .post(url,{},config)
        .then(function(res) {
            console.log(res);
        })
        .catch(function(err) {
            console.log(err);
        });

    // axios请求返回的也是一个promise，跟踪错误只需要在最后加一个catch即可
   

// 2.5 同时发起多个请求处理（并发）

　　axios.all(iterable);　　// iterable为请求函数

　　axios.spread(callback);　　// callback为请求成功后的处理函数


 function getUserAccount() {
     return axios.get('/user/12345');
 }

 function getUserPermissions () {
     return axios.get('/user/12345/permissions');
 }

 axios
    .all([getUserAccount(),getUserPermissions()])
    .then(axios.spread(function(acct,perms){
        // 只有两个请求都完成才会成功，否则会被catch捕获
    }));

// 2.6 创建实例

// 可以使用自定义的配置新建一个axios实例：axios.create([config]);

     // 创建实例
    var instance = axios.create({
        baseURL: 'https://some-domain.com/api/',
        timeout: 1000,
        headers: {'X-Custom-Header': 'foobar'}
    });
 

// 2.7  响应结构

// 某个请求的响应包含以下信息

{
  // `data` 由服务器提供的响应
  data: {},

  // `status` 来自服务器响应的 HTTP 状态码
  status: 200,

  // `statusText` 来自服务器响应的 HTTP 状态信息
  statusText: 'OK',

  // `headers` 服务器响应的头
  headers: {},

  // `config` 是为请求提供的配置信息
  config: {}
}
// 当使用then时，将接受下面这样的响应：

   axios
        .get('/user/12345')
        .then(function(response) {
            console.log(response.data);
            console.log(response.status);
            console.log(response.statusText);
            console.log(response.headers);
            console.log(response.config);
        });

// 2.8 错误处理

// 错误处理
axios
    .get('/user/12345')
    .catch(function(error) {
        if(error.response) {
            // 请求已发出，但服务器响应的状态码不在 2xx 范围内
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        } else {
            console.log('Error',error.message);
        }
        console.log(error.config);
    });

// 2.9 配置默认值（default）

//  可以指定各请求方式的默认值

// 　　2.9.1 配置全局的axios默认值

axios.defaults.baseURL = 'https://api.example.com';
axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
　　

// 　　2.9.2 配置自定义实例的默认值
 // 自定义实例默认值

 // 创建实例时设置的默认值
 var instance = axios.create({
     baseURL:'https://api.example.com',
 });

 // 创建实例后修改默认值
 instance.defaults.headers.common['Authorization'] = AUTH_TOKEN;

// 　　2.9.3 配置的优先级

// 　　配置信息会以一个优先顺序进行合并。这个优先级顺序是：

// 　　首先ib/defaults.js找到的库的默认值 < 然后实例的default属性 < 最后请求的config参数

// 　　例子：

// 使用由库提供的配置默认值来创建实例。此时超时配置的默认值是 `0`
var instance = axios.create();

// 覆写库的超时默认值。现在在超时前所有请求都会等待 2.5 秒
instance.defaults.timeout = 2500;

// 为已知需要花费很长时间的请求覆写超时设置
instance.get('/longRequest', {
  timeout: 5000
});

// 2.10 拦截器

//  　　2.10.1  在请求或响应被 then 或 catch 处理前拦截它们

// 添加请求拦截器
axios.interceptors.requset.use(
    function(config) {
        //  在请求之前做些什么
        return config;
    },
    function(error) {
        // 对请求错误做些什么
        return Promise.reject(error);
    }
);

// 添加响应拦截器
axios.interceptors.response.use(
    function(response) {
        // 对响应数据做点什么
        return response;
    },
    function(error) {
        // 对响应错误做点什么
        return Promise.reject(error);
    }
);
 

// 2.10.2 为自定义axios实例添加拦截器　　　

// 为自定义的axios实例添加拦截器
var instance = axios.create();  // 创建axios实例
instance.interceptors.requset.use(function() {/*...*/});
 

// 2.10.3  移除拦截器

　　

// 移除拦截器
var myInterceptor = axios.interceptors.request.use(function() {/*...*/});   // 添加请求拦截器
axios.interceptors.requset.eject(myInterceptor);    // 移除拦截器