<script setup>
import HeaderComponent from '../../components/HeaderComponent.vue';
import GoogleProductComponent from './components/GoogleProductComponent.vue';
import GoogleFilterComponent from './components/GoogleFilterComponent.vue';
import useQueryParams from '../../composables/useQueryParams';
import { watch } from 'vue';
import { useRoute } from 'vue-router';
import useFilterProducts from '../../store/filter.products.pinia';
import FooterComponent from '../../components/FooterComponent.vue';
import WarningModalComponent from '../../components/WarningModalComponent.vue';
import AuthDrawerView from '../auth/AuthDrawerView.vue';
import ProductSkeletonComponent from '@/components/ProductSkeletonComponent.vue';

const route = useRoute()
const { getQueries } = useQueryParams()
const filterProductStore = useFilterProducts()

watch(() => route.query, () => {
    filterProductStore.getGoogleProducts({
        search: getQueries().search || null,
        price: getQueries().price || null,
        type: getQueries().type || null
    });
}, { immediate: true });

</script>
<template>
    <header-component />
    <main>
        <google-filter-component />
        <google-product-component v-if="!filterProductStore.loader" />
        <product-skeleton-component v-else />
    </main>
    <footer-component />

    <auth-drawer-view />
    <warning-modal-component />
</template>