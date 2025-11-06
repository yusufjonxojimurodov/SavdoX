<script setup>
import router from '@/routers/router';

</script>

<template>
    <a-result status="404">
        <template #title>
            <p class="!text-black text-2xl !font-semibold !m-0 !p-0">404</p>
        </template>

        <template #extra>
            <div class="w-full flex justify-center items-center flex-col gap-5">
                <p class="!text-black !text-[24px] !m-0 !p-0 !w-[540px]">Siz izlayotgan sahifa topilmadi </p>
                <a-button @click="router.back()" danger size="large">
                    Orqaga
                </a-button>
            </div>
        </template>
    </a-result>
</template>