<script setup>
import { ref } from 'vue';
import useQueryParams from '@/composables/useQueryParams';
import { debounce } from '@/utils/helpers/debounce';

const { setQueries, getQueries } = useQueryParams()

const searchProduct = debounce((e) => {
    const value = e.target?.value
    setQueries({
        search: value?.trim() || undefined
    }, { saveHistory: false })
}, 500)
const searchProductValue = ref(getQueries().search)
const selectValue = ref(getQueries().price)
const options = ref([
    {
        value: "expensive",
        label: "Qimmat Mahsulotlar"
    },

    {
        value: "cheap",
        label: "Arzon Mahsulotlar"
    }
])

function changeFilter(value) {
    setQueries({
        price: value
    })
}
</script>

<template>
    <section>
        <div class="container flex justify-between items-center !mt-[25px] flex-wrap">
            <h2 class="text-[32px] !font-semibold text-[#212529]">Barcha Mahsulotlar</h2>
            <a-space class="flex-wrap">
                <a-input style="width: 220px;" v-model:value="searchProductValue" @input="searchProduct" size="large"
                    class="responsive-input" placeholder="Qidiring..." />
                <a-select style="width: 220px;" v-model:value="selectValue" @change="changeFilter"
                    class="responsive-select" allow-clear size="large" :options="options"
                    placeholder="Narxni tanlang" />
            </a-space>
        </div>
    </section>
</template>

<style scoped>
@media (max-width: 480px) {
    .responsive-input {
        width: 180px !important;
    }

    .responsive-select {
        width: 180px !important;
    }
}

@media (max-width: 400px) {
    .responsive-input {
        width: 170px !important;
    }

    .responsive-select {
        width: 170px !important;
    }
}
</style>