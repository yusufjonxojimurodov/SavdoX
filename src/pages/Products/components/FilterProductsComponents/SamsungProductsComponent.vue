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
import { useRouter } from 'vue-router';

const productStore = useProductInfo()
const commentsStore = useComments()
const samsungProductsStore = useFilterProducts()
const registerStore = useRegister()
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
        <a-spin size="large" :spinning="samsungProductsStore.loader">
            <div class="container">
                <template v-if="samsungProductsStore.samsungProducts.length > 0">
                    <swiper :modules="[Mousewheel]" slides-per-view="auto" :space-between="20"
                        :mousewheel="{ forceToAxis: true }" :breakpoints="{
                            385: { spaceBetween: 4 },
                            768: { spaceBetween: 20 },
                            1024: { spaceBetween: 25 }
                        }" :grab-cursor="true" class="!mt-6">
                        <swiper-slide v-for="product in samsungProductsStore.samsungProducts" :key="product._id"
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