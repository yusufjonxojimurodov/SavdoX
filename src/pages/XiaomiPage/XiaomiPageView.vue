<script setup>
import HeaderComponent from '../../components/HeaderComponent.vue';
import XiaomiProductComponent from './components/XiaomiProductComponent.vue';
import XiaomiFilterComponent from './components/XiaomiFilterComponent.vue';
import useQueryParams from '../../composables/useQueryParams';
import { watch } from 'vue';
import { useRoute } from 'vue-router';
import useFilterProducts from '../../store/filter.products.pinia';
import FooterComponent from '../../components/FooterComponent.vue';
import useRegister from '../../store/register.pinia';
import WarningModalComponent from '../../components/WarningModalComponent.vue';
import AuthDrawerView from '../auth/AuthDrawerView.vue';

const route = useRoute()
const { getQueries } = useQueryParams()
const filterProductStore = useFilterProducts()
const registerStore = useRegister()

watch(() => route.query, () => {
    registerStore.userInfo()
    filterProductStore.getXiaomiProducts({
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
            <xiaomi-filter-component />
            <xiaomi-product-component />
        </main>
        <footer-component />

        <auth-drawer-view />
        <warning-modal-component />
    </a-spin>
</template>