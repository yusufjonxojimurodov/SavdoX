<script setup>
import HeaderComponent from '../../components/HeaderComponent.vue';
import FooterComponent from '../../components/FooterComponent.vue';
import PendingProductsComponent from './components/PendingProductsComponent.vue';
import SectionNameComponent from '../../components/SectionNameComponent.vue';
import ProductSkeletonComponent from '../../components/ProductSkeletonComponent.vue';
import usePendingProduct from '@/store/product.pending.pinia';

const pendingStore = usePendingProduct()
</script>

<template>
    <HeaderComponent />
    <main>
        <div class="container">
            <section-name-component title="Kutilayotgan mahsulotlar" :openBack="true" :back="'Basket'">
                <product-skeleton-component v-if="pendingStore.loader" />
                <pending-products-component />
            </section-name-component>
        </div>
    </main>
    <footer-component />
</template>