<script setup>
import { reactive, ref, watch } from 'vue';
import useSetting from '../store/settings.pinia';
import useRegister from '../store/register.pinia';

const props = defineProps({
    open: Boolean
})

const userMe = useRegister()
const settingStore = useSetting()
const emits = defineEmits(['update:open'])

const fileList = ref([])
const accaountInfo = reactive({
    name: userMe.user.name,
    surname: userMe.user.surname,
    phone: userMe.user.phone,
    email: userMe.user.email
})

function handleClose() {
    emits('update:open', false)
    fileList.value = []
}

function send() {
    let file = null;

    if (fileList.value.length > 0) {
        file = fileList.value[0]?.originFileObj || null;
    }

    if (file) {
        settingStore.postUserAvatar(file);
    }

    userMe.putUserInfo(accaountInfo)
    settingStore.getUserAvatar()
}

watch(() => userMe.user, (val) => {
    Object.assign(accaountInfo, val);
}, { immediate: true });

</script>

<template>
    <a-modal title="Akkaunt Ma'lumotlarini o'zgartirish" :open="props.open"
        @update:open="val => emits('update:open', val)" @close="handleClose" :mask-closable="true">
        <a-upload class="!mt-[20px]" accept=".jpg,.png,.webp,.jfif" v-model:fileList="fileList"
            :before-upload="() => false" list-type="picture-card" :max-count="1">
            <template v-if="fileList.length === 0">
                <p class="text-white">Profile yuklash</p>
            </template>
        </a-upload>

        <a-form class="!mt-[40px]" :model="accaountInfo" layout="vertical">
            <a-form-item :rules="[{ required: true, message: 'Majburiy Maydon!' }]" name="name" label="Ismingiz">
                <a-input size="large" v-model:value="accaountInfo.name" placeholder="Ismingizni kiriting" />
            </a-form-item>


            <a-form-item :rules="[{ required: true, message: 'Majburiy Maydon!' }]" name="surname" label="Familyangiz">
                <a-input v-model:value="accaountInfo.surname" size="large" placeholder="Familyangizni kiriting" />
            </a-form-item>


            <a-form-item :rules="[{ required: true, message: 'Majburiy Maydon!' }]" name="phone"
                label="Telefon Raqamingiz">
                <a-input v-model:value="accaountInfo.phone" size="large" placeholder="Telefon Raqamingizni kiriting" />
            </a-form-item>


            <a-form-item :rules="[{ required: true, message: 'Majburiy Maydon!' }]" name="email" label="Emailingiz">
                <a-input v-model:value="accaountInfo.email" size="large" placeholder="Emailingizni kiriting" />
            </a-form-item>
        </a-form>

        <template #footer>
            <a-button size="large" @click="handleClose">Bekor Qilish</a-button>
            <a-button :loading="userMe.loaderButton" size="large" type="primary" @click="send">Saqlash</a-button>
        </template>
    </a-modal>
</template>

<style scoped>
:deep(.ant-drawer-title) {
    color: #fff !important;
}

:deep(.ant-form-item-label > label) {
    color: #ccc !important;
}
</style>