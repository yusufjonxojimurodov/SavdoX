<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/mousewheel';
import 'swiper/css/pagination';
import { Mousewheel, Pagination } from 'swiper/modules';
import { formatPrice } from '@/utils/format.js'
import useImage from '../store/image.pinia';
import ImageComponent from './BaseComponents/ImageComponent.vue';
import IconBasket from './icons/IconBasket.vue';
import { ref } from 'vue';

const imageStore = useImage()

const windowWidth = ref(window.innerWidth)

const props = defineProps({
    product: Object,
    buttonLoading: Boolean
})

defineEmits(['select', 'add-to-basket'])
</script>

<template>
    <div class="product !w-[100%] relative !transition duration-500  bg-white shadow-md !mb-2 !flex flex-col !justify-between !p-3 sm:!p-5 md:!p-6 !rounded-[30px] md:!rounded-[30px] !mt-4 cursor-pointer !h-[375px] sm:!h-[500px]"
        @click="$emit('select', product.id)">
        <swiper :mousewheel="{ forceToAxis: true }" :grab-cursor="true" :modules="[Mousewheel, Pagination]"
            :pagination="{ clickable: true }" class="w-full !h-[170px] sm:!h-[240px] rounded-2xl">
            <swiper-slide v-for="(image, index) in imageStore.urls[product.id] || [' ']" :key="index"
                class="flex justify-center items-center">
                <image-component :image="image || ''" :product="product"
                    class="object-contain !w-full !h-full transition duration-300 rounded-2xl" />
            </swiper-slide>
        </swiper>

        <div v-if="product.discount"
            class="w-[60px] z-[999] flex justify-center items-center !p-4 bg-[#FF8C00] absolute top-0 right-0 rounded-tr-[30px] rounded-bl-[30px]">
            <p class="text-white !font-semibold text-[16px]">-{{ product.discount }}%</p>
        </div>

        <div class="!flex flex-col !gap-2 sm:!gap-3 mb-2!">
            <p class="text-[15px] sm:text-[20px] md:text-[24px] text-[#212529] !font-semibold">{{ product.name }}
            </p>

            <div class="flex justify-between items-center">
                <div class="flex items-center gap-2">
                    <p :class="[
                        'text-[14px] sm:text-[16px] md:text-[18px] !font-semibold',
                        product.discount_price !== product.price
                            ? '!line-through !opacity-80 text-[#53718f]'
                            : 'text-[#34495E]'
                    ]">
                        {{ formatPrice(product.price) }}$
                    </p>
                    <p v-if="product.discount_price !== product.price"
                        class="text-[#34495E] text-[14px] sm:text-[16px] md:text-[18px] !font-semibold">
                        {{ formatPrice(product.discount_price) }}$
                    </p>
                </div>
            </div>

            <div>
                <p class="text-[#343A40] break-words text-[10px] sm:text-[14px] md:text-[14px]">
                    {{ product.description.slice(0, 80) }} <span
                        class="!text-[#6C757D] text-medium text-[10px] sm:text-[14px] md:text-[14px]">
                        Batafsil...</span>
                </p>
            </div>

            <div class="flex justify-between items-center w-full flex-wrap">
                <div class="flex items-center gap-1 sm:gap-2">
                    <p
                        class="flex justify-center items-center gap-1 md:gap-2 text-[#FF8C00] text-[11px] sm:text-[16px] !font-semibold">
                        <img class="h-[22px] md:w-[30px] md:h-[30px]" src="../assets/images/happy-icon.svg"
                            alt="happy-icon"> {{
                                product.happy }}%
                    </p>
                    <p
                        class="flex justify-center items-center gap-1 md:gap-2  text-red-500 text-[11px] sm:text-[16px] !font-semibold">
                        <img class="h-[22px] md:w-[30px] md:h-[30px]" src="../assets/images/sad-icon.svg"
                            alt="sad-icon"> {{
                                product.unhappy }}%
                    </p>
                </div>
                <p class="text-[#888] text-[12px] sm:text-[14px] font-medium">{{ product.model ===
                    "Other" ? "Boshqalar" : product.model }}</p>
            </div>
        </div>

        <a-button :disabled="product.left_count === 0" :loading="buttonLoading"
            @click.stop="$emit('add-to-basket', product)"
            class="basketGo w-full! flex! justify-center! items-center! !text-[12px] sm:!text-[14px] md:!text-[16px]"
            :size="windowWidth <= 450 ? 'middle' : 'large'" type="primary">
            <template #icon>
                <icon-basket class="w-5 h-5" />
                {{ product.left_count || "0" }} ta mavjud
            </template>
        </a-button>
    </div>
</template>

<style scoped>
.product:hover img {
    transform: scale(1.05);
}

.ant-image-preview-operations span {
    background-color: #fff !important;
    border-radius: 4px;
    color: #000 !important;
    padding: 2px;
}

:deep(.basketGo[disabled]) {
    opacity: 0.7 !important;
    cursor: not-allowed !important;
}

:deep(.swiper-pagination-bullet) {
    background: #ccc !important;
    opacity: 1 !important;
    width: 10px;
    height: 10px;
}

:deep(.swiper-pagination-bullet-active) {
    background: #ff8c00 !important;
    width: 12px;
    height: 12px;
}
</style>