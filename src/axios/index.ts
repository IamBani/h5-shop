import axios, { AxiosRequestConfig, Method, AxiosResponse } from 'axios'
import { Toast } from 'vant'
import router from '@/router'
import store from '@/store'

/**
 * 跳转登录页
 * 携带当前页面路由，以期在登录页面完成登录后返回当前页面
 */
const toLogin = () => {
  router.replace({
    name: 'LoginPage'
  })
}

const errorHandle = (status: number, other: string) => {
  // 状态码判断
  switch (status) {
    case 302: Toast.fail('接口重定向了！')
      break
    case 400:
      Toast.fail('发出的请求有错误，服务器没有进行新建或修改数据的操作==>' + status)
      break
    // 401: 未登录
    // 未登录则跳转登录页面，并携带当前页面的路径
    // 在登录成功后返回当前页面，这一步需要在登录页操作。
    case 401: // 重定向
    //   Toast.fail("token:登录失效==>" + status + ":" + store.state.Roles)
    //   storage.remove(store.state.Roles)
    //   storage.get(store.state.Roles)
      router.replace({
        path: '/Login'
      })
      break
    // 403 token过期
    // 清除token并跳转登录页
    case 403:
      Toast.fail('登录过期,用户得到授权，但是访问是被禁止的==>' + status)
      // store.commit('token', null);
      setTimeout(() => {
        router.replace({
          path: '/Login'
        })
      }, 1000)
      break
    case 404:
      Toast.fail('网络请求不存在==>' + status)
      break
    case 406:
      Toast.fail('请求的格式不可得==>' + status)
      break
    case 408: Toast.fail(' 请求超时！')
      break
    case 410:
      Toast.fail('请求的资源被永久删除，且不会再得到的==>' + status)
      break
    case 422:
      Toast.fail('当创建一个对象时，发生一个验证错误==>' + status)
      break
    case 500:
      Toast.fail('服务器发生错误，请检查服务器==>' + status)
      break
    case 502:
      Toast.fail('网关错误==>' + status)
      break
    case 503:
      Toast.fail('服务不可用，服务器暂时过载或维护==>' + status)
      break
    case 504:
      Toast.fail('网关超时==>' + status)
      break
    default:
      Toast.fail('其他错误错误==>' + status)
  }
}

// 定义接口
interface PendingType {
  url?: string;
  method?: Method;
  params: any;
  data: any;
  cancel: any;
}
// 取消重复请求
const pending: Array<PendingType> = []
const CancelToken = axios.CancelToken

// 移除重复请求
const removePending = (config: AxiosRequestConfig) => {
  for (const key in pending) {
    const item: number = +key
    const list: PendingType = pending[key]
    // 当前请求在数组中存在时执行函数体
    if (list.url === config.url && list.method === config.method && JSON.stringify(list.params) === JSON.stringify(config.params) && JSON.stringify(list.data) === JSON.stringify(config.data)) {
      // 执行取消操作
      list.cancel('操作太频繁，请稍后再试')
      // 从数组中移除记录
      pending.splice(item, 1)
    }
  }
}

/* 实例化请求配置 */
const instance = axios.create({
  timeout: 1000 * 30,
  // 请求的base地址 TODO:这块以后根据不同的模块调不同的api
  baseURL: process.env.VUE_APP_API_URL,
  withCredentials: false
})

instance.interceptors.request.use(
  (config:AxiosRequestConfig) => {
    removePending(config)
    config.cancelToken = new CancelToken((c) => {
      pending.push(
        { url: config.url, method: config.method, params: config.params, data: config.data, cancel: c }
      )
      if (localStorage.get(store?.state?.Roles)) {
          config.headers!.Authorization = localStorage.get(store?.state?.Roles)
      }
    })
  }, (error) => {
    Toast.fail(error.data.error.message)
    return Promise.reject(error.data.error.message)
  }
)
instance.interceptors.response.use((config: AxiosResponse) => {
//   dataList.show = true
  removePending(config.config)
  // 请求成功
  if (config.status === 200 || config.status === 204) {
    setTimeout(() => {
    //   dataList.show = false
    }, 400)
    return Promise.resolve(config)
  } else {
    return Promise.reject(config)
  }
}, (error) => {
  const { response } = error
  if (response) {
    errorHandle(response.status, response.data.message)

    // 超时重新请求
    const config = error.config
    // 全局的请求次数,请求的间隙
    const [RETRY_COUNT, RETRY_DELAY] = [3, 1000]

    if (config && RETRY_COUNT) {
      // 设置用于跟踪重试计数的变量
      config.__retryCount = config.__retryCount || 0
      // 检查是否已经把重试的总数用完
      if (config.__retryCount >= RETRY_COUNT) {
        return Promise.reject(response || { message: error.message })
      }
      // 增加重试计数
      config.__retryCount++
      // 创造新的Promise来处理指数后退
      const backoff = new Promise<void>((resolve) => {
        setTimeout(() => {
          resolve()
        }, RETRY_DELAY || 1)
      })
      // instance重试请求的Promise
      return backoff.then(() => {
        return instance(config)
      })
    }

    return Promise.reject(response)
  } else {
    // 处理断网的情况
    // eg:请求超时或断网时，更新state的network状态
    // network状态在app.vue中控制着一个全局的断网提示组件的显示隐藏
    // 后续增加断网情况下做的一些操作
    store.commit('networkState', false)
  }
})

export default instance
