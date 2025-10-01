<script setup>
import IconBack from '@/components/icons/IconBack.vue';
import { useRouter } from 'vue-router';

const props = defineProps({
    title: { type: String, required: true },
    openBack: { type: Boolean, required: false }
});

const router = useRouter()
</script>

<template>
    <div class="mb-10">
        <div v-if="props.openBack" class="flex justify-center items-center gap-2  !mt-[30px]">
            <button @click="router.back()" class="cursor-pointer !text-[#212529]"><icon-back /></button>
            <h2 class="container text-[32px] !font-semibold text-[#212529]">{{ title }}</h2>
        </div>
        <h2 v-else class="container text-[32px] !font-semibold text-[#212529] !mt-[30px]">{{ title }}</h2>
        <slot />
    </div>
</template>
