<script setup>
import HeaderComponent from '@/components/HeaderComponent.vue';
import OtherProductComponent from './components/OtherProductComponent.vue';
import OtherProductFilterComponent from './components/OtherProductFilterComponent.vue';
import useQueryParams from '@/composables/useQueryParams';
import { watch } from 'vue';
import { useRoute } from 'vue-router';
import useFilterProducts from '@/store/filter.products.pinia';
import FooterComponent from '@/components/FooterComponent.vue';
import WarningModalComponent from '@/components/WarningModalComponent.vue';
import AuthDrawerView from '../auth/AuthDrawerView.vue';
import ProductSkeletonComponent from '@/components/ProductSkeletonComponent.vue';

const route = useRoute()
const { getQueries } = useQueryParams()
const filterProductStore = useFilterProducts()

watch(() => route.query, () => {
    filterProductStore.getOtherProducts({
        search: getQueries().search || null,
        price: getQueries().price || null,
        type: getQueries().type || null
    });
}, { immediate: true });

</script>
<template>
    <header-component />
    <main>
        <other-product-filter-component />
        <other-product-component v-if="!filterProductStore.loader" />
        <product-skeleton-component v-else />
    </main>
    <footer-component />

    <auth-drawer-view />
    <warning-modal-component />
</template>