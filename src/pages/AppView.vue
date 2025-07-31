<script setup>
import { onMounted } from 'vue';
import useRegister from '../store/register.pinia';
import ProductsView from './Products/ProductsView.vue';

const registerStore = useRegister()
onMounted(() => {
    registerStore.userInfo()
})
</script>

<template>
    <a-spin size="large" tip="Yuklanmoqda..." :spinning="registerStore.loader"
        class="flex justify-center items-center min-h-screen">
        <products-view />
    </a-spin>
</template>