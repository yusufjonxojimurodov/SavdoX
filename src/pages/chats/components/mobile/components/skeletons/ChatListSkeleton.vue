<template>
    <div class="flex justify-center items-center flex-col w-full! gap-4">
        <a-skeleton-button class="h-[40px]!" :active="true" block />
        <a-skeleton-button class="h-[40px]!" :active="true" block />
        <a-skeleton-button class="h-[40px]!" :active="true" block />
        <a-skeleton-button class="h-[40px]!" :active="true" block />
        <a-skeleton-button class="h-[40px]!" :active="true" block />
    </div>
</template>

<style scoped>
:deep(.ant-skeleton-button) {
    border-radius: 30px !important;
    height: 40px !important;
}
</style>