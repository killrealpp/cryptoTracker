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
</script>

<style lang="scss" scoped>
main{
  background: #242424;
}

.layout{
  display: flex;
}
</style>
