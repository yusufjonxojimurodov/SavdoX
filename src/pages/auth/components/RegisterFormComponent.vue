<script setup>
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import useRegister from '../../../store/register.pinia';
import WarnModalComponent from './WarnModalComponent.vue';

const router = useRouter()
const userRegisterStore = useRegister()
const { drawerOpen } = storeToRefs(userRegisterStore)

const registerForm = reactive({
    name: "",
    surname: "",
    phone: "",
    password: ""
})

async function registerAccaount() {
    const success = await userRegisterStore.registerUser(registerForm);
    if (success) {
        setTimeout(() => {
            userRegisterStore.closeDrawer()
            window.location.reload()
        }, 1000)
    }
}
</script>

<template>
    <div class="w-full flex justify-center items-center">
        <div class="bg-[#1C1C1C] !p-6 sm:!p-10 md:!p-[50px] rounded-3xl shadow-lg w-full max-w-full md:max-w-3xl">
            <div class="text-center text-2xl sm:text-3xl font-semibold text-white !mb-8">
                Ro'yxatdan o'tish
            </div>

            <a-form @finish="registerAccaount" :model="registerForm" layout="vertical" class="w-full">
                <a-row :gutter="[16, 16]" class="!mt-6 flex flex-col md:flex-row">
                    <a-col :span="24" class="md:w-1/2">
                        <a-form-item name="name" label="Ismingiz"
                            :rules="[{ required: true, message: 'Majburiy Maydon!' }]">
                            <a-input :name="`field-${Math.random().toString(36).substr(2, 9)}`" autocomplete="off"
                                v-model:value="registerForm.name" allow-clear placeholder="Ismingizni kiriting"
                                class="w-full h-12 text-base rounded-lg !bg-[#2a2a2a] !border-none text-white placeholder-gray-400 focus:!border-gray-400" />
                        </a-form-item>
                    </a-col>

                    <a-col :span="24" class="md:w-1/2">
                        <a-form-item name="surname" label="Familyangiz"
                            :rules="[{ required: true, message: 'Majburiy Maydon!' }]">
                            <a-input :name="`field-${Math.random().toString(36).substr(2, 9)}`" autocomplete="off"
                                v-model:value="registerForm.surname" allow-clear placeholder="Familyangizni kiriting"
                                class="w-full h-12 text-base rounded-lg !bg-[#2a2a2a] !border-none text-white placeholder-gray-400 focus:border-gray-400" />
                        </a-form-item>
                    </a-col>
                </a-row>

                <a-row :gutter="[16, 16]" class="mt-6 flex flex-col md:flex-row">
                    <a-col :span="24" class="md:w-1/2">
                        <a-form-item name="phone" label="Telefon Raqamingiz"
                            :rules="[{ required: true, message: 'Majburiy maydon!' }]">
                            <a-input :name="`field-${Math.random().toString(36).substr(2, 9)}`" autocomplete="off"
                                v-model:value="registerForm.phone" allow-clear
                                placeholder="Telefon raqamingiz"
                                class="w-full h-12 text-base rounded-lg !bg-[#2a2a2a] !border-none text-white placeholder-gray-400" />
                        </a-form-item>
                    </a-col>

                    <a-col :span="24" class="md:w-1/2">
                        <a-form-item name="password" label="Parolingiz"
                            :rules="[{ required: true, message: 'Majburiy maydon!' }]">
                            <a-input-password :name="`field-${Math.random().toString(36).substr(2, 9)}`"
                                autocomplete="new-password" v-model:value="registerForm.password"
                                placeholder="Parolingiz"
                                class="w-full h-12 text-base rounded-lg !bg-[#2a2a2a] !border-none text-white placeholder-gray-400 focus:border-gray-400" />
                        </a-form-item>
                    </a-col>
                </a-row>

                <div class="flex flex-col sm:flex-row justify-between items-center mt-10 w-full gap-4">
                    <p class="text-white m-0">
                        <span @click="userRegisterStore.openLogin()" class="text-[#FFD700] cursor-pointer">
                            Hisobingiz bormi ?
                        </span>
                    </p>
                    <a-button :loading="userRegisterStore.loaderButton" type="primary" html-type="submit" size="large"
                        class="!bg-[#FFD700] hover:!bg-[#e6c200] !border-none !text-black !font-semibold">
                        Ro'yxatdan o'tish
                    </a-button>
                </div>
            </a-form>
        </div>
    </div>

    <warn-modal-component v-model:open="userRegisterStore.botModalOpen" />
</template>


<style scoped>
:deep(.ant-drawer-title) {
    color: #fff !important;
}

:deep(.ant-form-item-label > label) {
    color: #ccc !important;
}
</style>
