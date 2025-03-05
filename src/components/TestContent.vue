<template>
    <div class="content">
        <div class="content__inner">

            <h1 class="content__main">Testnet</h1>

            <h4 class="content-balance__title">Current Ballance</h4>
            <div class="content-balance">
                <div class="content-balance__current">
                    <b class="content-balance__sum">
                        <span v-if="cryptoStore.loading">Loading...</span>
                        <span v-else-if="cryptoStore.error">{{ cryptoStore.error }}</span>
                        <span v-else>${{ cryptoStore.totalBalance }}</span>
                    </b>
                    <div class="procent" :class="{
                        'positive': cryptoStore.priceChangePercent >= 0,
                        'negative': cryptoStore.priceChangePercent < 0,
                    }">{{ cryptoStore.priceChangePercent }}%
                    </div>
                    <p class="bacs" :class="{
                        'positive': cryptoStore.priceChange >= 0,
                        'negative': cryptoStore.priceChange < 0,
                    }">${{ cryptoStore.priceChange }}
                    </p>
                </div>
                <button class="content-balance__add" @click="cryptoStore.showDialog">Add Crypto</button>
                <my-dialog v-model:show="cryptoStore.dialogVisible">
                    
                    <div class="add-list">
                        <input class="add__input" type="text" placeholder="Search..." v-model="cryptoStore.searchQuery"
                            v-if="!cryptoStore.selectedCoin">

                        <div class="add-list__scroll" v-if="!cryptoStore.addCoinsLoad && !cryptoStore.selectedCoin">
                            <div class="add-list__inner">
                                <TestCoinItem 
                                    class="coin-item" 
                                    v-for="coinItem in cryptoStore.searchCoin"    
                                    :key="coinItem.id" 
                                    :coinItem="coinItem" 
                                    @click="cryptoStore.selectCoin(coinItem)" 
                                    />
                            </div>
                        </div>

                        <div v-else-if="cryptoStore.addCoinsLoad">Loading...</div>

                        <div v-else>
                            <p>You selected: <strong>{{ cryptoStore.selectedCoin.name }}</strong></p>
                            <p>Тут конечно должен быть адрес, выбор сети и все такое</p>
                            <button class="exit__btn" @click="cryptoStore.selectedCoin = null">exit</button>
                        </div>
                    </div>


                </my-dialog>
            </div>



            <div class="content-chart">
                <test-balance-chart v-if="cryptoStore.chartTab === 1" />
                <div v-else>Chart off</div>
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
                        <TestCoin v-for="(coin, index) in cryptoStore.coins" :key="coin.id" :coin="coin" :index="index" />
                    </tbody>
                </table>


            </div>
        </div>
        <div ref="observer" class="observer"></div>
    </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue';
import { useCryptoStore } from '@/stores/cryptoStore';
import TestBalanceChart from '@/components/TestBalanceChart.vue';
import TestCoin from '@/components/TestCoin.vue';
import TestCoinItem from '@/components/TestCoinItem.vue';

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