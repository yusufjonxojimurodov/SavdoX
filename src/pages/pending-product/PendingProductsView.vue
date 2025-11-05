<script setup>
import HeaderComponent from '../../components/HeaderComponent.vue';
import FooterComponent from '../../components/FooterComponent.vue';
import PendingProductsComponent from './components/PendingProductsComponent.vue';
import PendingProductsFilterComponent from './components/PendingProductsFilterComponent.vue';
import ProductSkeletonComponent from '../../components/ProductSkeletonComponent.vue';
import usePendingProduct from '@/store/product.pending.pinia';

const pendingStore = usePendingProduct()
</script>

<template>
    <HeaderComponent />
    <main>
        <pending-products-filter-component />
        <product-skeleton-component v-if="pendingStore.loader" />
        <pending-products-component  />
    </main>
    <footer-component />
</template>