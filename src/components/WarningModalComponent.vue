<script setup>
import { storeToRefs } from 'pinia'
import useRegister from '../store/register.pinia'
import IconWarning from './icons/IconWarning.vue'

const registerStore = useRegister()
const { modalOpen } = storeToRefs(registerStore)
</script>

<template>
    <a-modal v-model:open="modalOpen" centered>
        <template #title>
            <div class="flex items-center gap-2">
                <IconWarning class="w-6 h-6 text-[#FF8C00]" />
                <p class="text-[#212529] text-[24px] !font-semibold">Ogohlantirish</p>
            </div>
        </template>

        <p class="text-gray-800 text-[18px] font-medium !mt-[20px]">
            SavdoX ga xush kelibsiz! Platformadan to'liq foydalanish uchun tizimga kirishingizni so'raymiz. Bu sizning
            va
            boshqalarning xavfsizligingiz uchun.
        </p>

        <template #footer>
            <div class="flex items-center justify-end gap-2 !mt-[40px]">
                <a-button size="large" ghost danger @click="registerStore.closeModal">Keyinroq</a-button>
                <a-button size="large" type="primary"
                    @click="() => { registerStore.closeModal(); registerStore.openDrawer(); }">
                    Tizimga kirish
                </a-button>
            </div>
        </template>
    </a-modal>
</template>
