<script setup>
import useRegister from '@/store/register.pinia'
import useSetting from '@/store/settings.pinia'
import IconProfile from './icons/IconProfile.vue'
import dayjs from 'dayjs'

const props = defineProps({
    open: Boolean
})

const settingStore = useSetting()
const emits = defineEmits(['update:open'])
const registerStore = useRegister()

function handleClose() {
    emits('update:open', false)
}
</script>

<template>
    <a-modal centered class="!w-[500px] max-w-full sm:!w-[50%]" :open="props.open"
        @update:open="val => emits('update:open', val)" :mask-closable="true"
        :cancel-button-props="{ style: { display: 'none' } }">
        <div
            class="flex sm:flex-row flex-col sm:justify-start justify-center sm:items-center items-center !p-[10px] gap-[16px] border-b border-gray-600 text-center sm:text-left">
            <a-avatar :size="64" style="background-color: none;">
                <template #icon>
                    <img v-if="settingStore.avatar" :src="settingStore.avatar" alt="avatar" />
                    <icon-profile v-else />
                </template>
            </a-avatar>
            <div class="flex justify-center items-start flex-col gap-[5px]">
                <p class="text-[#212529] !font-bold !m-0 !p-0 text-[20px] sm:text-[24px]">
                    {{ registerStore.user.name }} {{ registerStore.user.surname }}
                </p>
                <p class="text-gray-500 !m-0 !p-0 font-medium text-[16px] sm:text-[18px]">
                    Foydalanuvchi nomi: @{{ registerStore.user.username }}
                </p>
            </div>
        </div>

        <div v-for="(value, label) in {
            'Ismingiz': registerStore.user.name,
            'Familyangiz': registerStore.user.surname,
            'Telefon Raqamingiz': registerStore.user.phone || '—',
            'Yoshingiz': registerStore.user.birthDate ? dayjs(registerStore.user.birthDate).format('DD-MM-YYYY') : '—',
            'Emailingiz': registerStore.user.email || '—',
            'Bozorimizdagi darajangiz': registerStore.user.role || '—'
        }" :key="label"
            class="!mt-[20px] flex sm:flex-row flex-col sm:justify-between justify-center sm:items-center items-start sm:gap-0 gap-[6px] !p-[16px] border-b border-gray-600">
            <p class="text-[#212529] text-[18px] sm:text-[24px] !font-semibold">{{ label }}</p>
            <p class="text-[#393d41] text-[18px] sm:text-[24px] font-semibold break-all">{{ value }}</p>
        </div>

        <template #footer>
            <a-button @click="handleClose" size="large" type="primary" block>Yopish</a-button>
        </template>
    </a-modal>
</template>
