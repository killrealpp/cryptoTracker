<template>
    <div class="home">
        <div class="home__text">
            <h1 data-text="Привет дорогой мой криптопиражок">Привет дорогой мой криптопиражок</h1>
            <p>Я достал твой IP, теперь он будет являться паролем и логином для входа в личный аккаунт</p>
            <p>Не беспокойся я уже зарегестрировал тебя, так что тебе остается лишь нажать одну кнопочку</p>
            <p>Вливай сюда бабки, я покажу как делают реяльная лаванда</p>
            <button @click="cryptoStore.showDialog" class="btn">Не нажимай</button>
            <my-dialog v-model:show="cryptoStore.dialogVisible">Балбес, я же говорил не нажимать
                <button @click="cryptoStore.showHome" class="btn">Не нажимай</button>
                <my-dialog v-model:show="cryptoStore.homeVisivle">
                    Да ты настойчив
                    <router-link to="/mainnet" class="link">Лан нажимай</router-link>
                </my-dialog>
            </my-dialog>
            <p>Не жульничай, я знаю где ты живешь</p>
        </div>
    </div>
</template>

<script setup>
import { useCryptoStore } from '@/stores/cryptoStore';

const cryptoStore = useCryptoStore()

</script>

<style scoped lang="scss">
.home {
    text-align: center;
    padding: 50px;
    background: #242424;
    min-height: 100vh;
    color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.link {
    color: #fff
}

.btn{
    padding: 5px 10px;
    border-radius: 8px;
    border: none;
    background: red;
    &:hover{
        background: gray;
    }
}

h1{
    color: #242424;
    font-size: 80px;
    position: relative;
    text-transform: uppercase;
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
        // border-right: 2px solid #68c6fb;
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