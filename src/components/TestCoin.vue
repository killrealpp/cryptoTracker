
<template>
    <tr>
        <td>{{ index + 1 }}</td>
        <td class="coin">
            <img class="coin-icon" :src="coin.image" :alt="coin.name">
            {{ coin.name }} ({{ coin.symbol.toUpperCase() }})
        </td>
        <td>${{ coin.current_price.toFixed(2) }}</td>
        <td>
            {{ coin.balance}}
        </td>
        <td>${{( coin.balance * coin.current_price).toFixed(2) }}</td>
        <td>
            <img   
                class="coin__plus"    
                src="/plus.svg"    
                alt="add coin"
                @click="$emit('add-coin', coin)"
            >
        </td>
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
    &__plus{
        transition: filter 0.3s ease;
        cursor: pointer;
        &:hover{
            filter: brightness(0.3);
        }
    }
}
.coin-icon {
    width: 24px;
    height: 24px;
}
</style>
