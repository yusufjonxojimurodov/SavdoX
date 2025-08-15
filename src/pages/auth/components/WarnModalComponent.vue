<script setup>
const props = defineProps({
    open: Boolean
})

function linkBot() {
    window.open("http://t.me/savdo_x_bot", "_blank")
}
</script>

<template>
    <a-modal :open="props.open">
        <h1 class="text-[18px] text-white font-bold">Ro'yxatdan o'tish uchun avval telegram botimizga o'tib
            shaxs ekanlgingizni tasdiqlashingiz kerak.
        </h1>

        <template #footer>
            <a-button type="primary" size="large" @click="linkBot">Shaxsni tasdiqlash</a-button>
        </template>
    </a-modal>
</template>