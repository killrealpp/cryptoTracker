import { createRouter, createWebHistory } from "vue-router";
import HomeView from '@/views/HomeView.vue'
import Mainnet from "@/views/Mainnet.vue";
import Testnet from "@/views/Testnet.vue";
import Cryptocurrencies from "@/views/Cryptocurrencies.vue";
import Watchlist from "@/views/Watchlist.vue";

const routes = [
    {
        path: '/',
        component: HomeView
    },
    {
        path: '/mainnet',
        component: Mainnet
    },
    {
        path: '/testnet',
        component: Testnet
    },
    {
        path: '/cryptocurrencies',
        component: Cryptocurrencies
    },
    {
        path: '/watchlist',
        component: Watchlist
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router