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
import { ref } from 'vue';
import IconComent from './icons/IconComent.vue';

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

function supportAdmin() {
    window.location.href = "https://t.me/savdo_x_bot"
}
</script>

<template>
    <a-dropdown :getPopupContainer="getPopupContainer" placement="bottomRight"">
        <a class="">
            <a-space>
                <a-avatar class=" avatar" style="background-color: none;">
        <template #icon>
            <img v-if="avatar" :src="avatar" alt="avatar">
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
                            <icon-user class="w-4 h-4" />
                        </div>
                    </a-menu-item>
                    <!-- <a-menu-item>
                        <div @click="router.push({ name: 'Chats' })" class="flex justify-between items-center"
                            key="chats">
                            Chatlarim
                            <icon-coment class="w-4 h-4" />
                        </div>
                    </a-menu-item> -->
                    <a-menu-item @click="openSettings" class="logout-item" key="settings">
                        <div class="flex justify-between items-center">
                            Profil sozlamasi
                            <icon-setting class="w-4 h-4" />
                        </div>
                    </a-menu-item>
                    <a-menu-divider />
                    <a-menu-item key="logout" class="logout-item">
                        <a-popconfirm title="Akkauntdan chiqmoqchimisiz?" ok-text="Chiqish" cancel-text="Bekor qilish"
                            :overlay-style="{ zIndex: 2000 }" @confirm="handleLogout" @click.stop>
                            <div class="text-red-500 flex justify-between items-center w-full">
                                <span>Chiqish</span>
                                <icon-log-out class="w-4 h-4" />
                            </div>
                        </a-popconfirm>
                    </a-menu-item>
                </template>
                <template v-else>
                    <a-menu-item @click="registerstore.openDrawer" class="logout-item" key="profil">
                        <div class="flex justify-between items-center w-full">
                            Tizimga kirish
                            <icon-enter class="w-4 h-4" />
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