<script setup>
import router from '@/routers/router';
</script>

<template>
    <div class="!flex !justify-center !items-center">
        <a-result status="403">
            <template #title>
                <p class="!text-white !text-2xl !font-semibold !p-0 !m-0">Ruxsat berilmagan</p>
            </template>

            <template #extra>
                <div class="w-full flex justify-center items-center flex-col gap-5">
                    <p class="!text-white !text-[24px] !m-0 !p-0 !w-[540px]">Bu sahifaga kirishga sizga ruxsat
                        berilmagan.
                        Kirish uchun
                        admin yoki sotuvchi bo'lishingiz kerak</p>
                    <a-button @click="router.back()" danger size="large">
                        Orqaga
                    </a-button>
                </div>
            </template>
        </a-result>
    </div>
</template>