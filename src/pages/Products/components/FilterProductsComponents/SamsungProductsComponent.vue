<script setup>
import { onMounted } from 'vue';
import useFilterProducts from '@/store/filter.products.pinia.js';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/mousewheel';
import { Mousewheel } from 'swiper/modules';
import useProductInfo from '@/store/products.info.pinia.js';
import useComments from '@/store/comments.pinia.js';
import ProductComponent from '@/components/ProductComponent.vue';
import { useRouter } from 'vue-router';
import ProductSkeletonComponent from '@/components/ProductSkeletonComponent.vue';
import { addBasket, buttonLoader } from '@/utils/helpers/add.basket';

const productStore = useProductInfo()
const commentsStore = useComments()
const samsungProductsStore = useFilterProducts()
const router = useRouter()

onMounted(() => {
    samsungProductsStore.getSamsungProducts()
})

function getProduct(id) {
    productStore.getProductInfo(id)
    commentsStore.getComments(id)
    router.push({
        name: "ProductInfo",
        query: { productId: id }
    })
}
</script>

<template>
    <section>
        <div v-if="!samsungProductsStore.loader" class="container">
            <template v-if="samsungProductsStore.samsungProducts.length > 0">
                <swiper :modules="[Mousewheel]" slides-per-view="auto" :space-between="20"
                    :mousewheel="{ forceToAxis: true }" :breakpoints="{
                        385: { spaceBetween: 4 },
                        768: { spaceBetween: 20 },
                        1024: { spaceBetween: 25 }
                    }" :grab-cursor="true" class="!mt-6">
                    <swiper-slide v-for="product in samsungProductsStore.samsungProducts" :key="product.id"
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