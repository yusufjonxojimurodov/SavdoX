<script setup>
import { onMounted } from 'vue';
import HeaderComponent from '../../components/HeaderComponent.vue';
import useRegister from '../../store/register.pinia';
import DashboardFilters from './components/DashboardFilters.vue';

const registerStore = useRegister()

onMounted(() => {
    registerStore.userInfo()
})
</script>

<template>
    <header-component />
    <dashboard-filters />

    <a-empty description="Sahifa tayyorlanmoqda" style="color: white; margin-top: 150px" />
</template>