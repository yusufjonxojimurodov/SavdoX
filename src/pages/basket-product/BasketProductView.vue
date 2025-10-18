<script setup>
import BasketProductComponent from './components/BasketProductComponent.vue';
import HeaderComponent from '../../components/HeaderComponent.vue';
import FooterComponent from '../../components/FooterComponent.vue';
import WarningModalComponent from '../../components/WarningModalComponent.vue';
import AuthDrawerView from '../auth/AuthDrawerView.vue';
</script>

<template>
    <header-component />
    <main>
        <basket-product-component />
    </main>
    <footer-component />

    <auth-drawer-view />
    <warning-modal-component />
</template>