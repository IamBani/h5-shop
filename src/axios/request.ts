import { AxiosRequestConfig } from 'axios'
import instance from '.'

type T = 'post' | 'get'
function request (url:string, method:T, params:any) {
  return instance.request({
    url,
    method,
    params
  })
}
