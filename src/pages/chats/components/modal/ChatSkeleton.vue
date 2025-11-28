<template>
    <div class="flex justify-center items-center flex-col gap-2 w-full!">
        <a-skeleton-button :active="true" block class="!w-full" />
    </div>
</template>

<style scoped>
:deep(.ant-skeleton-button) {
    border-radius: 30px !important;
    height: 40px !important;
}
</style>