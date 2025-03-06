<template>
    <header class="header">
        <div class="burger" @click="cryptoStore.toggleMenu">
            <span></span>
            <span></span>
            <span></span>
        </div>
        <nav class="burger__menu" :class="{'active': cryptoStore.isMenuOpen}" @click="cryptoStore.hideMenu">
            <ul class="burger__list" @click.stop>
                <li class="burger__item">
                    <a class="burger__item-link" @click="router.push('/cryptocurrencies')">Cryptocurrencies</a>
                </li>
                <li class="burger__item">
                    <a class="burger__item-link" href="https://www.sushi.com/ethereum/swap">Exchanges</a>
                </li>
                <li class="burger__item">
                    <a class="burger__item-link" href="https://opensea.io/assets/ethereum/0xe36f5350b097ea72e561ee154b45363c808a56d2/1510">NFT</a>
                </li>
                <li class="burger__item">
                    <a class="burger__item-link" @click="router.push('/watchlist')">Watchlist</a>
                </li>
                <li class="burger__item">
                    <a class="burger__item-link" href="https://telegra.ph/Kak-dostich-uspeshnogo-uspeha-v-kripte-10-17">Learn</a>
                </li>
            </ul>
        </nav>
        <div class="logo" @click="router.push('/')">
            <img class="logo__img" src="/logo.svg" alt="logo image">
            <span class="logo__title">Cryptory</span>
        </div>
        <nav class="menu">
            <ul class="menu__list">
                <li class="menu__item">
                    <a class="menu__item-link" @click="router.push('/cryptocurrencies')">Cryptocurrencies</a>
                </li>
                <li class="menu__item">
                    <a class="menu__item-link" href="https://www.sushi.com/ethereum/swap">Exchanges</a>
                </li>
                <li class="menu__item">
                    <a class="menu__item-link" href="https://opensea.io/assets/ethereum/0xe36f5350b097ea72e561ee154b45363c808a56d2/1510">NFT</a>
                </li>
                <li class="menu__item">
                    <a class="menu__item-link" @click="router.push('/watchlist')" >Watchlist</a>
                </li>
                <li class="menu__item">
                    <a class="menu__item-link" href="https://telegra.ph/Kak-dostich-uspeshnogo-uspeha-v-kripte-10-17">Learn</a>
                </li>
            </ul>
        </nav>
        <img class="avatar" src="/avatar.svg" alt="avatar">
    </header>
    <div class="net">
        <div class="mainnet" @click="router.push('/mainnet')">Mainnet</div>
        <div class="testnet" @click="router.push('/testnet')">Testnet</div>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useCryptoStore } from '@/stores/cryptoStore';
const router = useRouter()
const cryptoStore = useCryptoStore()

</script>

<style scoped lang="scss">
@import '/src/assets/header.scss';

</style>