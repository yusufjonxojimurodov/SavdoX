<script setup>
import { onMounted, reactive, ref } from 'vue';
import useFilterProducts from '@/store/filter.products.pinia.js';
import useRegister from '@/store/register.pinia.js';
import useProducts from '@/store/products.pinia.js';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/mousewheel';
import { Mousewheel } from 'swiper/modules';
import useComments from '@/store/comments.pinia.js';
import useProductInfo from '@/store/products.info.pinia.js';
import ProductComponent from '@/components/ProductComponent.vue';
import useQueryParams from '@/composables/useQueryParams';
import { useRouter } from 'vue-router';

const productInfoStore = useProductInfo()
const commentsStore = useComments()
const iphoneFilterproductsStore = useFilterProducts()
const registerStore = useRegister()
const productsStore = useProducts()
const { setQueries } = useQueryParams()
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
        <a-spin size="large" :spinning="iphoneFilterproductsStore.loader">
            <div class="container">
                <template v-if="iphoneFilterproductsStore.iphoneProducts.length > 0">
                    <swiper :breakpoints="{
                        385: { spaceBetween: 4 },
                        768: { spaceBetween: 20 },
                        1024: { spaceBetween: 25 }
                    }" :modules="[Mousewheel]" slides-per-view="auto" :space-between="20"
                        :mousewheel="{ forceToAxis: true }" :grab-cursor="true" class="!mt-6">
                        <swiper-slide v-for="product in iphoneFilterproductsStore.iphoneProducts" :key="product._id"
                            class="sm:!w-[300px] !w-[180px]">
                            <product-component :button-loading="buttonLoaders[product._id]" :product="product"
                                @select="getProduct" @add-to-basket="basket" />
                        </swiper-slide>
                    </swiper>
                </template>

                <template v-else>
                    <a-empty description="Mahsulotlar topilmadi" style="color: #212529; margin-top: 150px" />
                </template>
            </div>
        </a-spin>

    </section>
</template>
