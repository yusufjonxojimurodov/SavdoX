<script setup>
import HeaderComponent from '@/components/HeaderComponent.vue';
import ProductFilterComponent from './components/ProductFilterComponent.vue';
import ProductComponent from './components/ProductComponent.vue';
import FooterComponent from '@/components/FooterComponent.vue';
import { watch } from 'vue';
import { useRoute } from 'vue-router';
import useProducts from '@/store/products.pinia';
import useQueryParams from '@/composables/useQueryParams';
import SamsungProductsComponent from './components/FilterProductsComponents/SamsungProductsComponent.vue';
import SectionNameComponent from '@/components/SectionNameComponent.vue';
import IphoneProductComponent from './components/FilterProductsComponents/IphoneProductComponent.vue';
import XiaomiProductComponent from './components/FilterProductsComponents/XiaomiProductComponent.vue';
import GoogleProductsComponent from './components/FilterProductsComponents/GoogleProductsComponent.vue';
import Banners from './components/Banners.vue';

const { getQueries } = useQueryParams()
const productStore = useProducts()
const route = useRoute()

watch(
    () => route.query,
    () => {
        if (!route.query.productId) {
            productStore.getProducts({
                search: getQueries().search || null,
                price: getQueries().price || null
            })
        }
    },
    { immediate: true, deep: true }
)
</script>

<template>
    <header-component />
    <main>
        <banners />
        <product-filter-component />
        <product-component />
        <section-name-component title="Samsung Mahsulotlari">
            <samsung-products-component />
        </section-name-component>
        <section-name-component title="Apple Mahsulotlari">
            <iphone-product-component />
        </section-name-component>
        <section-name-component title="Xiaomi Mahsulotlari">
            <xiaomi-product-component />
        </section-name-component>
        <section-name-component title="Google Mahsulotlari">
            <google-products-component />
        </section-name-component>
    </main>
    <footer-component />
</template>