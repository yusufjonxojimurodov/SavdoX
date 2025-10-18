<script setup>
import { onMounted, computed } from 'vue';
import useBanner from '@/store/banner.pinia';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Mousewheel, Pagination, EffectCoverflow, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';
import { message } from 'ant-design-vue';

const bannerStore = useBanner();

onMounted(() => {
    bannerStore.getBanners();
});

function openProductInfo(url) {
    if (url) {
        window.open(url, '_blank');
    } else {
        message.warn('Mahsulot topilmadi !');
    }
}

const safeBanners = computed(() => {
    const list = bannerStore.banners || [];
    if (list.length >= 3) return list;
    return Array(3).fill(list).flat();
});
</script>

<template>
    <div class="container !mt-5" v-if="safeBanners.length > 0">
        <swiper :modules="[Mousewheel, Pagination, EffectCoverflow, Autoplay]" :mousewheel="{ forceToAxis: true }"
            :grab-cursor="true" :pagination="{ clickable: true }" effect="coverflow" :centered-slides="true"
            :slides-per-view="'auto'" :loop="true" :autoplay="{ delay: 4000, disableOnInteraction: false }"
            :space-between="40" :coverflow-effect="{
                rotate: 0,
                stretch: 0,
                depth: 150,
                modifier: 1.2,
                slideShadows: false,
            }" class="!w-full h-[40%]  sm:!h-[300px] rounded-2xl overflow-visible">
            <swiper-slide v-for="(image, index) in safeBanners" :key="index"
                class="w-[380px] sm:!w-[720px] rounded-2xl transition-transform duration-500">
                <img @click="openProductInfo(image.productUrl)" :src="image.image" alt="Product image"
                    class="w-[100%] h-[100%] sm:w-[680px] sm:h-[300px] cursor-pointer object-cover object-center rounded-2xl" />
            </swiper-slide>
        </swiper>
    </div>
</template>

<style scoped>
:deep(.swiper-slide) {
    opacity: 0.5;
    transform: scale(0.9);
    transition: all 0.5s ease;
}

:deep(.swiper-slide-active) {
    opacity: 1;
    transform: scale(1);
    z-index: 3;
}

:deep(.swiper-pagination) {
    display: none !important;
}
</style>
