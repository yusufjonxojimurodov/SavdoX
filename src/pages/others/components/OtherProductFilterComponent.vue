<script setup>
import { ref } from 'vue';
import useQueryParams from '@/composables/useQueryParams';
import { debounce } from '@/utils/helpers/debounce';
import IconBack from '@/components/icons/IconBack.vue';
import { useRouter } from 'vue-router';
import useProducts from '@/store/products.pinia';

const productsStore = useProducts()
const { setQueries, getQueries } = useQueryParams()
const router = useRouter()

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
                <a-button @click="router.push({ name: 'Products' })" type="primary"
                    class="bg-white! w-[40px]! h-[40px]! !flex justify-center! items-center! rounded-full! shadow-lg!">
                    <template #icon>
                        <icon-back class="w-7 h-7 text-black" />
                    </template>
                </a-button>
                <h2 class="!text-[28px] !font-semibold text-[#212529] !m-0 !p-0">Mahsulotlar</h2>
            </div>
            <div class="!flex justify-between sm:justify-end gap-2 flex-wrap sm:!mt-0 !mt-3">
                <a-select v-model:value="selectValue" @change="changeFilter" class="responsive-select" allow-clear
                    size="large" :options="options" placeholder="Narxni tanlang" />
                <a-select v-model:value="selectType" size="large" @change="changeTypeFilter" class="responsive-select"
                    placeholder="Turini tanlang" :options="productsStore.types" allowClear />
                <a-input v-model:value="searchProductValue" @input="searchProduct" size="large"
                    class="!w-full sm:!w-[220px]" placeholder="Qidiring..." />
            </div>
        </div>
    </section>
</template>