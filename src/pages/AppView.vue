<script setup>
import { onMounted } from 'vue';
import useRegister from '../store/register.pinia';
import ProductModalComponent from '../components/ProductModalComponent.vue';
import WarningModalComponent from '../components/WarningModalComponent.vue';
import AuthDrawerView from "../pages/auth/AuthDrawerView.vue"
import useProducts from '@/store/products.pinia';

const registerStore = useRegister()
const productsStore = useProducts()

onMounted(() => {
    registerStore.userInfo()
})
</script>

<template>
    <router-view />
    <auth-drawer-view />
    <warning-modal-component />
    <product-modal-component :open="productsStore.modalOpen" />
</template>