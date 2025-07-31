<script setup>
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import useRegister from '../../../store/register.pinia';

const router = useRouter()
const userRegisterStore = useRegister()
const { drawerOpen } = storeToRefs(userRegisterStore)

const LoginForm = reactive({
    userName: "",
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
</script>

<template>
    <div class="w-full flex justify-center items-center min-h-screen">
        <div
            class="bg-[#1C1C1C] !p-6 sm:p-10 md:p-[50px] rounded-3xl shadow-lg w-full max-w-md sm:max-w-xl md:max-w-3xl">
            <div class="text-center text-2xl sm:text-3xl font-semibold text-white !mb-8">
                Tizimga kirish
            </div>

            <a-form @finish="registerAccaount" :model="LoginForm" layout="vertical" class="w-full">
                <a-row class="!mt-6" :gutter="[16, 16]">
                    <a-col :xs="24" :sm="24" :md="12">
                        <a-form-item name="userName" label="Foydalanuvchi nomi"
                            :rules="[{ required: true, message: 'Majburiy maydon!' }]" class="flex-1">
                            <a-input allow-clear v-model:value="LoginForm.userName" autocomplete="off"
                                placeholder="Foydalanuvchi nomini kiriting"
                                class="!w-full !h-12 !text-base sm:!text-lg !rounded-lg !bg-[#2a2a2a] !border-none !text-white placeholder-gray-400 focus:!border-gray-400">
                            </a-input>
                        </a-form-item>
                    </a-col>

                    <a-col :xs="24" :sm="24" :md="12">
                        <a-form-item name="password" label="Parolingiz"
                            :rules="[{ required: true, message: 'Majburiy maydon!' }]" class="flex-1">
                            <a-input-password v-model:value="LoginForm.password" autocomplete="new-password"
                                placeholder="Parolingiz"
                                class="!w-full !h-12 !text-base sm:!text-lg !rounded-lg !bg-[#2a2a2a] !border-none !text-white placeholder-gray-400 focus:!border-gray-400">
                            </a-input-password>
                        </a-form-item>
                    </a-col>
                </a-row>

                <div class="flex justify-between items-center !mt-[40px] w-full">
                    <p class="text-white">
                        <span @click="userRegisterStore.openRegister()" class="text-[#FFD700] cursor-pointer">Hisobingiz yo'qmi ?</span>
                    </p>
                    <a-button :loading="userRegisterStore.loaderButton" type="primary" html-type="submit" size="large"
                        class="w-full sm:w-auto !bg-[#FFD700] hover:!bg-[#e6c200] !border-none !text-black font-semibold">
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
