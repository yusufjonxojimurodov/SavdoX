<template>
    <div class="flex flex-col-reverse sm:!flex-row gap-6 items-start">
        <div class="flex items-center justify-center !mb-5 w-full sm:flex-col sm:w-[20%] gap-3">
            <div v-for="n in 3" :key="n" class="w-22 h-22 overflow-hidden rounded-lg border-2 border-gray-200">
                <a-skeleton-image active class="!w-full !h-full !flex !justify-center !items-center" />
            </div>
        </div>

        <div class="relative w-[99%] h-[400px] sm:!w-[500px] overflow-hidden rounded-2xl shadow-lg">
            <a-skeleton-image active class="!w-full !h-full !flex !justify-center !items-center" />
        </div>
    </div>
</template>

<script setup>
import { SkeletonImage } from 'ant-design-vue'
</script>

<style scoped>
.ant-skeleton-image {
    width: 100% !important;
    height: 100% !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    border-radius: 10px !important;
}
</style>
