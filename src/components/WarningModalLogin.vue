<script setup>
import IconRegister from './icons/IconRegister.vue'

const open = defineModel("open", { type: Boolean, default: false })

function openBot() {
    window.open("https://t.me/savdo_x_bot", "_blank")
}

function closeModal() {
    open.value = false
}
</script>

<template>
    <a-modal @cancel="closeModal" v-model:open="open" centered>
        <template #title>
            <div class="flex items-center gap-2">
                <icon-register class="w-6 h-6 text-yellow-500" />
                <p class="text-white text-[24px] font-semibold">Ro'yxatdan o'tish</p>
            </div>
        </template>

        <p class="text-gray-400 text-[18px] font-medium !mt-[20px]">
            SavdoX ga xush kelibsiz! Hisobingiz yo'q bo'lsa telegram botimiz orqali shaxsingizni tasdiqlab ro'yxatdan
            o'tishingiz mumkin. Botga kiring /start buyrug'ini yuboring
        </p>

        <template #footer>
            <div class="flex items-center justify-end gap-2 !mt-[40px]">
                <a-button size="large" ghost danger @click="closeModal">Keyinroq</a-button>
                <a-button size="large" type="primary" @click="openBot">
                    Ro'yxatdan o'tish
                </a-button>
            </div>
        </template>
    </a-modal>
</template>
