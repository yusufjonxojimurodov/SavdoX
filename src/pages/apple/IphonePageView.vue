<script setup>
import { watch } from 'vue';
import IphoneProductComponent from './components/IphoneProductComponent.vue';
import HeaderComponent from '../../components/HeaderComponent.vue';
import IphoneFilterComponent from './components/IphoneFilterComponent.vue';
import FooterComponent from '../../components/FooterComponent.vue';
import { useRoute } from 'vue-router';
import useQueryParams from '../../composables/useQueryParams';
import useFilterProducts from '../../store/filter.products.pinia';
import WarningModalComponent from '../../components/WarningModalComponent.vue';
import AuthDrawerView from '../auth/AuthDrawerView.vue';
import ProductSkeletonComponent from '@/components/ProductSkeletonComponent.vue';

const route = useRoute()
const { getQueries } = useQueryParams()
const filterProductStore = useFilterProducts()

watch(() => route.query, () => {
    filterProductStore.getIphoneProducts({
        search: getQueries().search || null,
        price: getQueries().price || null,
        type: getQueries().type || null
    });
}, { immediate: true });
</script>
<template>
    <header-component />
    <main>
        <iphone-filter-component />
        <iphone-product-component v-if="!filterProductStore.loader" />
        <product-skeleton-component v-else />
    </main>

    <footer-component />
    <auth-drawer-view />
    <warning-modal-component />
</template>