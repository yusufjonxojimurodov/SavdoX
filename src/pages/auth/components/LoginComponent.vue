<script setup>
import { reactive, ref } from 'vue';
import useRegister from '@/store/register.pinia';
import WarningModalLogin from '@/components/WarningModalLogin.vue';
import { phoneCodeValidator } from '@/utils/helpers/phoneValidator';
import { formatPhoneNumber } from '@/utils/helpers/formatPhoneNumber';

const userRegisterStore = useRegister()

const openModal = ref(false)

const LoginForm = reactive({
    phone: "",
    password: ""
})

async function loginAccaount() {
    const payload = {
        ...LoginForm,
        phone: "+998" + LoginForm.phone.replace(/[-\s]/g, "")
    };

    const success = await userRegisterStore.loginUser(payload)
    if (success) {
        setTimeout(() => {
            userRegisterStore.closeDrawer()
            window.location.reload()
        }, 600)
    }
}

const phoneRules = [
    {
        required: true,
        message: "Majburiy maydon",
    },
    {
        validator: (_rule, value) => {
            if (!value) return Promise.resolve();
            const val = value || '';
            const cleanVal = val.replace(/[-\s]/g, '');

            if (!phoneCodeValidator(cleanVal)) {
                return Promise.reject(new Error("Raqamni tog'ri formatda kiriting"));
            } else if (cleanVal.length < 9) {
                return Promise.reject(new Error("Minimal 9 ta raqamdan iborat bo'lishi kerak"));
            }
            return Promise.resolve();
        },
        trigger: "blur"
    }
];

function handleInput(value) {
    LoginForm.phone = formatPhoneNumber(value) ?? "";
}
</script>

<template>
    <div class="w-full flex justify-center items-center h-full">
        <a-card class="!bg-white !shadow-2xs !border-none !w-full">
           <div class="flex justify-center items-center gap-2 flex-col !mb-8">
                <p class="!p-0 !m-0 text-center text-2xl sm:text-3xl !font-semibold text-[#212529]">
                    Tizimga kirish
                </p>
                <p class="!p-0 !m-0">Smart texnika, smart tanlov – login qiling va boshlang !</p>
           </div>
            <a-form 
                @finish="loginAccaount" 
                :model="LoginForm" 
                layout="vertical"
            >
                <a-form-item 
                    name="phone" 
                    label="Telefon raqam"
                    :rules="phoneRules"
                >
                    <div class="flex justify-center items-center shadow-[0_4px_12px_rgba(0,0,0,0.1)]! !px-3 rounded-[30px]!">
                        <span class="!p-0 !m-0 text-[15px]!">+998</span>
                        <a-input
                            autocomplete="off" 
                            :maxlength="12"
                            placeholder="00 000-00-00" 
                            class="bg-transparent! shadow-none! py-3! text-[15px]!"
                            v-model:value="LoginForm.phone"
                            @input="handleInput"
                        />
                    </div>
                </a-form-item>
                <a-form-item 
                    name="password" 
                    label="Parol"
                    :rules="[{ required: true, message: 'Majburiy maydon !' }]"
                >
                    <a-input
                        size="large" 
                        autocomplete="new-password" 
                        placeholder="Parolingizni kiriting" 
                        class="py-3! px-3! password-placeholder"
                        v-model:value="LoginForm.password"
                    />
                </a-form-item>

                <p @click="openModal = true" class="m-0! p-0! mb-4! cursor-pointer !font-semibold text-gray-800 text-end!">Parol unutdingizmi ?</p>

                <div>
                    <a-button
                        type="primary" 
                        html-type="submit"
                        :loading="userRegisterStore.loaderButton"
                        size="large"
                        class="w-full!"
                    >
                        <template #icon>
                            Tizimga kirish
                        </template>
                    </a-button>
                    <p class="p-0! m-0! mt-4! text-center !font-semibold">Akkauntingiz yoqmi ? <a href="https://t.me/savdo_x_bot" target="_blank" class="text-orange-600! cursor-pointer !font-semibold">Ro'yxatdan o'tish</a></p>
                </div>
            </a-form>

            <warning-modal-login v-model:open="openModal" />
        </a-card>
    </div>
</template>