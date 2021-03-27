import tcb from '@cloudbase/js-sdk'

declare global {
  interface Window {
    _tcbEnv: any
  }
}

// 将你的环境 Id 填写到此处
window._tcbEnv = window._tcbEnv || {}
export const envId = window._tcbEnv.TCB_ENV_ID
export const region = window._tcbEnv.TCB_REGION

export const getApp = () => {
  const app = tcb.init({
    env: 'fyp-web-1gdzo8ub179215dc',
    region: region
  })

  app.auth({
    persistence: 'local'
  })
  
  return app
}
