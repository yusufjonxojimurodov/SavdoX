<script setup>
import { ref, computed, watch } from 'vue';
import useStatistic from '../../../../../store/statistic.pinia';
import useQueryParams from '../../../../../composables/useQueryParams';

const statisticStore = useStatistic();
const { setQueries } = useQueryParams();

const years = computed(() => {
    if (!statisticStore.statistic.length) return [];
    const yearsInStat = statisticStore.statistic.map(item => item.year);
    const startYear = Math.min(...yearsInStat);
    const currentYear = new Date().getFullYear();
    const arr = [];
    for (let y = startYear; y <= currentYear; y++) {
        arr.push(y);
    }
    return arr;
});

const selectedYear = ref(new Date().getFullYear());

watch(() => statisticStore.statistic, () => {
    if (years.value.length) {
        selectedYear.value = years.value[0];
    }
});

function handleChange(value) {
    selectedYear.value = value;
    setQueries({ year: value });
}
</script>

<template>
    <div class="flex justify-end items-center !mt-6">
        <a-select v-model:value="selectedYear" size="large" style="width: 120px" @change="handleChange">
            <a-select-option v-for="year in years" :key="year" :value="year">
                {{ year }}
            </a-select-option>
        </a-select>
    </div>
</template>
