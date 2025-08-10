<script setup>
import ProductsFilterComponent from './ProductsFilterComponent.vue';
import ProductsComponent from './ProductsComponent.vue';
import { watch } from 'vue';
import { useRoute } from 'vue-router';
import useQueryParams from '../../../../composables/useQueryParams';
import useMeProduct from '../../../../store/product.me';

const meProductStore = useMeProduct()
const { getQueries } = useQueryParams()
const route = useRoute()

watch(() => route.query, () => {
    meProductStore.GetMeProduct({
        search: getQueries().search || null,
    });
}, { immediate: true });
</script>

<template>
    <header>
        <products-filter-component />
    </header>

    <main>
        <products-component />
    </main>
</template>