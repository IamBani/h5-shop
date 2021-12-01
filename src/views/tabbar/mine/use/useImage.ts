import useCheckingLogin from '@/use/useCheckingLogin'
export default function useImage (src:string):string {
  if (useCheckingLogin()) {
    // axios
    return ''
  } else {
    return src
  }
}
