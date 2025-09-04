<script setup>
import { onMounted } from 'vue';
import useRegister from '../../store/register.pinia';
import SellerAsideComponent from './pages/SellerAsideComponent.vue';

const meStore = useRegister()

onMounted(() => {
    meStore.userInfo()
})
</script>

<template>
    <seller-aside-component />
</template>