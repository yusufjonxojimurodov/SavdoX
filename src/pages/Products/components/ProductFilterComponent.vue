<script setup>
import { ref } from 'vue';
import useQueryParams from '../../../composables/useQueryParams';
import { debounce } from '../../../utils/helpers/debounce';

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
    <div class="container flex justify-between items-center !mt-[25px] flex-wrap">
        <h2 class="text-[32px] font-semibold text-[#EAEAEA]">Barcha Mahsulotlar</h2>

        <a-space class="flex-wrap">
            <a-input v-model:value="searchProductValue" @input="searchProduct" size="large"
                placeholder="Mahsulot Nomini yozing" />

            <a-select v-model:value="selectValue" @change="changeFilter" style="width: 250px;" allow-clear size="large"
                :options="options" placeholder="Mahsulot narxlarini filterlash" />
        </a-space>
    </div>
</template>