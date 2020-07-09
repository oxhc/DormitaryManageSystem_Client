import axios from 'axios'
import {
  Message
} from 'element-ui'


const service = axios.create({
  baseURL: "http://api.dms.com/dms/",
  timeout: 3 * 1000,

})

service.defaults.withCredentials = true
service.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';


service.interceptors.request.use(config => {
  //发请求前做的一些处理，数据转化，配置请求头，设置token,设置loading等
   // const token = getCookie('名称');注意使用的时候需要引入cookie方法，推荐js-cookie

   // if(token){
   //   config.params = {'token':token}
   // }
  return config
}, error => {
  Promise.reject(error)
})


// 响应拦截器
service.interceptors.response.use(response => {
  //接收到响应数据并成功后的一些共有的处理
  if (response.data.hasOwnProperty('error')) {
      Message.error(response.data.error)
      return Promise.reject(response)
  }

  return response
}, error => {
  /***** 接收到异常响应的处理开始 *****/
  if (error && error.response) {
    // 1.公共错误处理
    // 2.根据响应码具体处理
    switch (error.response.status) {
      case 400:
        error.message = '错误请求'
        break;
      case 401:
        error.message = '未授权，请重新登录'
        break;
      case 403:
        error.message = '拒绝访问'
        break;
      case 404:
        error.message = '请求错误,未找到该资源'
        // window.location.href = "/NotFound"
        break;
      case 405:
        error.message = '请求方法未允许'
        break;
      case 408:
        error.message = '请求超时'
        break;
      case 500:
        error.message = '服务器端出错'
        break;
      case 501:
        error.message = '网络未实现'
        break;
      case 502:
        error.message = '网络错误'
        break;
      case 503:
        error.message = '服务不可用'
        break;
      case 504:
        error.message = '网络超时'
        break;
      case 505:
        error.message = 'http版本不支持该请求'
        break;
      default:
        error.message = `连接错误${error.response.status}`
    }
  } else {
    error.message('连接服务器失败')
  }

  Message.error(error.message)
  return reject(error)
})

export default service
