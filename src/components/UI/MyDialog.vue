<template>
    <div 
        class="dialog" 
        v-if="show === true" 
        @click.stop="hideDialog"
        >
        <div @click.stop class="dialog__content">
            <slot></slot>
        </div>
    </div>
</template>

<script setup>
import { defineProps, defineEmits, defineOptions } from 'vue'
import { useCryptoStore } from '@/stores/cryptoStore'

const cryptoStore = useCryptoStore()

defineOptions({
    name: 'my-dialog'
})

defineProps({
    show:{
        type: Boolean,
        default: false
    }
})

const emit = defineEmits(['update:show'])

const hideDialog = ()=>{
    emit('update:show', false)
    cryptoStore.chartTab = 1
    document.body.style.overflow = ''
}

</script>

<style lang="scss">
.dialog{
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center; 
    align-items: center;
    &__content{
        background: #494949;
        padding: 20px;
        border-radius: 12px;
        max-height: 300px;
        width: 500px;
        z-index: 1;
        overflow: hidden;
    }
}
</style>