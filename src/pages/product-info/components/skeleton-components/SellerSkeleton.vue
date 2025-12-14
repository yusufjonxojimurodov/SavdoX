<script setup>
import useProductInfo from '@/store/products.info.pinia';

const productInfoStore = useProductInfo()
</script>

<template>
    <a-card class="!w-[100%] lg:!w-[430px] !rounded-[30px]" :loading="productInfoStore.loader">
        <template #default>
            <p>Skeleton</p>
            <p>Skeleton</p>
            <p>Skeleton</p>
            <p>Skeleton</p>
            <p>Skeleton</p>
            <p>Skeleton</p>
        </template>
    </a-card>
</template>