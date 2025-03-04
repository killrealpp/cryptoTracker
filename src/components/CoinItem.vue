<template>
    <tr>
        <td class="coin">
            <img class="coin-icon" :src="coinItem.image" :alt="coinItem.name">
            {{ coinItem.name }} ({{ coinItem.symbol.toUpperCase() }})
        </td>
    </tr>
</template>

<script setup>
defineProps({
    coinItem: Object
})
</script>

<style lang="scss">
.coin {
    display: flex;
    align-items: center;
    gap: 10px;
}
.coin-icon {
    width: 12px;
    height: 12px;
}
</style>