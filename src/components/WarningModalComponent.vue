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
                <IconWarning class="w-6 h-6 text-yellow-500" />
                <p class="text-white text-[24px] font-semibold">SavdoX tomonidan ogohlantirish!</p>
            </div>
        </template>

        <p class="text-gray-400 text-[18px] font-medium !mt-[20px]">
            "SavdoX ga xush kelibsiz! Xarid qilish yoki mahsulotingizni sotish uchun ro‘yxatdan o‘ting."
        </p>

        <template #footer>
            <div class="flex items-center justify-end gap-2 !mt-[40px]">
                <a-button size="large" ghost danger @click="registerStore.closeModal">Keyinroq</a-button>
                <a-button size="large" type="primary"
                    @click="() => { registerStore.closeModal(); registerStore.openDrawer(); }">
                    Ro'yxatdan o'tish
                </a-button>
            </div>
        </template>
    </a-modal>
</template>
