<script setup>
import BasketProductComponent from './components/BasketProductComponent.vue';
import HeaderComponent from '../../components/HeaderComponent.vue';
import useProducts from '../../store/products.pinia';
import FooterComponent from '../../components/FooterComponent.vue';
import WarningModalComponent from '../../components/WarningModalComponent.vue';
import AuthDrawerView from '../auth/AuthDrawerView.vue';

const productStore = useProducts()
</script>

<template>
    <a-spin class="flex justify-center items-center min-h-screen" size="large" :spinning="productStore.loader">
        <header-component />
        <main>
            <basket-product-component />
        </main>
        <footer-component />

        <auth-drawer-view />
        <warning-modal-component />
    </a-spin>
</template>