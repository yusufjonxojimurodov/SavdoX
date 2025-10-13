<script setup>
import WarningModalComponent from '../components/WarningModalComponent.vue';
import AuthDrawerView from "../pages/auth/AuthDrawerView.vue"
</script>

<template>
    <router-view />
    <auth-drawer-view />
    <warning-modal-component />
</template>