import axios from 'axios'
import { baseURL } from '@/config'

class HttpRequest {
  constructor(baseUrl = baseURL) {
    this.baseUrl = baseUrl
    this.queue = {}
  }
  getInsideConfig () {
    const config = {
      baseURL: this.baseUrl,
    }
    return config
  }
  distroy (url) {
    delete this.queue[url]
    if (!Object.keys(this.queue).length) {
      // Spin.hide()
    }
  }
  interceptors (instance, url) {
    instance.interceptors.request.use(config => {
      // 添加全局loading。。。
      if (!Object.keys(this.queue).length) {
        // Spin.show()
      }
      this.queue[url] = true
      return config
    }, error => {

      return Promise.reject(error)
    })
    instance.interceptors.response.use(res => {
      // this.distory(url)是什么意思？
      this.distroy(url)
      console.log('res' + JSON.stringify(res))
      const {data} = res
      return data
    }, error => {
      this.distroy(url)
      return Promise.reject(error)
    })
  }
  request(options) {
    const instance = axios.create()
    // 如果有相同属性名则，options中的属性会覆盖getInsideCongig()中的属性名
    options = Object.assign(this.getInsideConfig(), options)
    // console.log('options' + JSON.stringify(options))
    this.interceptors(instance, options.url)
    return instance(options)
  }
}
export default HttpRequest
