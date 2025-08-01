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

const { getQueries } = useQueryParams()
const productStore = useProducts()
const route = useRoute()

watch(() => route.query, () => {
    productStore.getProducts({
        search: getQueries().search || undefined,
        price: getQueries().price || undefined
    })
}, { immediate: true })
</script>

<template>
    <a-spin :spinning="productStore.loader" class="flex justify-center items-center min-h-screen" size="large" tip="Yuklanmoqda...">
        <header-component />
        <product-filter-component />
        <product-component />
        <warning-modal-component />
        <auth-drawer-view />
        <footer-component />
    </a-spin>
</template>