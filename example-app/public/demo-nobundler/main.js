const { createApp } = Vue

// const urlParams = new URLSearchParams(window.location.search)
// const myParam = urlParams.get('myParam')

import router from './router.js'
import store from './store.js'
import App from './app.js'
import './lib/esm/loading-overlay.js'

const app = createApp(App)
app.config.isCustomElement = tag => tag.startsWith('vcxwc-') || tag.startsWith('sl-')
app.use(store)
app.use(router)
app.mount('#app')
