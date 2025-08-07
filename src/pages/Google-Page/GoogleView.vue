<script setup>
import HeaderComponent from '../../components/HeaderComponent.vue';
import GoogleProductComponent from './components/GoogleProductComponent.vue';
import GoogleFilterComponent from './components/GoogleFilterComponent.vue';
import useQueryParams from '../../composables/useQueryParams';
import { watch } from 'vue';
import { useRoute } from 'vue-router';
import useFilterProducts from '../../store/filter.products.pinia';
import FooterComponent from '../../components/FooterComponent.vue';
import useRegister from '../../store/register.pinia';
import WarningModalComponent from '../../components/WarningModalComponent.vue';
import AuthDrawerView from '../auth/AuthDrawerView.vue';

const registerStore = useRegister()
registerStore.userInfo()
const route = useRoute()
const { getQueries } = useQueryParams()
const filterProductStore = useFilterProducts()

watch(() => route.query, () => {
    filterProductStore.getGoogleProducts({
        search: getQueries().search || null,
        price: getQueries().price || null
    });
}, { immediate: true });

</script>
<template>
    <a-spin class="flex justify-center items-center min-h-screen" size="large" :spinning="filterProductStore.loader">
        <header-component />
        <main>
            <google-filter-component />
            <google-product-component />
        </main>
        <footer-component />

        <auth-drawer-view />
        <warning-modal-component />
    </a-spin>
</template>