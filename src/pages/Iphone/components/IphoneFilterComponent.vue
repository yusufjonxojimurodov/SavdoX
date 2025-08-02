<script setup>
import { ref } from 'vue';
import useQueryParams from '../../../composables/useQueryParams';
import { debounce } from '../../../utils/helpers/debounce';
import IconBack from '../../../components/icons/IconBack.vue';

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
        <div class="flex justify-center items-center gap-[8px]">
            <router-link to="/" class="bg-none border-none cursor-pointer">
                <icon-back />
            </router-link>
            <h2 class="!text-[32px] !font-semibold text-[#EAEAEA] !mb-2">Apple Mahsulotlari</h2>
        </div>
        <a-space class="flex-wrap">
            <a-input v-model:value="searchProductValue" @input="searchProduct" size="large" class="responsive-input"
                placeholder="Mahsulot Nomini yozing" />
            <a-select v-model:value="selectValue" @change="changeFilter" class="responsive-select" allow-clear
                size="large" :options="options" placeholder="Mahsulot narxlarini filterlash" />
        </a-space>
    </div>
</template>

<style>
.responsive-input {
    width: 300px;
}

.responsive-select {
    width: 250px;
}

@media (max-width: 480px) {
    .responsive-input {
        width: 180px !important;
    }

    .responsive-select {
        width: 180px !important;
    }
}
</style>