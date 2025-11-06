<script setup>
import { computed, h, onBeforeUnmount, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import IconPhoneProduct from '@/components/icons/IconPhoneProduct.vue';
import IconRating from '@/components/icons/IconRating.vue';
import IconStatistic from '@/components/icons/IconStatistic.vue';
import IconReport from '@/components/icons/IconReport.vue';
import IconBack from '@/components/icons/IconBack.vue';
import ProfileComponent from '@/components/ProfileComponent.vue';
import IconArrowLeft from '@/components/icons/IconArrowLeft.vue';
import IconArrowRight from '@/components/icons/IconArrowRight.vue';
import IconDelivery from '@/components/icons/IconDelivery.vue';
import IconConfirm from '@/components/icons/IconConfirm.vue';
import NotificationsComponent from '@/components/NotificationsComponent.vue';

const collapsed = ref(false);
const route = useRoute();
const router = useRouter()

const pageTitles = {
    '/seller/products': 'Mahsulotlarim',
    '/seller/pending': 'Tasdiqlang',
    '/seller/statistic': 'Statistika',
    '/seller/complaints': 'Shikoyatlar',
    '/seller/deliveries/history': 'Yetkazmalar'
};

const currentTitle = computed(() => pageTitles[route.path] || 'Sahifa');

const isMobile = ref(false);
const checkScreen = () => {
    isMobile.value = window.innerWidth <= 768;
};

onMounted(() => {
    checkScreen();
    window.addEventListener('resize', checkScreen);
});

onBeforeUnmount(() => {
    window.removeEventListener('resize', checkScreen);
});
</script>

<template>
    <a-layout style="min-height: 100vh; background-color: #fff !important;">
        <a-layout-sider v-if="!isMobile" :style="{ backgroundColor: '#f8edeb' }" collapsible :collapsed="collapsed"
            @collapse="val => collapsed = val" width="250" :trigger="collapsed ? h(IconArrowRight) : h(IconArrowLeft)">
            <div @click="router.push({ name: 'Mahsulotlar' })" class="logo">
                <template v-if="!collapsed">
                    <span class="text-white text-[24px] font-bold">TexnoBazaar</span>
                    <img class="!rounded-[50%]" width="42" height="42" src="/icon.png" alt="logo" />
                </template>
                <template v-else>
                    <img class="!rounded-[50%]" width="42" height="42" src="/icon.png" alt="logo" />
                </template>
            </div>

            <a-menu class="!bg-white !shadow-md" mode="inline" :selectedKeys="[route.path]"
                style="height: 100%; border-right: 0;" :inlineCollapsed="collapsed">
                <a-menu-item key="/seller/products" class="custom-menu-item">
                    <router-link to="/seller/products" class="flex items-center gap-2">
                        <icon-phone-product class="text-[18px]" />
                        <span v-if="!collapsed" class="font-semibold text-[16px]">Mahsulotlarim</span>
                    </router-link>
                </a-menu-item>

                <a-menu-item key="/seller/pending" class="custom-menu-item">
                    <router-link to="/seller/pending" class="flex items-center gap-2">
                        <icon-confirm />
                        <span v-if="!collapsed" class="font-semibold text-[16px]">Tasdiqlang</span>
                    </router-link>
                </a-menu-item>

                <a-menu-item key="/seller/statistic" class="custom-menu-item">
                    <router-link to="/seller/statistic" class="flex items-center gap-2">
                        <icon-statistic />
                        <span v-if="!collapsed" class="font-semibold text-[16px]">Statistika</span>
                    </router-link>
                </a-menu-item>

                <a-menu-item key="/seller/complaints" class="custom-menu-item">
                    <router-link to="/seller/complaints" class="flex items-center gap-2">
                        <icon-report />
                        <span v-if="!collapsed" class="font-semibold text-[16px]">Shikoyatlar</span>
                    </router-link>
                </a-menu-item>

                <a-menu-item key="/seller/deliveries/history" class="custom-menu-item">
                    <router-link to="/seller/deliveries/history" class="flex items-center gap-2">
                        <icon-delivery />
                        <span v-if="!collapsed" class="font-semibold text-[16px]">Yetkazmalar</span>
                    </router-link>
                </a-menu-item>
            </a-menu>
        </a-layout-sider>

        <div v-else class="bottom-nav">
            <router-link to="/seller/products" class="nav-item" :class="{ active: route.path === '/products' }">
                <icon-phone-product />
            </router-link>
            <router-link to="/seller/pending" class="nav-item" :class="{ active: route.path === '/seller/pending' }">
                <icon-rating />
            </router-link>
            <router-link to="/seller/statistic" class="nav-item" :class="{ active: route.path === '/statistic' }">
                <icon-statistic />
            </router-link>
            <router-link to="/seller/complaints" class="nav-item" :class="{ active: route.path === '/complaints' }">
                <icon-report />
            </router-link>
            <router-link to="/seller/deliveries/history" class="nav-item"
                :class="{ active: route.path === '/deliveries' }">
                <icon-delivery />
            </router-link>
        </div>

        <a-layout style="background-color: #FF8C00;">
            <a-layout-header class="!bg-[#FF8C00]">
                <div class="!flex justify-between items-start !w-full">
                    <span
                        class="!flex justify-center items-center gap-2 text-[24px] sm:text-[32px] font-bold text-white">
                        <div class="flex justify-center items-center gap-2 !p-3">
                            <button @click="router.push({ name: 'Mahsulotlar' })"
                                class="cursor-pointer !text-[#212529]"><icon-back /></button>
                            <h1 class="!m-0 !p-0 text-white !font-bold">{{ currentTitle }}</h1>
                        </div>
                    </span>
                    <div class="flex justify-center items-center gap-2 !p-4">
                        <notifications-component />
                        <profile-component />
                    </div>
                </div>
            </a-layout-header>

            <a-layout-content style="margin-top: 30px; padding: 24px; background: #fff; min-height: 280px">
                <router-view />
            </a-layout-content>
        </a-layout>
    </a-layout>
</template>

<style>
.logo {
    height: 64px;
    margin: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 6px;
    gap: 10px;
    transition: 450ms ease;
    cursor: pointer;

    &:hover {
        transform: scale(1.1);
    }
}

.ant-layout-sider-children {
    background-color: #FF8C00 !important;
}

.custom-sider {
    background-color: #f8edeb !important;
}

.ant-layout-sider-trigger {
    background-color: #f8edeb !important;
}

.ant-menu-inline-collapsed .ant-menu-item svg {
    width: 24px !important;
    height: 24px !important;
}

.ant-menu-inline-collapsed .ant-menu-item {
    display: flex !important;
    justify-content: center !important;
    align-items: center !important;
    padding: 0 !important;
}

.ant-layout-sider-trigger {
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    height: 40px !important;
    border-top-left-radius: 20px !important;
    border-top-right-radius: 20px !important;
    padding: 0 !important;
    background-color: #FF8C00 !important;
}

.bottom-nav {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    background: #4A4A4A !important;
    padding: 10px 0 !important;
    z-index: 9999;
}

.nav-item {
    color: #aaa;
    font-size: 24px;
    transition: 0.2s;
    padding: 6px;
    border-radius: 25px;
}

.nav-item.active {
    background-color: #4A4A4A;
    transform: scale(1.2);
}
</style>