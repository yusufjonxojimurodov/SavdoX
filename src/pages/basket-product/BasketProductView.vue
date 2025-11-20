<script setup>
import BasketProductComponent from './components/BasketProductComponent.vue';
import HeaderComponent from '@/components/HeaderComponent.vue';
import FooterComponent from '@/components/FooterComponent.vue';
import WarningModalComponent from '@/components/WarningModalComponent.vue';
import AuthDrawerView from '../auth/AuthDrawerView.vue';
import SectionNameComponent from '@/components/SectionNameComponent.vue';
import IconBack from '@/components/icons/IconBack.vue';
import { ref } from 'vue';

const openBasketCard = ref(false)
const screenWidth = ref(window.innerWidth)
</script>

<template>
    <header-component />
    <main>
        <div class="container">
            <section-name-component title="Savatchangiz" :openBack="true" :back="'Products'">
                <basket-product-component v-model:open="openBasketCard" />
            </section-name-component>
        </div>
    </main>
    <footer-component />

    <auth-drawer-view />
    <warning-modal-component />
    <a-button v-if="!openBasketCard && screenWidth < 1200" type="primary" @click="openBasketCard = true"
        class="basket-toggle-btn !flex xs:!hidden !rounded-none !justify-center !items-center !w-[40px] z-9999 !rounded-tr-[30px] !rounded-br-[30px] !fixed !left-0 !top-1/2">
        <template #icon>
            <icon-back class="!w-7 !h-7 !text-white rotate-[180deg]" />
        </template>
    </a-button>
</template>

<style scoped>
.basket-toggle-btn {
    animation: slideAndStretch 2s ease-in-out infinite !important;
    overflow: hidden !important;
}

@keyframes slideAndStretch {

    0%,
    100% {
        transform: scaleX(1);
        transform-origin: left;
    }

    50% {
        transform: scaleX(1.2);
        transform-origin: left;
    }
}

.basket-toggle-btn:hover {
    animation-play-state: paused !important;
}
</style>
