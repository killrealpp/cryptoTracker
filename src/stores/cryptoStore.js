
import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import axios from 'axios';

export const useCryptoStore = defineStore('crypto', () => {
    const coins = ref([]);
    const loading = ref(false);
    const error = ref(null);
    const page = ref(1);
    const perPage = ref(10);
    const perAddPage = ref(27)
    const balanceHistory = ref([])
    const dialogVisible = ref(false)
    const chartTab = ref(1)
    const addCoins = ref([])
    const addCoinsLoad = ref(null)
    const searchQuery = ref('')
    const selectedCoin = ref(null)
    const homeVisivle = ref(false)
    const activePortfolio = ref('main')
    const newBalance = ref(0)
    const isMenuOpen = ref(false)


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

    
    const fetchAddCoins = async ()=>{
        addCoinsLoad.value = true
        try{
            const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
                params:{
                    vs_currency: 'usd',
                    per_page: perAddPage.value,
                    page: 1,
                }
            })
            addCoins.value = response.data
        } catch(e){
            console.error(e)
        } finally{
            addCoinsLoad.value = false
        }
    }



    const updateBalanceHistory = ()=>{
        const currentBalance = parseFloat(totalBalance.value)
        balanceHistory.value.push(currentBalance)
        if (balanceHistory.value.length > 10){
            balanceHistory.value.shift()
        }
    }


    const toggleMenu = ()=>{
        chartTab.value = 0
        isMenuOpen.value = !isMenuOpen.value
    }

    const hideMenu = ()=>{
        isMenuOpen.value = !isMenuOpen.value
        chartTab.value = 1
    }

    const showDialog = ()=>{
        dialogVisible.value = true
        chartTab.value = 0
        document.body.style.overflow = 'hidden'
        fetchAddCoins()
    }

    const showHome = ()=>{
        homeVisivle.value = true
        document.body.style.overflow = 'hidden'
    }



    const selectCoin = (coin)=>{
        selectedCoin.value = coin
    }



    const handleAddCoin = (coin)=>{
        console.log(coin)
        selectedCoin.value = coin
        dialogVisible.value = true
    }

    const updateCoinBalance = () => {
        if (selectedCoin.value && newBalance.value >= 0) {
            selectedCoin.value.balance = newBalance.value; 
            dialogVisible.value = false; 
        }
    };


    const createPortfolio = ()=>{
        dialogVisible.value = true
    }

    const totalBalance = computed(() => {
        return coins.value.reduce((sum, coin) => sum + (coin.current_price * coin.balance), 0).toFixed(2);
    });

    const priceChange = computed(()=>{
        if(balanceHistory.value < 2) return 0
        const lastPrice = balanceHistory.value.at(-1)
        const prevPrice = balanceHistory.value.at(-2)
        return (lastPrice - prevPrice).toFixed(2)
    })

    const priceChangePercent = computed(()=>{
        if (balanceHistory.value.length < 2) return "0.00";
        const lastPrice = balanceHistory.value.at(-1);
        const prevPrice = balanceHistory.value.at(-2);
        return ((lastPrice - prevPrice)/prevPrice * 100).toFixed(2)
    })

    
    const searchCoin = computed(()=>{
        if (!addCoins.value) return [];
        return addCoins.value.filter(coinItem => coinItem.name.toLowerCase().includes(searchQuery.value.toLowerCase()))
    })


    return {
        coins, loading, error, fetchCoins, loadMoreCoins, totalBalance, balanceHistory, priceChange, priceChangePercent, updateBalanceHistory,
        dialogVisible, showDialog, chartTab, addCoins, fetchAddCoins, perAddPage, addCoinsLoad, searchQuery, searchCoin, selectedCoin,
        selectCoin, homeVisivle, showHome, activePortfolio, handleAddCoin, newBalance, updateCoinBalance, createPortfolio, toggleMenu, isMenuOpen, hideMenu
    };
});
