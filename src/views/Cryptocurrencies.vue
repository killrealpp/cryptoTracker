<template>
    <div class="cryp">
        <h1 data-text="Cryptocurrencies">Cryptocurrencies</h1>

    </div>
</template>

<script setup>

</script>

<style scoped lang="scss">
.cryp{
    display: flex;
    flex-direction: column;
    justify-content: center;
    min-height: 100vh;
    background: #242424;
}
h1{
    color: #242424;
    font-size: 80px;
    position: relative;
    text-transform: uppercase;
    margin: auto;
    &::before{
        content: attr(data-text);
        width: 0;
        height: 100%;
        color: red;
        overflow: hidden;
        position: absolute;
        top: 0;
        left: 0;
        animation: animate 5s linear infinite;
    }
}

@keyframes animate{
    0%, 10%, 100%{
        width: 0;
    }
    70%, 90%{
        width: 100%;
    }
}

</style>