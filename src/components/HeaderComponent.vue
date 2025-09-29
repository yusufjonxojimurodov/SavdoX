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
    import { ref } from 'vue';
    import useSetting from '../store/settings.pinia';
    import { storeToRefs } from 'pinia';
    import ProfileComponent from './ProfileComponent.vue';
    import IconTime from './icons/IconTime.vue';
    import IconPurchase from './icons/IconPurchase.vue';
    import IconOther from './icons/companies/IconOther.vue';
    
    const route = useRoute()
    const settingStore = useSetting()
    const { avatar } = storeToRefs(settingStore)
    const registerstore = useRegister()
    const router = useRouter()
    const open = ref(false)

    function basketProduct() {
        router.push("/basket")
    }

    function pendingPage() {
        router.push("/pending/product")
    }

    function buyyedPage() {
        router.push("/buyyed/product")
    }
</script>

    <template>
        <header class="shadow-md">
            <div class="container mx-auto px-6">
                <nav class="flex justify-between items-center !py-4">
                    <router-link to="/" class="logoName !text-4xl  font-bold !m-0 !p-0">TexnoBazaar</router-link>

                    <ul class="hidden md:flex justify-center items-center gap-6">
                        <li>
                            <router-link to="/samsung"
                                class="nav-link text-[16px] !text-[#F8EDEB] font-medium transition duration-500">
                                <icon-samsung />
                                <span>Samsung</span>
                            </router-link>
                        </li>
                        <li><router-link to="/apple"
                                class="nav-link text-[16px] !text-[#F8EDEB] font-medium transition duration-500">
                                <icon-apple />
                                Apple
                            </router-link>
                        </li>
                        <li><router-link to="/xiaomi"
                                class="nav-link text-[16px] !text-[#F8EDEB] font-medium transition duration-500">
                                <icon-xiaomi />
                                Xiaomi
                            </router-link>
                        </li>
                        <li><router-link to="/google"
                                class="nav-link text-[16px] !text-[#F8EDEB] font-medium">
                                <icon-google />
                                Google
                            </router-link>
                        </li>
                        <li><router-link to="/others"
                                class="nav-link text-[16px] !text-[#F8EDEB] font-medium">
                                <icon-other />
                                Boshqalar
                            </router-link>
                        </li>
                    </ul>

                    <icon-burger class="md:hidden text-white w-8 h-8 cursor-pointer" @click="open = true" />
                    <a-space size="large" class="hidden md:flex items-center">
                        <a-button
                            v-if="!route.path.includes('/basket') && !route.path.includes('/pending/product') && !route.path.includes('/buyyed/product')"
                            type="primary" size="large" :disabled="registerstore.user.length === 0"
                            @click="basketProduct"
                            class="basket !bg-[#F8EDEB] !font-medium !text-[18px] !text-[#343A40] hidden w-[150px] sm:flex rounded-2xl transition duration-500">
                            <div class="flex items-center gap-2 justify-center w-full">
                                <icon-basket />
                                Savatcha
                            </div>
                        </a-button>

                        <a-button @click="pendingPage" v-else-if="route.path.includes('/basket')"
                            class="!flex justify-center items-center !gap-3 !font-semibold" size="large" type="primary">
                            Haridlar Tarixi
                            <template #icon>
                                <icon-time />
                            </template>
                        </a-button>

                        <a-button @click="buyyedPage" v-else-if="route.path.includes('/pending/product')" size="large"
                            type="primary"
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
    background: #212529;
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
    opacity: 0.7 !important;
    cursor: not-allowed !important;
}

header {
    font-family: 'Poppins', sans-serif;
    background: #FF8C00;
}

.logoName {
    color: #F8EDEB;
    letter-spacing: 1px;
    font-weight: 800;
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
        stroke: #343A40 !important;
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