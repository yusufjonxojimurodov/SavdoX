<script setup>
import router from '@/routers/router';
</script>

<template>
    <a-result status="500">
        <template #title>
            <p class="!text-black text-2xl !font-semibold !m-0 !p-0">500</p>
        </template>

        <template #extra>
            <div class="w-full flex justify-center items-center flex-col gap-5">
                <p class="!text-black !text-[24px] !m-0 !p-0 !w-[540px]">Server bilan muammo yuzaga keldi. Iltimos
                    keyinroq urinib ko'ring</p>
                <a-button @click="router.push('/')" danger size="large">
                    Orqaga
                </a-button>
            </div>
        </template>
    </a-result>
</template>