<script setup>
import HeaderComponent from '@/components/HeaderComponent.vue';
import BuyyedProductInfoComponent from './components/BuyyedProductInfoComponent.vue';
import BuyyedProductComponent from './components/BuyyedProductComponent.vue';
import FooterComponent from '@/components/FooterComponent.vue';
import ProductModalComponent from '@/components/ProductModalComponent.vue';
import useProducts from '@/store/products.pinia';

const productsStore = useProducts()
</script>

<template>
    <header-component />
    <main>
        <buyyed-product-info-component />
        <buyyed-product-component />
    </main>
    <footer-component />

    <product-modal-component :open="productsStore.modalOpen" />
</template>