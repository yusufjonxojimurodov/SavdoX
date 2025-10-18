<template>
    <a-card class="w-[280px] h-[380px] !rounded-[20px] overflow-hidden shadow-md flex items-center justify-center"
        :bordered="false">
        <a-skeleton-image :active="true" style="width: 100%; height: 100%; border-radius: 16px;" />
    </a-card>
</template>

<script setup>
import { SkeletonImage, Card as ACard } from 'ant-design-vue'
</script>

<style scoped>
.ant-skeleton-element .ant-skeleton-image {
    width: 100%;
    height: 100%;
    border-radius: 16px;
}
</style>
