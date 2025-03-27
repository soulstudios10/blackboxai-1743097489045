import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/main.css'

// Create the Vue application
const app = createApp(App)

// Use the router
app.use(router)

// Mount the app
app.mount('#app')

// Global configuration
app.config.globalProperties.$filters = {
  formatPrice(value) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(value)
  }
}