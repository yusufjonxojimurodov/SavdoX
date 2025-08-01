<script setup>
import ProductFilterComponent from '../pages/Products/components/ProductFilterComponent.vue';
const props = defineProps({
    title: { type: String, required: true }
});
</script>

<template>
    <div class="mb-10">
        <h2 class="container text-[32px] font-semibold text-[#EAEAEA] !mt-[30px]">{{ title }}</h2>
        <slot />
    </div>
</template>
