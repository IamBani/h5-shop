import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import SvgIcon from './components/Svg.vue'
import VConsole from 'vconsole'
import VueAndtComponents from './plugins/components'
import './assets/scss/index.scss'

// const vConsole = new VConsole()
const app = createApp(App)
app.use(store).use(router).mount('#app')
app.component('svg-icon', SvgIcon)
app.use(VueAndtComponents)
