<script setup>
import useProducts from '@/store/products.pinia';
import { storeToRefs } from 'pinia';
import { Swiper, SwiperSlide } from 'swiper/vue';
import ProductComponent from '@/components/ProductComponent.vue';
import 'swiper/css';
import 'swiper/css/mousewheel';
import { Mousewheel } from 'swiper/modules';
import useProductInfo from '@/store/products.info.pinia';
import useComments from '@/store/comments.pinia';
import { useRouter } from 'vue-router';
import ProductSkeletonComponent from '@/components/ProductSkeletonComponent.vue';
import { addBasket, buttonLoader } from '@/utils/helpers/add.basket';

const commentsStore = useComments()
const productsInfoStore = useProductInfo()
const productsStore = useProducts()
const { products } = storeToRefs(productsStore)
const router = useRouter()

function getProduct(id) {
    productsInfoStore.getProductInfo(id)
    commentsStore.getComments(id)
    router.push({
        name: "ProductInfo",
        query: { productId: id }
    })
}
</script>

<template>
    <section>
        <div v-if="!productsStore.loader" class="container">
            <template v-if="products.length > 0">
                <swiper :modules="[Mousewheel]" slides-per-view="auto" :space-between="20" :breakpoints="{
                    385: { spaceBetween: 8 },
                    768: { spaceBetween: 20 },
                    1024: { spaceBetween: 25 }
                }" :mousewheel="{ forceToAxis: true }" :grab-cursor="true" :allow-touch-move="true" class="!mt-6">
                    <swiper-slide v-for="product in products" :key="product.id" class="sm:!w-[300px] !w-[180px]">
                        <product-component :product="product" :button-loading="buttonLoader[product.id]"
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