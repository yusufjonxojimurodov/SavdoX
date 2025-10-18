<script setup>
import { onMounted, reactive, ref } from 'vue';
import useFilterProducts from '@/store/filter.products.pinia.js';
import useRegister from '@/store/register.pinia.js';
import useProducts from '@/store/products.pinia.js';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/mousewheel';
import { Mousewheel } from 'swiper/modules';
import useProductInfo from '@/store/products.info.pinia.js';
import useComments from '@/store/comments.pinia.js';
import ProductComponent from '@/components/ProductComponent.vue';
import useQueryParams from '@/composables/useQueryParams';
import { useRouter } from 'vue-router';
import ProductSkeletonComponent from '@/components/ProductSkeletonComponent.vue';

const productInfo = useProductInfo()
const googleFilterproductsStore = useFilterProducts()
const commentsStore = useComments()
const registerStore = useRegister()
const { setQueries } = useQueryParams()
const productsStore = useProducts()
const router = useRouter()

const buttonLoaders = reactive({})

async function basket(id) {
    if (registerStore.user === "") {
        registerStore.openModal()
    } else {
        buttonLoaders[id] = true
        try {
            await productsStore.basketProduct({
                productId: id,
                quantity: 1
            })
        } finally {
            buttonLoaders[id] = false
        }
    }
}

onMounted(() => {
    googleFilterproductsStore.getGoogleProducts()
})

function getProduct(id) {
    productInfo.getProductInfo(id)
    commentsStore.getComments(id)
    router.push({
        name: "ProductInfo",
        query: { productId: id }
    })
}
</script>

<template>
    <section>
        <div v-if="!googleFilterproductsStore.loader" class="container">
            <template v-if="googleFilterproductsStore.googleProducts.length > 0">
                <swiper :breakpoints="{
                    385: { spaceBetween: 4 },
                    768: { spaceBetween: 20 },
                    1024: { spaceBetween: 25 }
                }" :modules="[Mousewheel]" slides-per-view="auto" :space-between="20"
                    :mousewheel="{ forceToAxis: true }" :grab-cursor="true" class="!mt-6">
                    <swiper-slide v-for="product in googleFilterproductsStore.googleProducts" :key="product._id"
                        class="sm:!w-[300px] !w-[180px]">
                        <product-component :product="product" :button-loading="buttonLoaders[product._id]"
                            @select="getProduct" @add-to-basket="basket" />
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