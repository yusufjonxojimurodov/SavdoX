<template>
    <div class="flex flex-wrap gap-4 sm:gap-6 !mt-6 justify-start container">
        <a-card v-for="index in 4" :key="index"
            class="w-[174px] sm:w-[280px] !rounded-[30px] overflow-hidden shadow-md mx-auto" :bordered="false">
            <div
                class="flex justify-center items-center h-[100px] sm:h-[150px] !w-full bg-gray-50 rounded-2xl overflow-hidden">
                <div class="loader shadow-md opacity-65"></div>
            </div>

            <div class="p-3 !mt-5">
                <a-skeleton :active="true" :paragraph="false">
                    <a-skeleton-input style="width: 180px;" active />
                </a-skeleton>

                <div class="!mt-2">
                    <a-skeleton :active="true" :paragraph="false">
                        <a-skeleton-input style="width: 120px;" active />
                    </a-skeleton>
                </div>

                <div class="!mt-2">
                    <a-skeleton :active="true" :paragraph="{ rows: 2 }" />
                </div>

                <div class="!mt-3 flex gap-4">
                    <a-skeleton-button active shape="circle" size="small" />
                    <a-skeleton-button active shape="circle" size="small" />
                </div>

                <div class="!mt-4">
                    <a-skeleton-button active block style="height: 40px; border-radius: 10px;" />
                </div>
            </div>
        </a-card>
    </div>
</template>

<style scoped>
.ant-skeleton-element .ant-skeleton-input {
    border-radius: 8px;
}

:deep(.ant-skeleton-image) {
    width: 280px !important;
    height: 180px !important;
}
</style>
