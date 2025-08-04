<script setup>
import HeaderComponent from '../../components/HeaderComponent.vue';
import SamsungProductComponent from './components/SamsungProductComponent.vue';
import SamsungFilterComponent from './components/SamsungFilterComponent.vue';
import useQueryParams from '../../composables/useQueryParams';
import { watch } from 'vue';
import { useRoute } from 'vue-router';
import useFilterProducts from '../../store/filter.products.pinia';
import FooterComponent from '../../components/FooterComponent.vue';
import useRegister from '../../store/register.pinia';
import WarningModalComponent from '../../components/WarningModalComponent.vue';
import AuthDrawerView from '../auth/AuthDrawerView.vue';

const registerStore = useRegister()
const route = useRoute()
const { getQueries } = useQueryParams()
const filterProductStore = useFilterProducts()

watch(() => route.query, () => {
    registerStore.userInfo()
    filterProductStore.getSamsungProducts({
        search: getQueries().search || null,
        price: getQueries().price || null
    });
}, { immediate: true });

</script>
<template>
    <a-spin class="flex justify-center items-center min-h-screen" size="large" :spinning="filterProductStore.loader">
        <header-component />
        <main>
            <samsung-filter-component />
            <samsung-product-component />
        </main>
        <footer-component />

        <auth-drawer-view />
        <warning-modal-component />
    </a-spin>
</template>