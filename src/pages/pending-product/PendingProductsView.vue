<script setup>
import HeaderComponent from '../../components/HeaderComponent.vue';
import FooterComponent from '../../components/FooterComponent.vue';
import PendingProductsComponent from './components/PendingProductsComponent.vue';
import PendingProductsFilterComponent from './components/PendingProductsFilterComponent.vue';
</script>

<template>
    <HeaderComponent />
    <main>
        <pending-products-filter-component />
        <pending-products-component />
    </main>
    <footer-component />
</template>