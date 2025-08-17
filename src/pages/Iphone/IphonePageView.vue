<script setup>
import { watch } from 'vue';
import IphoneProductComponent from './components/IphoneProductComponent.vue';
import HeaderComponent from '../../components/HeaderComponent.vue';
import IphoneFilterComponent from './components/IphoneFilterComponent.vue';
import FooterComponent from '../../components/FooterComponent.vue';
import { useRoute } from 'vue-router';
import useQueryParams from '../../composables/useQueryParams';
import useFilterProducts from '../../store/filter.products.pinia';
import useRegister from '../../store/register.pinia';
import WarningModalComponent from '../../components/WarningModalComponent.vue';
import AuthDrawerView from '../auth/AuthDrawerView.vue';

const registerStore = useRegister()
const route = useRoute()
const { getQueries } = useQueryParams()
const filterProductStore = useFilterProducts()

watch(() => route.query, () => {
    registerStore.userInfo()
    filterProductStore.getIphoneProducts({
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
            <iphone-filter-component />
            <IphoneProductComponent />
        </main>

        <footer-component />
        <auth-drawer-view />
        <warning-modal-component />
    </a-spin>
</template>