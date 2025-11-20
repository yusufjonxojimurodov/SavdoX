<template>
    <div class="flex flex-col gap-6 !max-w-[500px]">
        <a-skeleton :active="true" :paragraph="false">
            <a-skeleton-input active style="width: 200px; height: 24px;" />
        </a-skeleton>

        <div class="space-y-2">
            <a-skeleton :active="true" :paragraph="{ rows: 3 }" />
        </div>

        <div class="!flex !items-center !gap-3">
            <a-skeleton-input active style="width: 100px; height: 22px;" />
            <a-skeleton-input active style="width: 100px; height: 22px;" />
        </div>

        <div class="flex!mt-4">
            <a-skeleton-button active style="width: 150px; height: 45px; border-radius: 8px;" />
            <a-skeleton-button active style="width: 150px; height: 45px; border-radius: 8px;" />
        </div>
    </div>
</template>

<script setup>
import { Skeleton, SkeletonInput, SkeletonButton } from 'ant-design-vue'
</script>

<style scoped>
.ant-skeleton-element .ant-skeleton-input {
    border-radius: 6px;
}
</style>
