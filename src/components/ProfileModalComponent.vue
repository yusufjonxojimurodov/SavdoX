<script setup>
import { onMounted } from 'vue'
import useRegister from '../store/register.pinia'
import useSetting from '../store/settings.pinia'
import IconProfile from './icons/IconProfile.vue'

const props = defineProps({
    open: Boolean
})

const settingStore = useSetting()
const emits = defineEmits(['update:open'])

const registerStore = useRegister()

function handleClose() {
    emits('update:open', false)
}

onMounted(() => {
    settingStore.getUserAvatar()
})
</script>

<template>
    <a-modal :open="props.open" @update:open="val => emits('update:open', val)" @ok="handleClose" :mask-closable="true"
        ok-text="OK" :cancel-button-props="{ style: { display: 'none' } }">
        <div class="flex justify-start items-center !p-[10px] gap-[16px] border-b border-gray-600">
            <a-avatar :size="64" style="background-color: none;">
                <template #icon> <img v-if="settingStore.avatar.length > 1" :src="settingStore.avatar" alt="avatar">
                    <icon-profile v-else />
                </template>
            </a-avatar>
            <div class="flex justify-center items-start flex-col gap-[5px]">
                <p class="text-white font-bold text-[24px]">
                    {{ registerStore.user.name }} {{ registerStore.user.surname }}
                </p>
                <p class="text-gray-500 font-medium text-[18px]">
                    Foydalanuvchi nomi: {{ registerStore.user.userName }}
                </p>
            </div>
        </div>

        <div class="!mt-[26px] flex justify-between items-center !p-[16px] border-b border-gray-600">
            <p class=" text-gray-400 text-[24px] max-[450px]:text-[20px] font-semibold">Ismingiz</p>
            <p class="text-white text-[24px] max-[450px]:text-[20px] font-semibold">{{ registerStore.user.name }}</p>
        </div>
        <div class="!mt-[26px] flex justify-between items-center !p-[16px] border-b border-gray-600">
            <p class=" text-gray-400 text-[24px] max-[450px]:text-[20px] font-semibold">Familyangiz</p>
            <p class="text-white text-[24px] max-[450px]:text-[20px] font-semibold">{{ registerStore.user.surname }}</p>
        </div>
        <div class="!mt-[26px] flex justify-between items-center !p-[16px] border-b border-gray-600">
            <p class=" text-gray-400 text-[24px] max-[450px]:text-[20px] font-semibold">Telefon Raqamingiz</p>
            <p class="text-white text-[24px] max-[450px]:text-[20px] font-semibold">{{ registerStore.user.phone || '—'
                }}</p>
        </div>
        <div class="!mt-[26px] flex justify-between items-center !p-[16px] border-b border-gray-600">
            <p class=" text-gray-400 text-[24px] max-[450px]:text-[20px] font-semibold">Yoshingiz</p>
            <p class="text-white text-[24px] max-[450px]:text-[20px] font-semibold">{{ registerStore.user.age || '—' }}
            </p>
        </div>
        <div class="!mt-[26px] flex justify-between items-center !p-[16px] border-b border-gray-600">
            <p class=" text-gray-400 text-[24px] max-[450px]:text-[20px] font-semibold">Emailingiz</p>
            <p class="text-white text-[24px] max-[450px]:text-[20px] font-semibold">{{ registerStore.user.email || '—'
                }}</p>
        </div>
        <div class="!mt-[26px] flex justify-between items-center !p-[16px] border-b border-gray-600">
            <p class=" text-gray-400 text-[24px] max-[450px]:text-[20px] font-semibold">Bozorimizdagi darajangiz</p>
            <p class="text-white text-[24px] max-[450px]:text-[20px] font-semibold">{{ registerStore.user.role || '—'
                }}</p>
        </div>
    </a-modal>
</template>
