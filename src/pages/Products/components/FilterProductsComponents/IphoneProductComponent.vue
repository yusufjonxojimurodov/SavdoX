<script setup>
import { onMounted } from 'vue';
import useFilterProducts from '@/store/filter.products.pinia.js';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/mousewheel';
import { Mousewheel } from 'swiper/modules';
import useComments from '@/store/comments.pinia.js';
import useProductInfo from '@/store/products.info.pinia.js';
import ProductComponent from '@/components/ProductComponent.vue';
import { useRouter } from 'vue-router';
import ProductSkeletonComponent from '@/components/ProductSkeletonComponent.vue';
import { addBasket, buttonLoader } from '@/utils/helpers/add.basket';

const productInfoStore = useProductInfo()
const commentsStore = useComments()
const iphoneFilterproductsStore = useFilterProducts()
const router = useRouter()

onMounted(() => {
    iphoneFilterproductsStore.getIphoneProducts()
})

function getProduct(id) {
    productInfoStore.getProductInfo(id)
    commentsStore.getComments(id)
    router.push({
        name: "ProductInfo",
        query: { productId: id }
    })
}
</script>

<template>
    <section>
        <div v-if="!iphoneFilterproductsStore.loader" class="container">
            <template v-if="iphoneFilterproductsStore.iphoneProducts.length > 0">
                <swiper :breakpoints="{
                    385: { spaceBetween: 4 },
                    768: { spaceBetween: 20 },
                    1024: { spaceBetween: 25 }
                }" :modules="[Mousewheel]" slides-per-view="auto" :space-between="20"
                    :mousewheel="{ forceToAxis: true }" :grab-cursor="true" class="!mt-6">
                    <swiper-slide v-for="product in iphoneFilterproductsStore.iphoneProducts" :key="product.id"
                        class="sm:!w-[300px] !w-[180px]">
                        <product-component :button-loading="buttonLoader[product.id]" :product="product"
                            @select="getProduct" @add-to-basket="() => addBasket(product)" />
                    </swiper-slide>
                </swiper>
            </template>

            <template v-else>
                <a-empty description="Mahsulotlar topilmadi" style="color: #212529; margin-top: 150px" />
            </template>
        </div>
        <product-skeleton-component v-else />
    </section>
</template>
