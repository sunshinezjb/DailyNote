axios的用法与功能实现

// axios是基于promise的用于浏览器和nodejs的HTTP客户端，本身有以下特征：
// 从浏览器中创建XMLHttpRequest；
// 从nodejs发出http请求
// 支持promiseAPI
// 拦截 请求和响应
// 转换请求和响应数据
// 取消请求
// 自动转换JSON数据
// 客户端支持防止CSRF/XSRF攻击
// 初始化一些常用的配置项
axios.defaults.baseURL = 'https://www.easy-mock.com/mock/5b0412beda8a195fb0978627/temp';

axios.interceptors.response.use(result => result.data);
//=>设置响应拦截器：分别在响应成功和失败的时候做一些拦截处理（在执行成功后设定的方法之前，先会执行拦截器中的方法）

axios.defaults.validateStatus = function validateStatus(status) {
 //=>自定义成功失败规则：RESOLVE / REJECT（默认规则：状态码以2开头算作成功）
      return /^(2|3)\d{2}$/.test(status);
};

 //=>设置在POST请求中基于请求主体向服务器发送内容的格式，默认是RAW，项目中常用的是URL-ENCODEED格式
axios.defaults.headers['Content-Type'] = 'appliction/x-www-form-urlencoded';

axios.defaults.transformRequest = data => {
    //=>DATA:就是请求主体中需要传递给服务器的内容（对象）
    let str = ``;
    for (let attr in data) {
        if (data.hasOwnProperty(attr)) {
            str += `${attr}=${data[attr]}&`;
        }
    }
    return str.substring(0, str.length - 1);
};

