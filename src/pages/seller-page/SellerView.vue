<script setup>
import { onMounted } from 'vue';
import useRegister from '../../store/register.pinia';
import SellerAsideComponent from './pages/SellerAsideComponent.vue';
import ProductModalComponent from '@/components/ProductModalComponent.vue';
import useProducts from '@/store/products.pinia';

const productsStore = useProducts()
const meStore = useRegister()

onMounted(() => {
    meStore.userInfo()
})
</script>

<template>
    <seller-aside-component />
    <product-modal-component :open="productsStore.modalOpen" />
</template>