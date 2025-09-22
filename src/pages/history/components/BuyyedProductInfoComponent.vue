<script setup>
import IconBack from '../../../components/icons/IconBack.vue';
</script>

<template>
    <div class="container flex justify-start items-center gap-[20px] !mt-[30px]">
        <router-link to="/pending/product" class="bg-none border-none cursor-pointer">
            <icon-back />
        </router-link>
        <h1 class="text-[28px] !m-0 !font-semibold text-[#212529]">Sotib olingan mahsulotlar
        </h1>
    </div>
</template>