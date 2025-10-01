<script setup>
import { onBeforeMount } from 'vue';
import useRegister from '../store/register.pinia';
import WarningModalComponent from '../components/WarningModalComponent.vue';
import AuthDrawerView from "../pages/auth/AuthDrawerView.vue"

const registerStore = useRegister()

onBeforeMount(() => {
    registerStore.userInfo()
})
</script>

<template>
    <router-view />
    <auth-drawer-view />
    <warning-modal-component />
</template>