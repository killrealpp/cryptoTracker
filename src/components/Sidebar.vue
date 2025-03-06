<template>
    <aside class="sidebar">
        <h2 class="sidebar__title">Network</h2>
        <ul class="sidebar__list">
            <div class="sidebar__list-inner">
                <li class="sidebar__item" :class="{ active: cryptoStore.activePortfolio === 'main' }"
                    @click="selectPortfolio('main', '/mainnet')">
                    <router-link to="/mainnet" />
                    <img class="sidebar__item-img" src="/avatar.svg" alt="sidebar network image">
                    <div class="sidebar__itemer">
                        <h4 class="sidebar__item-title">Main Portfolio</h4>
                        <span class="sidebar__item-sum"> = ${{ cryptoStore.totalBalance }}</span>
                    </div>
                </li>
                <li class="sidebar__item" :class="{ active: cryptoStore.activePortfolio === 'test' }"
                    @click="selectPortfolio('test', '/testnet')">
                    <router-link to="/testnet" />
                    <img class="sidebar__item-img" src="/avatar-test.svg" alt="sidebar network image">
                    <div class="sidebar__itemer">
                        <h4 class="sidebar__item-title">Test Portfolio</h4>
                        <span class="sidebar__item-sum"> = $14589</span>
                    </div>
                </li>
            </div>
            <img class="bro" src="/bro.png" alt="bro image">
        </ul>
    </aside>
</template>

<script setup>
import { useCryptoStore } from '@/stores/cryptoStore';
import { useRouter } from 'vue-router';

const cryptoStore = useCryptoStore()
const router = useRouter()

const selectPortfolio = (type, path) => {
    cryptoStore.activePortfolio = type
    router.push(path);
}

</script>

<style lang="scss">
@import '/src/assets/sidebar.scss';

.sidebar__item.active {
    background: #444;
    /* Зеленый фон */
    color: white;
}
</style>