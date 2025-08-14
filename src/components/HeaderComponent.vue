    <script setup>
    import useRegister from '../store/register.pinia';
    import IconBasket from './icons/IconBasket.vue';
    import IconBurger from './icons/IconBurger.vue';
    import IconSamsung from './icons/companies/IconSamsung.vue';
    import IconApple from './icons/companies/IconApple.vue';
    import IconXiaomi from './icons/companies/IconXiaomi.vue';
    import IconGoogle from './icons/companies/IconGoogle.vue';
    import BurgerComponent from './BurgerComponent.vue';
    import { useRoute, useRouter } from 'vue-router';
    import { onMounted, ref } from 'vue';
    import useSetting from '../store/settings.pinia';
    import { storeToRefs } from 'pinia';
    import ProfileComponent from './ProfileComponent.vue';
    import IconTime from './icons/IconTime.vue';
    import IconPurchase from './icons/IconPurchase.vue';

    const route = useRoute()
    const settingStore = useSetting()
    const { avatar } = storeToRefs(settingStore)
    const registerstore = useRegister()
    const router = useRouter()
    const open = ref(false)

    onMounted(() => {
        settingStore.getUserAvatar()
    })

    function basketProduct() {
        router.push("/basketProductView")
    }

    function pendingPage() {
        router.push("/pending/product")
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
                        <a-button
                            v-if="!route.path.includes('/basketProductView') && !route.path.includes('/pending/product')"
                            type="primary" size="large" :disabled="registerstore.user.length === 0"
                            @click="basketProduct"
                            class="basket !font-medium !text-[18px] text-white hidden w-[150px] sm:flex rounded-2xl hover:bg-[#2A2A2A] hover:!text-[#FFD700] transition duration-500">
                            <div class="flex items-center gap-2 justify-center w-full">
                                <icon-basket />
                                Savatcha
                            </div>
                        </a-button>

                        <a-button @click="pendingPage" v-else-if="route.path.includes('/basketProductView')"
                            class="!flex justify-center items-center" size="large" type="primary">
                            <template #icon>
                                <icon-time />
                            </template>
                        </a-button>

                        <a-button v-else-if="route.path.includes('/pending/product')" size="large" type="primary"
                            class="!flex justify-center items-center !gap-[10px] !font-semibold !text-[18px]">
                                Sotib olinganlar
                                <icon-purchase />
                        </a-button>

                        <profile-component />
                    </a-space>
                </nav>
            </div>
        </header>

        <burger-component v-model:open="open" />
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