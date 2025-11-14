<script setup>
import { onMounted } from 'vue';
import useBuyyedProduct from '@/store/buyyed.pinia.js';
import useProductInfo from '@/store/products.info.pinia';
import useComments from '@/store/comments.pinia';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/mousewheel';
import 'swiper/css/pagination';
import { Mousewheel, Pagination } from 'swiper/modules';
import { formatPrice } from '@/utils/format.js'
import ProductSkeletonComponent from '@/components/ProductSkeletonComponent.vue';
import { useRouter } from 'vue-router';
import ImageComponent from '@/components/BaseComponents/ImageComponent.vue';
import useImage from '@/store/image.pinia';

const buyyedProductStore = useBuyyedProduct()
const productsInfoStore = useProductInfo()
const commentsStore = useComments()
const imageStore = useImage()
const router = useRouter()

onMounted(async () => {
    await buyyedProductStore.getBuyyedProduct()
})

function getProduct(id, deleted) {
    if (!deleted) {
        productsInfoStore.getProductInfo(id)
        commentsStore.getComments(id)
        router.push({
            name: "ProductInfo",
            query: { productId: id }
        })
    }
}
</script>

<template>
    <section>
        <div class="container">
            <template v-if="buyyedProductStore.buyyedProduct.length > 0">
                <div class="grid gap-4 sm:gap-6 !mt-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    <div @click="getProduct(product.product_id, product.product_deleted)"
                        v-for="product in buyyedProductStore.buyyedProduct" :key="product.id" class="product transition duration-500 bg-white
                w-full !relative
                h-[435px] sm:h-[500px] md:!w-[300px]
                cursor-pointer flex flex-col
                gap-4 sm:gap-6
                !p-3 sm:!p-5 md:p-[20px]
                rounded-[30px] md:rounded-[30px]
                shadow-md">
                        <swiper :mousewheel="{ forceToAxis: true }" :grab-cursor="true"
                            :modules="[Mousewheel, Pagination]" :pagination="{ clickable: true }"
                            class="w-full !h-[170px] sm:!h-[240px] rounded-2xl">
                            <swiper-slide v-for="(image, index) in imageStore.urls[product.product_id] || [' ']"
                                :key="index" class="flex justify-center items-center">
                                <image-component :view="false" :image="image" :product="product"
                                    class="object-contain w-full h-full transition duration-300 rounded-2xl" />
                            </swiper-slide>
                        </swiper>
                        <div class="flex flex-col w-full gap-2 sm:gap-3">
                            <div v-if="product.discount"
                                class="w-[60px] flex justify-center items-center !p-4 bg-[#FF8C00] absolute top-0 right-0 z-10 rounded-tr-[30px] rounded-bl-[30px]">
                                <p class="text-white !font-semibold text-[16px]">-{{ product.discount }}%
                                </p>
                            </div>

                            <div class="!flex flex-col !gap-2 sm:!gap-3 !flex-1">
                                <p class="text-[16px] sm:text-[20px] md:text-[24px] text-[#212529] !font-semibold">
                                    {{ product.product_name }}</p>

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
                                    <p v-if="!product.product_deleted"
                                        class="text-[#343A40] break-words text-[14px] sm:text-[13px] md:text-[14px]">
                                        {{ product.product_description.slice(0, 80) }} <span
                                            class="!text-[#6C757D] text-medium text-[12px] sm:text-[13px] md:text-[14px]">
                                            Batafsil...</span>
                                    </p>
                                    <p v-else>Mahsulot sotuvchi tomonidan o'chirilgan</p>
                                </div>
                            </div>

                            <div class="flex justify-between items-center w-full">
                                <p class="text-[#888] text-[12px] sm:text-[14px] font-medium">{{ product.address }}
                                </p>

                                <p class="text-[12px] sm:text-[14px] text-[#888] font-medium">Olinmoqda: {{
                                    product.quantity }} ta</p>
                            </div>
                            <a-button @click.stop class="!mt-2"
                                :class="product.status === 'pending' ? '!bg-[#ff8c00]' : product.status === 'completed' ? '!bg-[#FF8C00]' : product.status === 'incompleted' ? '!bg-red-700' : '!bg-gray-600'"
                                size="large" type="primary">
                                {{ product.status === "pending" ? "Yetkazilyapti" : product.status === 'completed' ?
                                    'Yetkazilgan' : product.status === 'incompleted' ? 'Yetkazilmagan' : "Topilmadi" }}
                            </a-button>
                        </div>
                    </div>
                </div>
            </template>

            <template v-else-if="!buyyedProductStore.loader">
                <a-empty description="Mahsulotlar topilmadi" style="color: #212529; margin-top: 150px" />
            </template>
        </div>

        <product-skeleton-component v-if="buyyedProductStore.loader" />
    </section>
</template>

<style scoped>
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