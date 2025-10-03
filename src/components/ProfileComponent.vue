<script setup>
import { useRoute, useRouter } from 'vue-router';
import useSetting from '../store/settings.pinia';
import ProfileModalComponent from './ProfileModalComponent.vue';
import SettingModalComponent from './SettingModalComponent.vue';
import BurgerComponent from './BurgerComponent.vue';
import IconProfile from './icons/IconProfile.vue';
import useRegister from '../store/register.pinia';
import IconLogOut from './icons/IconLogOut.vue';
import IconSetting from './icons/IconSetting.vue';
import IconUser from './icons/IconUser.vue';
import IconEnter from './icons/IconEnter.vue';
import IconAdmin from './icons/IconAdmin.vue';
import { message } from 'ant-design-vue';
import { storeToRefs } from 'pinia';
import { onMounted, ref } from 'vue';
import IconAdd from './icons/IconAdd.vue';

const route = useRoute()
const settingStore = useSetting()
const { avatar } = storeToRefs(settingStore)
const registerstore = useRegister()
const router = useRouter()
const openProfile = ref(false)
const openSetting = ref(false)
const open = ref(false)
const getPopupContainer = () => document.body;

const handleLogout = () => {
    message.success("Hisobdan muvaffaqiyatli chiqildi !")
    setTimeout(() => {
        localStorage.removeItem("access_token")
        window.location.reload()
    }, 700)
    if (route.name === "Seller") {
        router.push("/")
    }
}

function openSettings() {
    openSetting.value = true
}

function openProfileModal() {
    openProfile.value = true
}

function routerBot() {
    if (registerstore.user.role === "seller" || registerstore.user.role === "admin") {
        router.push("/seller/products")
    } else {
        window.open("https://t.me/savdo_x_bot", "_blank")
    }
}

function supportAdmin() {
    window.location.href = "https://t.me/savdo_x_bot"
}

onMounted(() => {
    settingStore.getUserAvatar()
})
</script>

<template>
    <a-dropdown :getPopupContainer="getPopupContainer" placement="bottomRight" :trigger="['click']"">
        <a class="">
            <a-space>
                <a-avatar class=" avatar" style="background-color: none;">
        <template #icon> <img v-if="settingStore.avatar.length" :src="avatar" alt="avatar">
            <icon-profile v-else />
        </template>
        </a-avatar>
        </a-space>
        </a>

        <template #overlay>
            <a-menu class="custom-dropdown w-48">
                <template v-if="registerstore.user && Object.keys(registerstore.user).length > 0">
                    <a-menu-item @click="openProfileModal" class="logout-item" key="profil">
                        <div class="flex justify-between items-center w-full">
                            Profil
                            <icon-user />
                        </div>
                    </a-menu-item>
                    <a-menu-item @click="openSettings" class="logout-item" key="settings">
                        <div class="flex justify-between items-center">
                            Sozlamalar
                            <icon-setting />
                        </div>
                    </a-menu-item>
                    <a-menu-item v-if="!route.path.includes('/seller')" key="telegramBot">
                        <div @click="routerBot" class="flex justify-between items-center w-full">
                            Mahsulot qo'shish
                            <icon-add />
                        </div>
                    </a-menu-item>
                    <a-menu-item v-if="route.path.includes('/seller')" key="telegramBot">
                        <div @click="supportAdmin" class="flex justify-between items-center w-full">
                            Adminga Bog'lanish
                            <icon-admin />
                        </div>
                    </a-menu-item>
                    <a-menu-divider />
                    <a-menu-item key="logout" class="logout-item">
                        <a-popconfirm title="Akkauntdan chiqmoqchimisiz?" ok-text="Chiqish" cancel-text="Bekor qilish"
                            :overlay-style="{ zIndex: 2000 }" @confirm="handleLogout" @click.stop>
                            <div class="flex justify-between items-center w-full">
                                <span>Chiqish</span>
                                <icon-log-out />
                            </div>
                        </a-popconfirm>
                    </a-menu-item>
                </template>
                <template v-else>
                    <a-menu-item @click="registerstore.openDrawer" class="logout-item" key="profil">
                        <div class="flex justify-between items-center w-full">
                            Tizimga kirish
                            <icon-enter />
                        </div>
                    </a-menu-item>
                </template>
            </a-menu>
        </template>
    </a-dropdown>

    <profile-modal-component v-model:open="openProfile" />
    <setting-modal-component v-model:open="openSetting" />
    <burger-component v-model:open="open" />
</template>

<style>
.avatar {
    width: 64px;
    height: 64px;
    background-color: white;
}

@media (max-width: 768px) {
    .avatar {
        width: 52px;
        height: 52px;
    }
}
</style>