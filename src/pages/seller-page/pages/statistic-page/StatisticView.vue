<script setup>
import { watch } from 'vue';
import useRegister from '../../../../store/register.pinia';
import useStatistic from '../../../../store/statistic.pinia';
import useQueryParams from '../../../../composables/useQueryParams';
import StatisticProductsComponent from './components/StatisticProductsComponent.vue';
import StatisticProfileComponent from './components/StatisticProfileComponent.vue';
import StatisticFilterComponent from './components/StatisticFilterComponent.vue';

const userStore = useRegister();
const statisticStore = useStatistic();
const { getQueries } = useQueryParams();

const userId = userStore.user._id;

watch(
    () => getQueries().year,
    (newYear) => {
        const year = newYear || 2025;
        statisticStore.getStatisticProducts(year);
        statisticStore.GetUserInformation(userId);
    },
    { immediate: true }
);
</script>

<template>
    <a-spin size="large" :spinning="statisticStore.loader">
        <statistic-profile-component />
        <statistic-filter-component />
        <statistic-products-component />
    </a-spin>
</template>