import Cookies from 'js-cookie'
export default function useCheckingLogin ():boolean {
  return !!Cookies.get('token')
}
