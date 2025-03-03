import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import './assets/global.scss'
import VueApexCharts from 'vue3-apexcharts';

const app = createApp(App)

app
    .component('apexchart', VueApexCharts)
    .use(createPinia())
    .mount('#app')
