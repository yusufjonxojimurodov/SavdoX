<script setup>
import { onMounted } from 'vue';
import useRegister from '../store/register.pinia';
import ProductsView from './Products/ProductsView.vue';
import WarningModalComponent from '../components/WarningModalComponent.vue';
import AuthDrawerView from "../pages/auth/AuthDrawerView.vue"

const registerStore = useRegister()
onMounted(() => {
    registerStore.userInfo()
})
</script>

<template>
    <a-spin :spinning="registerStore.loader" size="large" class="flex justify-center items-center min-h-screen">
        <products-view />
        <auth-drawer-view />
        <warning-modal-component />
    </a-spin>
</template>