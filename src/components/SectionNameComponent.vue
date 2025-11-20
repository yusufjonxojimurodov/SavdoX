<script setup>
import IconBack from '@/components/icons/IconBack.vue';
import { useRouter } from 'vue-router';

const props = defineProps({
    title: { type: String, required: true },
    openBack: { type: Boolean, required: false },
    back: { type: String, required: false }
});

const router = useRouter()
</script>

<template>
    <div class="mb-10">
        <div v-if="props.openBack" class="flex justify-center items-center gap-4 !mt-[30px]">
            <a-button @click="router.push({ name: back })" type="primary"
                class="bg-white! w-[40px]! h-[40px]! !flex justify-center! items-center! rounded-full! shadow-lg!">
                <template #icon>
                    <icon-back class="w-7 h-7 text-black" />
                </template>
            </a-button>
            <h2 class="container text-[32px] !p-0 !m-0 !font-semibold text-[#212529]">{{ title }}</h2>
        </div>
        <h2 v-else class="container text-[32px] !font-semibold text-[#212529] !mt-[30px]">{{ title }}</h2>
        <slot />
    </div>
</template>
