<script setup>
const props = defineProps({
    title: { type: String, required: true }
});
</script>

<template>
    <div class="mb-10">
        <h2 class="container text-[32px] !font-semibold text-[#212529] !mt-[30px]">{{ title }}</h2>
        <slot />
    </div>
</template>
