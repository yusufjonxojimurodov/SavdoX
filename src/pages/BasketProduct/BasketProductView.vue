<script setup>
import BasketProductComponent from './components/BasketProductComponent.vue';
import HeaderComponent from '../../components/HeaderComponent.vue';
import useProducts from '../../store/products.pinia';
import FooterComponent from '../../components/FooterComponent.vue';

const productStore = useProducts()
</script>

<template>
    <a-spin class="flex justify-center items-center min-h-screen" size="large" tip="Yuklanmoqda..."
        :spinning="productStore.loader">
        <header-component />
        <main>
            <BasketProductComponent />
        </main>
        <footer-component />
    </a-spin>
</template>