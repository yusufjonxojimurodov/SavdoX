<script setup>
import { computed, h, onBeforeUnmount, onMounted, ref } from 'vue';
import IconPhoneProduct from '@/components/icons/IconPhoneProduct.vue';
import IconRating from '@/components/icons/IconRating.vue';
import IconStatistic from '@/components/icons/IconStatistic.vue';
import IconReport from '@/components/icons/IconReport.vue';
import ProductsView from './products-page/ProductsView.vue';
import PendingProductSellerView from './pending-products-seller-page/PendingProductSellerView.vue';
import IconBack from '@/components/icons/IconBack.vue';
import ProfileComponent from '@/components/ProfileComponent.vue';
import IconArrowLeft from '@/components/icons/IconArrowLeft.vue';
import IconArrowRight from '@/components/icons/IconArrowRight.vue';
import IconDelivery from '@/components/icons/IconDelivery.vue';
import BuyyedProductsView from './buyyed-products/BuyyedProductsView.vue';
import StatisticView from './statistic-page/StatisticView.vue';
import IconConfirm from '@/components/icons/IconConfirm.vue';
import ComplaintView from './complaint-seller/ComplaintView.vue';

const collapsed = ref(false);
const selectedKeys = ref(['1']);
const pageTitles = {
    '1': 'Mahsulotlarim',
    '2': 'Tasdiqlang',
    '3': 'Statistika',
    '4': 'Shikoyatlar',
    '5': 'Yetkazmalar'
};

const currentTitle = computed(() => pageTitles[selectedKeys.value[0]] || 'Sahifa');

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
    <a-layout style="min-height: 100vh; background-color: #f8edeb !important;">
        <a-layout-sider v-if="!isMobile" :style="{ backgroundColor: '#f8edeb' }" collapsible :collapsed="collapsed"
            @collapse="val => collapsed = val" width="250" :trigger="collapsed ? h(IconArrowRight) : h(IconArrowLeft)">
            <div class="logo">
                <template v-if="!collapsed">
                    <span class="text-white text-[24px] font-bold">TexnoBazaar</span>
                    <img class="!rounded-[50%]" width="42" height="42" src="/icon.png" alt="logo" />
                </template>
                <template v-else>
                    <img class="!rounded-[50%]" width="42" height="42" src="/icon.png" alt="logo" />
                </template>
            </div>

            <a-menu class="!bg-[#f8edeb]" mode="inline" v-model:selectedKeys="selectedKeys"
                style="height: 100%; border-right: 0;" :inlineCollapsed="collapsed">
                <a-menu-item key="1" class="custom-menu-item">
                    <div class="flex items-center gap-2">
                        <icon-phone-product class="text-[18px]" />
                        <span v-if="!collapsed" class="font-semibold text-[16px]">
                            Mahsulotlarim
                        </span>
                    </div>
                </a-menu-item>

                <a-menu-item key="2" class="custom-menu-item">
                    <div class="flex items-center gap-2">
                        <icon-confirm />
                        <span v-if="!collapsed" class="font-semibold text-[16px]">
                            Tasdiqlang
                        </span>
                    </div>
                </a-menu-item>
                <a-menu-item key="3" class="custom-menu-item">
                    <div class="flex items-center gap-2">
                        <icon-statistic />
                        <span v-if="!collapsed" class="font-semibold text-[16px]">
                            Statistika
                        </span>
                    </div>
                </a-menu-item>
                <a-menu-item key="4" class="custom-menu-item">
                    <div class="flex items-center gap-2">
                        <icon-report />
                        <span v-if="!collapsed" class="font-semibold text-[16px]">
                            Shikoyatlar
                        </span>
                    </div>
                </a-menu-item>
                <a-menu-item key="5" class="custom-menu-item">
                    <div class="flex items-center gap-2">
                        <icon-delivery />
                        <span v-if="!collapsed" class="font-semibold text-[16px]">
                            Yetkazmalar
                        </span>
                    </div>
                </a-menu-item>
            </a-menu>
        </a-layout-sider>
        <div v-else class="bottom-nav">
            <div class="nav-item" :class="{ active: selectedKeys[0] === '1' }" @click="selectedKeys = ['1']">
                <icon-phone-product />
            </div>
            <div class="nav-item" :class="{ active: selectedKeys[0] === '2' }" @click="selectedKeys = ['2']">
                <icon-rating />
            </div>
            <div class="nav-item" :class="{ active: selectedKeys[0] === '3' }" @click="selectedKeys = ['3']">
                <icon-statistic />
            </div>
            <div class="nav-item" :class="{ active: selectedKeys[0] === '4' }" @click="selectedKeys = ['4']">
                <icon-report />
            </div>
            <div class="nav-item" :class="{ active: selectedKeys[0] === '5' }" @click="selectedKeys = ['5']">
                <icon-delivery />
            </div>
        </div>

        <a-layout style="background-color: #fcc98c;">
            <a-layout-header style="background-color: #fcc98c; margin-top: 50px;">
                <div class="!flex justify-between items-start !w-full">
                    <span
                        class="!flex justify-center items-center gap-2 text-[24px] sm:text-[32px] font-bold text-white">
                        <div class="flex justify-center items-center gap-2">
                            <router-link to="/" class="!text-[#212529]"><icon-back /></router-link>
                            <h1 class="!m-0 !p-0 text-[#212529] !font-bold">{{ currentTitle }}</h1>
                        </div>
                    </span>
                    <profile-component />
                </div>
            </a-layout-header>

            <a-layout-content style="margin: 24px 16px; padding: 24px; background: #fcc98c; min-height: 280px">
                <products-view v-if="selectedKeys[0] === '1'" />
                <pending-product-seller-view v-if="selectedKeys[0] === '2'" />
                <statistic-view v-if="selectedKeys[0] === '3'" />
                <complaint-view v-if="selectedKeys[0] === '4'" />
                <buyyed-products-view v-if="selectedKeys[0] === '5'" />
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