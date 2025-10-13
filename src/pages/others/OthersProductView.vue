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
    <a-spin class="flex justify-center items-center min-h-screen" size="large" :spinning="filterProductStore.loader">
        <header-component />
        <main>
            <other-product-filter-component />
            <other-product-component />
        </main>
        <footer-component />

        <auth-drawer-view />
        <warning-modal-component />
    </a-spin>
</template>