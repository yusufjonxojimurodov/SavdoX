<script setup>
import { reactive, ref } from 'vue';
import useRegister from '@/store/register.pinia';
import WarningModalLogin from '@/components/WarningModalLogin.vue';
import LoginFaceModalComponent from './LoginFaceModalComponent.vue';

const userRegisterStore = useRegister()

const openModal = ref(false)
const openLoginFaceModal = ref(false)

const LoginForm = reactive({
    phone: "+998",
    password: ""
})

function handlePhoneInput(e) {
    let value = e.target.value
    if (!value.startsWith('+998')) {
        value = '+998' + value.replace(/[^0-9]/g, '')
    }

    let digits = value.replace(/\D/g, '').slice(3)

    let formatted = '+998'
    if (digits.length > 0) formatted += ' ' + digits.substring(0, 2)
    if (digits.length > 2) formatted += '-' + digits.substring(2, 5)
    if (digits.length > 5) formatted += '-' + digits.substring(5, 7)
    if (digits.length > 7) formatted += '-' + digits.substring(7, 9)

    LoginForm.phone = formatted
}


async function loginAccaount() {
    const cleanPhone = LoginForm.phone.replace(/-/g, '').replace(/\s/g, '')

    const payload = {
        ...LoginForm,
        phone: cleanPhone
    }

    const success = await userRegisterStore.loginUser(payload)
    if (success) {
        setTimeout(() => {
            userRegisterStore.closeDrawer()
            window.location.reload()
        }, 1000)
    }
}

function openWarningModal() {
    openModal.value = true
}
</script>

<template>
    <div class="w-full flex justify-center items-center">
        <div class="bg-[#F8EDEB] !p-6 sm:!p-10 md:!p-[50px] rounded-3xl shadow-lg w-full max-w-full md:max-w-3xl">
            <div class="text-center text-2xl sm:text-3xl font-semibold text-[#212529] !mb-8">
                Tizimga kirish
            </div>

            <a-form @finish="loginAccaount" :model="LoginForm" layout="vertical" class="w-full">
                <a-row :gutter="[16, 16]" class="!mt-6 flex flex-col md:flex-row">
                    <a-col :span="24" class="md:w-1/2">
                        <a-form-item name="phone" label="Telefon Raqamingiz"
                            :rules="[{ required: true, message: 'Majburiy maydon!' }]">
                            <a-input v-model:value="LoginForm.phone" :value="LoginForm.phone" @input="handlePhoneInput"
                                autocomplete="off" allow-clear="false" placeholder="+998 XX-XXX-XX-XX"
                                class="w-full h-12 text-base rounded-lg  !border-none text-white placeholder-gray-400 focus:border-gray-400" />
                        </a-form-item>
                    </a-col>

                    <a-col :span="24" class="md:w-1/2">
                        <a-form-item name="password" label="Parolingiz"
                            :rules="[{ required: true, message: 'Majburiy maydon!' }]">
                            <a-input-password :name="`login-${Math.random().toString(36).substr(2, 9)}`"
                                autocomplete="new-password" v-model:value="LoginForm.password" placeholder="Parolingiz"
                                class="w-full h-12 text-base rounded-lg !border-none text-white placeholder-gray-400 focus:border-gray-400" />
                        </a-form-item>
                    </a-col>
                </a-row>

                <div class="flex flex-col sm:flex-row justify-between items-center mt-10 w-full gap-4">
                    <p class="text-white">
                        <span @click="openWarningModal" class="text-[#212529] cursor-pointer">
                            Hisobingiz yo'qmi ?
                        </span>
                    </p>
                    <div class="flex justify-center items-center gap-4">
                        <!-- <a-button @click="openLoginFaceModal = true"
                            size="large" class="!border-none">
                            Yuz bilan kirish
                        </a-button> -->
                        <a-button :loading="userRegisterStore.loaderButton" type="primary" html-type="submit"
                            size="large" class="!border-none !text-black !font-semibold">
                            Tizimga kirish
                        </a-button>
                    </div>
                </div>
            </a-form>

            <warning-modal-login v-model:open="openModal" />
            <login-face-modal-component v-model:open="openLoginFaceModal"/>
        </div>
    </div>
</template>

<style scoped>
:deep(.ant-drawer-title) {
    color: #fff !important;
}

:deep(.ant-form-item-label > label) {
    color: #212529 !important;
}
</style>
