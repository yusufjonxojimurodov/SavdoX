<script setup>
import { useRouter } from 'vue-router';
import useSetting from '../store/settings.pinia';
import ProfileModalComponent from './ProfileModalComponent.vue';
import SettingModalComponent from './SettingModalComponent.vue';
import BurgerComponent from './BurgerComponent.vue';
import IconProfile from './icons/IconProfile.vue';
import useRegister from '../store/register.pinia';
import IconLogOut from './icons/IconLogOut.vue';
import IconProduct from './icons/IconProduct.vue';
import IconSetting from './icons/IconSetting.vue';
import IconUser from './icons/IconUser.vue';
import IconEnter from './icons/IconEnter.vue';
import { message } from 'ant-design-vue';
import { storeToRefs } from 'pinia';
import { onMounted, ref } from 'vue';

const settingStore = useSetting()
const { avatar } = storeToRefs(settingStore)
const registerstore = useRegister()
const router = useRouter()
const openProfile = ref(false)
const openSetting = ref(false)
const open = ref(false)

const handleLogout = () => {
    message.success("Hisobdan muvaffaqiyatli chiqildi !")
    setTimeout(() => {
        localStorage.removeItem("access_token")
        window.location.reload()
    }, 700)
    router.push("/")
}

function routerProfile() {
    router.push("/dashboard")
}

function openSettings() {
    openSetting.value = true
}

function openProfileModal() {
    openProfile.value = true
}

function routerBot() {
    if (registerstore.user.role === "seller" || registerstore.user.role === "admin") {
        router.push("/seller")
    } else {
        window.location.href = "https://t.me/savdo_x_bot"
    }
}

onMounted(() => {
    settingStore.getUserAvatar()
})
</script>

<template>
    <a-dropdown :getPopupContainer="trigger => trigger.parentNode" placement="bottomRight" :trigger="['click']">
        <a class="">
            <a-space>
                <a-avatar :size="64" style="background-color: none;">
                    <template #icon> <img v-if="settingStore.avatar.length > 1" :src="avatar" alt="avatar">
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
                    <a-menu-item key="telegramBot">
                        <div @click="routerBot" class="flex justify-between items-center w-full">
                            Mahsulot Sotish
                            <icon-product />
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
                            Ro'yxatdan o'tish
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