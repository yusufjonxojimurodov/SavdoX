    <script setup>
    import IconProfile from './icons/IconProfile.vue';
    import useRegister from '../store/register.pinia';
    import IconLogOut from './icons/IconLogOut.vue';
    import IconBasket from './icons/IconBasket.vue';
    import IconSetting from './icons/IconSetting.vue';
    import IconUser from './icons/IconUser.vue';
    import IconComent from './icons/IconComent.vue';
    import IconRobot from './icons/IconRobot.vue';
    import IconEnter from './icons/IconEnter.vue';
    import IconBurger from './icons/IconBurger.vue';
    import IconSamsung from './icons/companies/IconSamsung.vue';
    import IconApple from './icons/companies/IconApple.vue';
    import IconXiaomi from './icons/companies/IconXiaomi.vue';
    import IconGoogle from './icons/companies/IconGoogle.vue';
    import BurgerComponent from './BurgerComponent.vue';
    import { useRouter } from 'vue-router';
    import { message } from 'ant-design-vue';
    import ProfileModalComponent from './ProfileModalComponent.vue';
    import { ref } from 'vue';

    const registerstore = useRegister()
    const router = useRouter()
    const openProfile = ref(false)
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

    function basketProduct() {
        router.push("/basketProductView")
    }

    function openProfileModal() {
        openProfile.value = true
    }
</script>

    <template>
        <header class="shadow-md">
            <div class="container mx-auto px-6">
                <nav class="flex justify-between items-center !py-4">
                    <h1 class="logoName text-4xl font-bold">SavdoX</h1>

                    <ul class="hidden md:flex justify-center items-center gap-6">
                        <li>
                            <router-link to="/samsungPageView"
                                class="nav-link text-[16px] !text-white font-medium transition duration-500 hover:!text-[#FFD700]">
                                <icon-samsung />
                                <span>Samsung</span>
                            </router-link>
                        </li>
                        <li><router-link to="/iphonePageView"
                                class="nav-link text-[16px] !text-white font-medium transition duration-500 hover:!text-[#FFD700]">
                                <icon-apple />
                                Iphone
                            </router-link>
                        </li>
                        <li><router-link to="/xiaomiPageView"
                                class="nav-link text-[16px] !text-white font-medium transition duration-500 hover:!text-[#FFD700]">
                                <icon-xiaomi />
                                Xiaomi
                            </router-link>
                        </li>
                        <li><router-link to="/googlePageView"
                                class="nav-link text-[16px] !text-white font-medium hover:!text-[#FFD700]">
                                <icon-google />
                                Google
                            </router-link>
                        </li>
                    </ul>

                    <icon-burger class="md:hidden text-white w-8 h-8 cursor-pointer" @click="open = true" />
                    <a-space size="large" class="hidden md:flex items-center">
                        <a-button type="primary" size="large" :disabled="registerstore.user.length === 0"
                            @click="basketProduct"
                            class="basket !font-medium !text-[18px] text-white hidden w-[150px] sm:flex rounded-2xl hover:bg-[#2A2A2A] hover:!text-[#FFD700] transition duration-500">
                            <div class="flex items-center gap-2 justify-center w-full">
                                <icon-basket />
                                Savatcha
                            </div>
                        </a-button>


                        <a-dropdown :getPopupContainer="trigger => trigger.parentNode" placement="bottomRight"
                            :trigger="['click']">
                            <a class="ant-dropdown-link">
                                <a-space>
                                    <a-avatar size="large" class="border shadow-sm">
                                        <template #icon><icon-profile /></template>
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
                                        <a-menu-item class="logout-item" key="settings">
                                            <div class="flex justify-between items-center">
                                                Sozlamalar
                                                <icon-setting />
                                            </div>
                                        </a-menu-item>
                                        <a-menu-item key="comments">
                                            <div class="flex justify-between items-center w-full">
                                                Kommentariyalar
                                                <icon-coment class="absolute right-2.5" />
                                            </div>
                                        </a-menu-item>
                                        <a-menu-item key="telegramBot">
                                            <div class="flex justify-between items-center w-full">
                                                Bot ulash
                                                <icon-robot />
                                            </div>
                                        </a-menu-item>
                                        <a-menu-divider />
                                        <a-menu-item key="logout" class="logout-item">
                                            <a-popconfirm title="Akkauntdan chiqmoqchimisiz?" ok-text="Chiqish"
                                                cancel-text="Bekor qilish" :overlay-style="{ zIndex: 2000 }"
                                                @confirm="handleLogout" @click.stop>
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
                    </a-space>

                    <profile-modal-component v-model:open="openProfile" />
                    <burger-component v-model:open="open" />
                </nav>
            </div>
        </header>
    </template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap');

::v-deep(.nav-link) {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5px;
    padding-bottom: 4px;
}

::v-deep(.nav-link::after) {
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    width: 0%;
    height: 1.5px;
    background: #FFD700;
    transition: width 0.4s ease;
    border-radius: 1000px;
}

::v-deep(.nav-link:hover::after) {
    width: 100%;
}

:deep(.custom-dropdown .ant-menu-item) {
    background-color: #2a2a2a !important;
    color: #fff !important;
}

:deep(.custom-dropdown .ant-menu-item:hover) {
    background-color: #333333 !important;
}

:deep(.custom-dropdown .ant-menu-item-selected) {
    background-color: #2f2f2f !important;
}

:deep(.basket[disabled]) {
    opacity: 0.5 !important;
    cursor: not-allowed !important;
}

header {
    font-family: 'Poppins', sans-serif;
    background: #1C1C1C;
}

.logoName {
    color: white;
    letter-spacing: 1px;
    font-weight: 700;
}

.header-input {
    max-width: 280px;
    border-radius: 8px;

    &:focus {
        border: 1px solid #000435;
    }

    &:hover {
        border: 1px solid #000435;
    }
}

.logout-item {
    display: flex !important;
    align-items: center;
    justify-content: space-between;
}

.logout-item svg {
    font-size: 18px;
}

.basket {
    svg {
        stroke: white !important;
    }
}

.basket:hover {
    p {
        color: #FFD700;
    }

    svg {
        stroke: #FFD700 !important;
    }
}

.ant-popover {
    z-index: 2000 !important;
}


@media (max-width: 800px) {
    .logoName {
        display: none !important;
    }
}

@media (max-width: 450px) {
    .xs\:block {
        display: none !important;
    }

    .xs\:flex {
        display: none !important;
    }

    .logoName {
        display: none !important;
    }
}
</style>