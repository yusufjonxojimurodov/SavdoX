<script setup>
import HeaderComponent from '../../components/HeaderComponent.vue';
import ProductFilterComponent from './components/ProductFilterComponent.vue';
import ProductComponent from './components/ProductComponent.vue';
import WarningModalComponent from '../../components/WarningModalComponent.vue';
import AuthDrawerView from '../auth/AuthDrawerView.vue';
import FooterComponent from '../../components/FooterComponent.vue';
import { watch } from 'vue';
import { useRoute } from 'vue-router';
import useProducts from '../../store/products.pinia';
import useQueryParams from '../../composables/useQueryParams';
import SamsungProductsComponent from './components/FilterProductsComponents/SamsungProductsComponent.vue';
import SectionNameComponent from '../../components/SectionNameComponent.vue';
import IphoneProductComponent from './components/FilterProductsComponents/IphoneProductComponent.vue';
import XiaomiProductComponent from './components/FilterProductsComponents/XiaomiProductComponent.vue';

const { getQueries } = useQueryParams()
const productStore = useProducts()
const route = useRoute()
const sections = [
    { title: "Barcha Mahsulotlar", filter: {} },
    { title: "Samsung Mahsulotlari", filter: { model: "Samsung" } },
    { title: "Apple Mahsulotlari", filter: { model: "Apple" } }
];

watch(() => route.query, () => {
    productStore.getProducts({
        search: getQueries().search || undefined,
        price: getQueries().price || undefined
    })
}, { immediate: true })
</script>

<template>
    <a-spin :spinning="productStore.loader" class="flex justify-center items-center min-h-screen" size="large"
        tip="Yuklanmoqda...">
        <header-component />
        <main>
            <div class="container">
                <product-filter-component />
                <product-component />
                <section-name-component title="Samsung Mahsulotlari">
                    <samsung-products-component />
                </section-name-component>
                <section-name-component title="Iphone Mahsulotlari">
                    <iphone-product-component />
                </section-name-component>
                <section-name-component title="Xiaomi Mahsulotlari">
                    <xiaomi-product-component />
                </section-name-component>
            </div>
        </main>
        <footer-component />
    </a-spin>
</template>