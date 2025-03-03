import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import axios from 'axios';

export const useCryptoStore = defineStore('crypto', () => {
    const coins = ref([]);
    const loading = ref(false);
    const error = ref(null);
    const page = ref(1);
    const perPage = ref(10);

    const fetchCoins = async () => {
        loading.value = true;
        error.value = null;

        try {
            const response = await axios.get("https://api.coingecko.com/api/v3/coins/markets", {
                params: {
                    vs_currency: 'usd',
                    per_page: perPage.value,
                    page: page.value
                }
            });

            coins.value = response.data.map((coin, index)=>({
                ...coin,
                balance: index < 10 ? 1 : 0
            }))

            console.log(coins.value)

        } catch (err) {
            error.value = "Ошибка загрузки данных";
            console.error(err);
        } finally {
            loading.value = false;
        }
    };

    const loadMoreCoins = async () => {
        error.value = null;
        page.value += 1; 
        try {
            const response = await axios.get("https://api.coingecko.com/api/v3/coins/markets", {
                params: {
                    vs_currency: 'usd',
                    per_page: perPage.value,
                    page: page.value
                }
            });

            coins.value = [
                ...coins.value,
                ...response.data.map((coin, index)=>({
                    ...coin,
                    balance: coins.value.length + index < 10 ? 1 : 0
                }))
            ]

        } catch (err) {
            error.value = "Ошибка загрузки данных";
            console.error(err);
        }
    };

    const totalBalance = computed(() => {
        return coins.value.reduce((sum, coin) => sum + (coin.current_price * coin.balance), 0).toFixed(2);
    });

    return {
        coins, loading, error, fetchCoins, loadMoreCoins, totalBalance, 
    };
});