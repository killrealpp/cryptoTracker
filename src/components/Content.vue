<template>
    <div class="content">
        <div class="content__inner">


            <div class="content-balance">
                <h4 class="content-balance__title">Current Ballance</h4>
                <b class="content-balance__sum">
                    <span v-if="cryptoStore.loading">Loading...</span>
                    <span v-else-if="cryptoStore.error">{{ cryptoStore.error }}</span>
                    <span v-else>${{ cryptoStore.totalBalance }}</span>
                </b>
            </div>


            <div class="content-chart">
                <div class="chart-placeholder">Chart Placeholder</div>
            </div>


            <div class="content-assets">
                <h4 class="content-assets__title">Your assets</h4>

                <table class="assets-table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Coin</th>
                            <th>Price</th>
                            <th>Balance</th>
                            <th>Total Value</th>
                        </tr>
                    </thead>
                    <tbody>
                        <Coin
                            v-for="(coin, index) in cryptoStore.coins"
                            :key="coin.id"
                            :coin="coin"
                            :index="index"
                        />
                    </tbody>
                </table>
                
                
            </div>
        </div>
        <div ref="observer" class="observer"></div>
    </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue';
import Coin from '@/components/Coin.vue';
import { useCryptoStore } from '@/stores/cryptoStore';

const observer = ref(null);

const cryptoStore = useCryptoStore();

onMounted(() => {
    cryptoStore.fetchCoins(); 

    nextTick(() => {
        if (observer.value) {
            const options = {
                rootMargin: "0px",
                threshold: 1.0,
            };

            const callback = (entries, observer) => {
                console.log('Пересечен');
                if (entries[0].isIntersecting) {
                    cryptoStore.loadMoreCoins(); 
                }
            };

            const intersectionObserver = new IntersectionObserver(callback, options);
            intersectionObserver.observe(observer.value); 
        } else {
            console.log('Observer element not available');
        }
    });
});
</script>

<style lang="scss">
@import '/src/assets/content.scss';
</style>