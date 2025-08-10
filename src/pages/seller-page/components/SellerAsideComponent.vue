<script setup>
import { computed, ref } from 'vue';
import IconPhoneProduct from '../../../components/icons/IconPhoneProduct.vue';
import IconRating from '../../../components/icons/IconRating.vue';
import IconStatistic from '../../../components/icons/IconStatistic.vue';
import IconReport from '../../../components/icons/IconReport.vue';
import ProductsView from './products-page/ProductsView.vue';
import IconBack from '../../../components/icons/IconBack.vue';

const collapsed = ref(false);
const selectedKeys = ref(['1']);
const pageTitles = {
    '1': 'Mahsulotlarim',
    '2': 'Reytingim',
    '3': 'Statistika',
    '4': 'Shikoyatlar'
};

const currentTitle = computed(() => pageTitles[selectedKeys.value[0]] || 'Sahifa');
</script>

<template>
    <a-layout style="min-height: 100vh; background-color: #1e1d1d;">
        <a-layout-sider :style="{ backgroundColor: '#1e1d1d' }" collapsible :collapsed="collapsed"
            @collapse="val => collapsed = val" width="250">
            <div class="logo">
                <span class="text-white text-[24px] font-bold">Savdo X</span>
                <img width="32" height="32" src="/Savdo X.png" alt="logo" />
            </div>

            <a-menu class="!bg-[#1e1d1d]" mode="inline" v-model:selectedKeys="selectedKeys"
                style="height: 100%; border-right: 0;" :inlineCollapsed="collapsed">
                <a-menu-item key="1" class="custom-menu-item">
                    <div class="flex items-center gap-4">
                        <icon-phone-product />
                        <span v-if="!collapsed" class="font-semibold text-[16px]">Mahsulotlarim</span>
                    </div>
                </a-menu-item>

                <a-menu-item key="2" class="custom-menu-item">
                    <div class="flex items-center gap-4">
                        <icon-rating />
                        <span v-if="!collapsed" class="font-semibold text-[16px]">Reytingim</span>
                    </div>
                </a-menu-item>

                <a-menu-item key="3" class="custom-menu-item">
                    <div class="flex items-center gap-4">
                        <icon-statistic />
                        <span v-if="!collapsed" class="font-semibold text-[16px]">Statistika</span>
                    </div>
                </a-menu-item>

                <a-menu-item key="4" class="custom-menu-item">
                    <div class="flex items-center gap-4">
                        <icon-report />
                        <span v-if="!collapsed" class="font-semibold text-[16px]">Shikoyatlar</span>
                    </div>
                </a-menu-item>
            </a-menu>
        </a-layout-sider>

        <a-layout style="background-color: #121212;">
            <a-layout-header style="background-color: #121212; padding: 0 16px; display: flex; align-items: center">
                <span class="!flex justify-center items-center gap-2 text-[32px] !p-[10px] font-bold text-white">
                    <router-link to="/"><icon-back /></router-link> {{ currentTitle }}
                </span>
            </a-layout-header>

            <a-layout-content style="margin: 24px 16px; padding: 24px; background: #121212; min-height: 280px">
                <products-view v-if="selectedKeys[0] === '1'" />
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

/* scoped olib tashlandi */
.ant-layout-sider-children {
    background-color: #1e1d1d !important;
}

.custom-sider {
    background-color: black !important;
}

.ant-layout-sider-trigger {
    background-color: rgb(20, 20, 20) !important;
}
</style>