<script setup>
import { ref } from 'vue';
import ProductsCreateFormComponent from './ProductsCreateFormComponent.vue';
import IconPlus from '@/components/icons/IconPlus.vue';
import { debounce } from '@/utils/helpers/debounce';
import useRegister from '@/store/register.pinia';
import useQueryParams from '@/composables/useQueryParams';

const { setQueries, getQueries } = useQueryParams()
const userStore = useRegister()
const searchInput = ref(getQueries().search)
const open = ref(false);

const searchProduct = debounce((e) => {
    const value = e.target?.value
    setQueries({
        search: value?.trim() || undefined
    }, { saveHistory: false })
}, 500)
</script>

<template>
    <div class="flex justify-end items-center gap-2 flex-wrap w-full">
        <a-input v-model:value="searchInput" class="!w-full sm:!w-[220px]" @input="searchProduct" size="large"
            style="width: 220px;" placeholder="Mahsulotingizni qidiring"></a-input>
        <a-button size="large" class="!flex justify-center items-center gap-2 w-full sm:!w-[180px]"
            v-if="userStore.user.role !== 'customer'" type="primary" @click="open = true"><icon-plus /> Mahsulot
            Yaratish</a-button>
    </div>
    <products-create-form-component v-model:open="open" />
</template>