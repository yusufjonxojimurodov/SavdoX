<script setup>
import IconBack from '@/components/icons/IconBack.vue';
import { useRouter } from 'vue-router';

const router = useRouter()
</script>

<template>
    <div class="container flex justify-start items-center gap-[5px] !mt-[30px]">
        <div @click="router.push('/basket')"
            class="!text-white cursor-pointer text-[24px] !p-[10px] font-semibold flex justify-start items-center gap-2">
            <icon-back />
        </div>
        <h1 class="text-[18px] sm:text-[28px] !m-0 font-semibold text-white">Kutilayotgan mahsulotlar</h1>
    </div>
</template>