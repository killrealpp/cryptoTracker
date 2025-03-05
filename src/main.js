import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import App from './App.vue'
import './assets/global.scss'
import VueApexCharts from 'vue3-apexcharts';
import components from './components/UI'

const app = createApp(App)

components.forEach(component =>{
    app.component(component.name, component)
})

app
    .use(router)
    .component('apexchart', VueApexCharts)
    .use(createPinia())
    .mount('#app')
