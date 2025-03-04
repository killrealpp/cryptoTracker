<template>
  <main class="main">
    <div class="container">
      <Header/>
      <div class="layout">
        <Sidebar/>
        <Content/>
      </div>
    </div>
  </main>
</template>

<script setup>
import Header from './components/Header.vue';
import Sidebar from './components/Sidebar.vue';
import Content from './components/Content.vue'
import { useCryptoStore } from './stores/cryptoStore';

const cryptoStore = useCryptoStore()

</script>

<style lang="scss" scoped>
main{
  background: #242424;
}

.layout{
  display: flex;
  border: 4px solid gray;
}

</style>
