<template>
        <div
            class="flex flex-col sm:flex-row justify-start relative items-center transition duration-500 w-full  lg:w-[900px] h-auto sm:h-[350px] cursor-pointer gap-[20px] sm:gap-[40px] !p-[20px] rounded-[30px] shadow-[0_4px_12px_rgba(0,0,0,0.6)] bg-[#F8EDEB]">
            <div :style="{ width: '700px' }" class="!flex !justify-center items-start !flex-col gap-[20px] sm:!w-auto">
                <a-skeleton :title="false" :paragraph="{ rows: 1, width: '70%' }" active />

                <div class="flex gap-3 items-center">
                    <a-skeleton :title="false" :paragraph="{ rows: 1, width: '30%' }" active />
                    <a-skeleton :title="false" :paragraph="{ rows: 1, width: '20%' }" active />
                </div>

                <a-skeleton :title="false" :paragraph="{ rows: 2, width: ['90%', '85%'] }" active />

                <a-skeleton :title="false" :paragraph="{ rows: 1, width: '40%' }" active />

                <div class="w-[600px] h-[36px] bg-[#ddd] rounded-lg"></div>
            </div>
        </div>
</template>

<script setup>
import { Skeleton as ASkeleton, SkeletonImage as ASkeletonImage } from 'ant-design-vue'
</script>

<style scoped>
.ant-skeleton-element .ant-skeleton-image {
    width: 100%;
    height: 240px;
    border-radius: 30px;
}
</style>
