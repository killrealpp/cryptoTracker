<template>
    <tr>
        <td>{{ index + 1 }}</td>
        <td class="coin">
            <img class="coin-icon" :src="coin.image" :alt="coin.name">
            {{ coin.name }} ({{ coin.symbol.toUpperCase() }})
        </td>
        <td>${{ coin.current_price.toFixed(2) }}</td>
        <td>1.23</td>
        <td>${{( 1.23 * coin.current_price).toFixed(2) }}</td>
    </tr>
</template>

<script setup>
defineProps({
    coin: Object,
    index: Number
})
</script>

<style lang="scss">
.coin {
    display: flex;
    align-items: center;
    gap: 10px;
}
.coin-icon {
    width: 24px;
    height: 24px;
}
</style>