// 使用方式示例
// 执行get数据请求
axios.get('url',{
  params:{
    id:'接口配置参数（相当于url?id=xxxx）'，
  },
}).then(function(res){
  console.log(res);//处理成功的函数 相当于success
}).catch(function(error){
  console.log(error)//错误处理 相当于error
})
// 执行post数据发送
axios.post('uel',{data:xxx},{
  headers:xxxx,
}).then(function(res){
  console.log(res);//处理成功的函数 相当于success
}).catch(function(error){
  console.log(error)//错误处理 相当于error
})
// axios API 通过相关配置传递给axios完成请求
axios({
  method:'delete',
  url:'xxx',
  cache:false,
  params:{id:123},
  headers:xxx,
})
//------------------------------------------//
axios({
  method: 'post',
  url: '/user/12345',
  data: {
    firstName: 'Fred',
    lastName: 'Flintstone',
  }
});
// axios的并发(axios.all,axios.spread)
let axiosList=[
   axios.get('url1',{params:xxx,dateType:'JSON'}),
   axios.get('url2',{params:xxx,dateType:'TEXT'}),
]
axios.all(axiosList).then(axios.spread(function(res1,res2){
  console.log(res1,res2)//分别是两个请求的返回值
});
// axios包含所有请求方式函数的封装、
axios.get(url [，config]);
axios.delete(url [，config]);
axios.head(url [，config]);
axios.post(url [，data [，config]]);
axios.put(url [，data [，config]]);
axios.patch(url [，data [，config]]);
// 当使用别名方法时，不需要在config中指定url，method和data属性。
// 创建实例
var instance = axios.create({//初始化数据
  baseURL: 'https://some-domain.com/api/',
  timeout: 1000,
  headers: {'X-Custom-Header': 'foobar'}
});
// axios请求配置项
// 1. `url`是将用于请求的服务器URL
url: '/user';
// 2. `method`是发出请求时使用的请求方法
method: 'get'; // 默认
// 3. `baseURL`将被添加到`url`前面，除非`url`是绝对的。
// 可以方便地为 axios 的实例设置`baseURL`，以便将相对 URL 传递给该实例的方法。
baseURL: 'https://some-domain.com/api/';
// 4. `transformRequest`允许在请求数据发送到服务器之前对其进行更改
// 这只适用于请求方法’PUT’，’POST’和’PATCH’
// 数组中的最后一个函数必须返回一个字符串，一个 ArrayBuffer或一个 Stream 
transformRequest: [function (data) {
// 做任何你想要的数据转换 然后  return data;
}];
// 5. `transformResponse`允许在 then / catch之前对响应数据进行更改
transformResponse: [function (data) {
  // 做任何你想要的数据转换 然后  return data;
}];
// 6. `headers`是要发送的自定义 headers
headers: {'X-Requested-With': 'XMLHttpRequest'};
// 7. `params`是要与请求一起发送的URL参数
// 必须是纯对象或URLSearchParams对象
params: {
  ID: 12345
}, 
8.  `paramsSerializer`是一个可选的函数，负责序列化`params`
// (e.g. https://www.npmjs.com/package/qs, http://api.jquery.com/jquery.param/)
paramsSerializer: function(params) {
  return Qs.stringify(params, {arrayFormat: ’brackets’})
}, 
9. `data`是要作为请求主体发送的数据
// 仅适用于请求方法“PUT”，“POST”和“PATCH”
// 当没有设置`transformRequest`时，必须是以下类型之一：
// - string, plain object, ArrayBuffer, ArrayBufferView, URLSearchParams
// - Browser only: FormData, File, Blob
// - Node only: Stream
data: {
  firstName: ’Fred’
}, 
10. `timeout`指定请求超时之前的毫秒数。
// 如果请求的时间超过’timeout’，请求将被中止。
timeout: 1000,
11.  `withCredentials`指示是否跨站点访问控制请求
withCredentials: false, // default
// 12.  `adapter’允许自定义处理请求，这使得测试更容易。
// 返回一个promise并提供一个有效的响应（参见[response docs]（＃response-api））
adapter: function (config) {
/* … */
}, 
// 13.  `auth’表示应该使用 HTTP 基本认证，并提供凭据。
// 这将设置一个`Authorization’头，覆盖任何现有的`Authorization’自定义头，使用`headers`设置。
auth: {
  username: ’janedoe’,
  password: ’s00pers3cret’
}, 
// 14.  “responseType”表示服务器将响应的数据类型
// 包括 ‘arraybuffer’, ‘blob’, ‘document’, ‘json’, ‘text’, ‘stream’
responseType: ‘json’, // default 
// 15. `xsrfCookieName`是要用作 xsrf 令牌的值的cookie的名称
xsrfCookieName: ‘XSRF-TOKEN’, // default 
// 16.  `xsrfHeaderName`是携带xsrf令牌值的http头的名称
xsrfHeaderName: ‘X-XSRF-TOKEN’, // default 
// 17.  `onUploadProgress`允许处理上传的进度事件
onUploadProgress: function (progressEvent) {
// 使用本地 progress 事件做任何你想要做的
}, 
// 18.  `onDownloadProgress`允许处理下载的进度事件
onDownloadProgress: function (progressEvent) {
}, 
// 19.  `maxContentLength`定义允许的http响应内容的最大大小
maxContentLength: 2000, 
// 20.  `validateStatus`定义是否解析或拒绝给定的promise
// HTTP响应状态码。如果`validateStatus`返回`true`（或被设置为`null` promise将被解析;否则，promise将被
  // 拒绝。
validateStatus: function (status) {
  return status >= 200 && status < 300; // default
}, 
// 21.  `maxRedirects`定义在node.js中要遵循的重定向的最大数量。
// 如果设置为0，则不会遵循重定向。
maxRedirects: 5, // 默认 
// 22.  `httpAgent`和`httpsAgent`用于定义在node.js中分别执行http和https请求时使用的自定义代理。
// 允许配置类似`keepAlive`的选项，
// 默认情况下不启用。
httpAgent: new http.Agent({ keepAlive: true }),
httpsAgent: new https.Agent({ keepAlive: true }), 
// 23.  ‘proxy’定义代理服务器的主机名和端口
// `auth`表示HTTP Basic auth应该用于连接到代理，并提供credentials。
// 这将设置一个`Proxy-Authorization` header，覆盖任何使用`headers`设置的现有的`Proxy-Authorization` 自定义 headers。
proxy: {
  host: ’127.0.0.1’,
  port: 9000,
  auth: : {
    username: ’mikeymike’,
    password: ’rapunz3l’
  }
};
// 24.  “cancelToken”指定可用于取消请求的取消令牌
cancelToken: new CancelToken(function (cancel) {
});
// 收到如下响应数据
console.log(response.data);
console.log(response.status);
console.log(response.statusText);
console.log(response.headers);
console.log(response.config);

// 初步封装一个类似于axios的函数
// 需求
// 执行返回一个promise对象
// 能够通过create方法配置初始化参数
// 包含所有的ajax的方法并返回promise对象
// 支持peomise.all并能用spread处理
(function () {
    function myAxios(options = {}) {
        myAxios.createDef = myAxios.createDef || {};
        myAxios._default = {
            method: 'GET',
            url: '',
            baseURL: '',
            cache: false,
            data: null,
            params: null,
            headers: {},
            dataType: 'JSON',
        }
        let {method,url,baseURL,cache,data,params,headers,dataType}={...myAxios._default, ...myAxios.createDef,...options};
        if (/^(get|delete|head|options)$/i.test(method)) {//get系列
            if (params) {
                url += /\?/g.test(url) ? '&' + myAxios.paramsSerializer(params) : '?' + myAxios.paramsSerializer(params);
            }
            if (cache === false) {
                url += /\?/g.test(url) ? '&_=' + new Date() : '?_=' + new Date();
            }
        } else {
            if (data) {
                data = myAxios.paramsSerializer(data);
            }
        }
        ;
        return new Promise(function (resolve, reject) {
            let xhr = new XMLHttpRequest();
            xhr.open(method, `${baseURL}${url}`);
            if (headers && typeof headers == 'object') {
                for (let attr in headers) {
                    if (!headers.hasOwnProperty(attr)) {
                        let val = /[\u4e00-\u9fa5]/.test(headers[attr]) ? encodeURIComponent(headers[attr]) : headers[attr];
                        xhr.setRequestHeader(attr, val);
                    }
                }
            }
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4) {
                    if (/2\d{2}/.test(xhr.status)) {
                        let result = xhr.responseText;
                        dataType = dataType.toUpperCase();
                        dataType === 'JSON' ? result = JSON.parse(result) : (dataType === 'XML' ? result = xhr.responseXML : null);
                        resolve(result);
                    } else {
                        reject('error');
                    }
                }
            }
            xhr.send(data);
        })
    };
    myAxios.paramsSerializer = function (params) {
        if (typeof params == 'string') {
            return params;
        }
        if (!params) {
            return null;
        }
        if (typeof params == 'object') {
            let res = '';
            for (let attr in params) {
                res += `${attr}=${params[attr]}&`;
            }
            res = res.substring(0, res.length - 1);
            return res;
        }
    };
    myAxios.all = function (data) {
        return Promise.all(data);
    };
    myAxios.spread = function (callback) {
        return function (arg) {
            callback.apply(null, arg);
        }
    };
    myAxios.create = function (options) {
        if (options && typeof options == 'object') {
            myAxios.createDef = options;
        }
    };

    ['get', 'delete', 'head', 'options'].forEach(item => {
        myAxios[item] = function (url, options = {}) {
            options = {
                ...options,
                url: url,
                method: item.toUpperCase()
            };
            return myAxios(options);
        }
    });
    ['post', 'put', 'patch'].forEach(item => {
        myAxios[item] = function (url, data = {}, options = {}) {
            options = {
                ...options,
                url: url,
                method: item.toUpperCase(),
                data: data,
            };
            return myAxios(options);
        }
    });
window.myAxios=myAxios;
})()
