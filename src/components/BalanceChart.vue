<template>
    <div>
        <apexchart
            type="line"
            :options="chartOptions"
            :series="chartSeries"
            height="350"
        />
    </div>
</template>

<script setup>
import { ref, watchEffect, computed } from 'vue';
import { useCryptoStore } from '@/stores/cryptoStore';

const cryptoStore = useCryptoStore();

const chartSeries = ref([
    {
        name: "Total Balance",
        data: [],
    },
]);

const chartOptions = ref({
    chart: {
        id: "balance-chart",
        toolbar: { show: false },
        background: "#1e1e1e",
    },
    xaxis: {
        categories: [],
        labels: {
            style: { colors: "#ffffff", fontSize: "12px" }, // Цвет подписей оси X
        },
    },
    yaxis: {
        labels: {
            style: { colors: "#ffffff", fontSize: "12px" }, 
        },
    },
    stroke: {
        curve: "smooth",
        width: 3, 
        colors: ["#ff4d4d"], 
    },
    markers: {
        size: 5,
        colors: ["#ff4d4d"], 
        strokeColors: "#ffffff",
        strokeWidth: 2,
    },
    title: {
        text: "Balance Change Over Time",
        align: "center",
    },
    grid: {
        show: true,
    },
});

watchEffect(() => {
    const totalBalance = Number(cryptoStore.totalBalance); 
    const currentTime = new Date().toLocaleTimeString();

    console.log("Обновление графика:", totalBalance, currentTime); 

    const newSeries = [...chartSeries.value[0].data, totalBalance];
    const newCategories = [...chartOptions.value.xaxis.categories, currentTime];

    if (newSeries.length > 10) {
        newSeries.shift();
        newCategories.shift();
    }

    chartSeries.value = [{ name: "Total Balance", data: newSeries }];
    chartOptions.value = { ...chartOptions.value, xaxis: { categories: newCategories } };
});
</script>

<style lang="scss">
</style>
