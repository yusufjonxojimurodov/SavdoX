<script setup>
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import useRegister from '../../../store/register.pinia';

const router = useRouter()
const userRegisterStore = useRegister()
const { drawerOpen } = storeToRefs(userRegisterStore)

const LoginForm = reactive({
    phone: "",
    password: ""
})

async function registerAccaount() {
    const success = await userRegisterStore.loginUser(LoginForm);
    if (success) {
        setTimeout(() => {
            userRegisterStore.closeDrawer()
            window.location.reload()
        }, 1000)
    }
}

function openBot() {
    window.open("https://t.me/savdo_x_bot", "_blank")
}
</script>

<template>
    <div class="w-full flex justify-center items-center">
        <div class="bg-[#1C1C1C] !p-6 sm:!p-10 md:!p-[50px] rounded-3xl shadow-lg w-full max-w-full md:max-w-3xl">
            <div class="text-center text-2xl sm:text-3xl font-semibold text-white !mb-8">
                Tizimga kirish
            </div>

            <a-form @finish="registerAccaount" :model="LoginForm" layout="vertical" class="w-full">
                <a-row :gutter="[16, 16]" class="!mt-6 flex flex-col md:flex-row">
                    <a-col :span="24" class="md:w-1/2">
                        <a-form-item name="phone" label="Telefon Raqamingiz"
                            :rules="[{ required: true, message: 'Majburiy maydon!' }]">
                            <a-input :name="`login-${Math.random().toString(36).substr(2, 9)}`" autocomplete="off"
                                v-model:value="LoginForm.phone" allow-clear
                                placeholder="Telefon raqamingizni kiriting (botimiz orqali royxatdan otganingiz bilan bir xil bo'lishi kerak)"
                                class="w-full h-12 text-base rounded-lg !bg-[#2a2a2a] !border-none text-white placeholder-gray-400 focus:border-gray-400" />
                        </a-form-item>
                    </a-col>

                    <a-col :span="24" class="md:w-1/2">
                        <a-form-item name="password" label="Parolingiz"
                            :rules="[{ required: true, message: 'Majburiy maydon!' }]">
                            <a-input-password :name="`login-${Math.random().toString(36).substr(2, 9)}`"
                                autocomplete="new-password" v-model:value="LoginForm.password" placeholder="Parolingiz"
                                class="w-full h-12 text-base rounded-lg !bg-[#2a2a2a] !border-none text-white placeholder-gray-400 focus:border-gray-400" />
                        </a-form-item>
                    </a-col>
                </a-row>

                <div class="flex flex-col sm:flex-row justify-between items-center mt-10 w-full gap-4">
                    <p class="text-white">
                        <span @click="openBot" class="text-[#FFD700] cursor-pointer">
                            Hisobingiz yo'qmi ?
                        </span>
                    </p>
                    <a-button :loading="userRegisterStore.loaderButton" type="primary" html-type="submit" size="large"
                        class=" !bg-[#FFD700] hover:!bg-[#e6c200] !border-none !text-black !font-semibold">
                        Tizimga kirish
                    </a-button>
                </div>
            </a-form>
        </div>
    </div>
</template>

<style scoped>
:deep(.ant-drawer-title) {
    color: #fff !important;
}

:deep(.ant-form-item-label > label) {
    color: #ccc !important;
}
</style>
