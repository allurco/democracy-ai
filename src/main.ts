import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createGtm } from '@gtm-support/vue-gtm'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.use(
  createGtm({
    id: 'GTM-M92N8HMQ',
    vueRouter: router,
  }),
)

app.mount('#app')
