<script setup>
import { reactive, ref, watch } from 'vue';
import useSetting from '../store/settings.pinia';
import useRegister from '../store/register.pinia';
import IconHelp from './icons/IconHelp.vue';
import dayjs from 'dayjs';
import ImageUploadComponent from './BaseComponents/ImageUploadComponent.vue';

const props = defineProps({
    open: Boolean,
});

const userMe = useRegister();
const settingStore = useSetting();
const emits = defineEmits(['update:open']);

const fileList = ref([]);
const putBtnLoader = ref(false);

const accaountInfo = reactive({
    name: userMe.user.name,
    surname: userMe.user.surname,
    email: userMe.user.email,
    birthDate: userMe.user.birth_date,
});

function handleClose() {
    emits('update:open', false);
    fileList.value = [];
}

async function send() {
    try {
        putBtnLoader.value = true;

        const payload = {
            ...accaountInfo,
            avatarContentType: settingStore.avatarHashId,
        };

        await userMe.putUserInfo(payload);

        await settingStore.getUserAvatar();
        emits('update:open', false);
    } catch (error) {
        console.log('settingModal:', error)
    } finally {
        putBtnLoader.value = false;
    }
}


function disabledFutureDates(current) {
    return current && current > dayjs().endOf('day');
}

watch(
    () => userMe.user,
    (val) => {
        accaountInfo.name = val.name;
        accaountInfo.surname = val.surname;
        accaountInfo.email = val.email;
        accaountInfo.birthDate = val.birth_date ? dayjs(val.birth_date) : null;
    },
    { immediate: true }
);
</script>

<template>
    <a-modal :open="props.open" title="Akkaunt Ma'lumotlarini o'zgartirish"
        @update:open="val => emits('update:open', val)" @close="handleClose" :mask-closable="true" class="custom-modal"
        :footer="null">
        <image-upload-component />
        <a-form :model="accaountInfo" layout="vertical" class="custom-form">
            <a-form-item name="name" label="Ismingiz" :rules="[{ required: true, message: 'Majburiy Maydon!' }]">
                <a-input v-model:value="accaountInfo.name" size="large" placeholder="Ismingizni kiriting" />
            </a-form-item>

            <a-form-item name="surname" label="Familyangiz" :rules="[{ required: true, message: 'Majburiy Maydon!' }]">
                <a-input v-model:value="accaountInfo.surname" size="large" placeholder="Familyangizni kiriting" />
            </a-form-item>

            <a-form-item name="email" label="Emailingiz" :rules="[{ required: true, message: 'Majburiy Maydon!' }]">
                <a-input type="email" v-model:value="accaountInfo.email" size="large"
                    placeholder="Emailingizni kiriting" />
            </a-form-item>

            <a-form-item name="birthDate" label="Tug'ilgan sanangiz"
                :rules="[{ required: true, message: 'Majburiy maydon' }]">
                <a-date-picker v-model:value="accaountInfo.birthDate" size="large" placeholder="YYYY-MM-DD"
                    :disabled-date="disabledFutureDates" format="YYYY-MM-DD" style="width: 100%" />
            </a-form-item>
        </a-form>

        <a-space class="help-wrapper" size="middle" align="center">
            <a href="https://t.me/savdo_x_bot" target="_blank" rel="noopener noreferrer" class="help-link">
                Yordam
            </a>
            <icon-help class="help-icon" />
        </a-space>

        <div class="footer-buttons">
            <a-button class="!bg-white !border-1 !border-red-500 !text-red-500" size="large" @click="handleClose">Bekor
                Qilish</a-button>
            <a-button :loading="putBtnLoader" size="large" type="primary" @click="send">
                Saqlash
            </a-button>
        </div>
    </a-modal>
</template>

<style scoped>
.custom-modal .ant-modal-content {
    background-color: #1c1c1c;
    border-radius: 10px;
    color: #f0f0f0;
    font-family: 'Poppins', sans-serif;
}

.upload-wrapper {
    display: flex;
    justify-content: center;
    margin-top: 10px;
}

.upload-text {
    color: #212529;
    font-weight: 600;
    font-size: 12px;
}

.custom-form {
    color: #ccc;
}

.custom-form ::v-deep(.ant-form-item-label > label) {
    color: #212529 !important;
    font-weight: 600;
}

.custom-form ::v-deep(.ant-input:focus) {
    border-color: #ffd700;
    box-shadow: 0 0 6px #ffd700;
}

.custom-form ::v-deep(.ant-form-item-control-input-content) {
    margin-top: 6px;
}

.custom-form ::v-deep(.ant-picker) {
    background-color: #2a2a2a;
    color: #f0f0f0;
    border-radius: 6px;
    border: 1px solid #444;
    width: 100%;
}

.custom-form ::v-deep(.ant-picker-focused) {
    border-color: #ffd700;
    box-shadow: 0 0 6px #ffd700;
}

.help-wrapper {
    margin-top: 20px;
    margin-bottom: 10px;
}

.help-link {
    color: #212529;
    font-weight: 600;
    font-size: 18px;
    text-decoration: none;
    transition: color 0.3s ease;
}

.help-link:hover {
    color: #ffaa00;
}

.help-icon {
    fill: #ffd700;
    width: 20px;
    height: 20px;
}

.footer-buttons {
    display: flex;
    justify-content: flex-end;
    gap: 15px;
    margin-top: 25px;
}

@media (max-width: 600px) {
    .custom-modal .ant-modal-content {
        padding: 15px 20px;
    }

    .footer-buttons {
        flex-direction: column;
    }

    .footer-buttons a-button {
        width: 100%;
    }

    .help-wrapper {
        justify-content: center;
    }
}
</style>