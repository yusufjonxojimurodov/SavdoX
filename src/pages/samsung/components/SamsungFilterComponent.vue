<script setup>
import { ref } from 'vue';
import useQueryParams from '@/composables/useQueryParams';
import { debounce } from '@/utils/helpers/debounce';
import IconBack from '@/components/icons/IconBack.vue';

const { setQueries, getQueries } = useQueryParams()
const searchProduct = debounce((e) => {
    const value = e.target?.value
    setQueries({
        search: value?.trim() || undefined
    }, { saveHistory: false })
}, 500)
const searchProductValue = ref(getQueries().search)
const selectValue = ref(getQueries().price)
const selectType = ref(getQueries().type)
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

const types = [
    { label: 'Aqlli Soat', value: 'smartwatch' },
    { label: 'Smartfon', value: 'smartfon' },
    { label: 'Televizor', value: 'TV' },
    { label: 'Noutbook', value: 'laptop' },
    { label: 'Monitor', value: 'display' },
    { label: 'Kompyuter', value: 'computer' },
    { label: 'Quloqchin', value: 'headphones' },
    { label: 'Zaryadlovchi qurilmalar', value: 'chargers' },
]

function changeFilter(value) {
    setQueries({
        price: value
    })
}

function changeTypeFilter(value) {
    setQueries({
        type: value
    })
}
</script>

<template>
    <section>
        <div class="container flex justify-between items-center !mt-[25px] flex-wrap">
            <div class="flex justify-center items-center gap-[8px]">
                <router-link to="/" class="bg-none border-none cursor-pointer">
                    <icon-back />
                </router-link>
                <h2 class="!text-[32px] !font-semibold text-[#212529] !mb-2">Samsung Mahsulotlari</h2>
            </div>
            <div class="!flex justify-between sm:justify-end gap-2 flex-wrap sm:!mt-0 !mt-3">
                <a-input v-model:value="searchProductValue" @input="searchProduct" size="large" class="responsive-input"
                    placeholder="Qidiring..." />
                <a-select v-model:value="selectValue" @change="changeFilter" class="responsive-select" allow-clear
                    size="large" :options="options" placeholder="Narxni tanlang" />

                <a-select v-model:value="selectType" size="large" @change="changeTypeFilter"
                    class="sm:!w-[180px] !w-full" placeholder="Turini tanlang" :options="types" allowClear />
            </div>
        </div>
    </section>
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