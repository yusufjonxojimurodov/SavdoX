<script setup>
import { reactive, ref } from 'vue';
import useProducts from '@/store/products.pinia';
import { storeToRefs } from 'pinia';
import useRegister from '@/store/register.pinia';
import { Swiper, SwiperSlide } from 'swiper/vue';
import ProductComponent from '@/components/ProductComponent.vue';
import 'swiper/css';
import 'swiper/css/mousewheel';
import { Mousewheel } from 'swiper/modules';
import ProductModalComponent from '@/components/ProductModalComponent.vue';
import useProductInfo from '@/store/products.info.pinia';
import useComments from '@/store/comments.pinia';

const commentsStore = useComments()
const productsInfoStore = useProductInfo()
const registerStore = useRegister()
const productsStore = useProducts()
const { products } = storeToRefs(productsStore)

const modalOpen = ref(false)
const buttonLoaders = reactive({})

async function basket(id) {
    if (registerStore.user === "") {
        registerStore.openModal()
        return
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

function getProduct(id) {
    productsInfoStore.getProductInfo(id)
    commentsStore.getComments(id)
    modalOpen.value = true
}
</script>

<template>
    <section>
        <a-spin size="large" :spinning="productsStore.loader">
            <div class="container">
                <template v-if="products.length > 0">
                    <swiper :modules="[Mousewheel]" slides-per-view="auto" :space-between="20"
                        :mousewheel="{ forceToAxis: true }" :grab-cursor="true" :allow-touch-move="true" class="!mt-6">
                        <swiper-slide v-for="product in products" :key="product._id" class="!w-[300px]">
                            <product-component :product="product" :button-loading="buttonLoaders[product._id]"
                                @select="getProduct" @add-to-basket="basket" />
                        </swiper-slide>
                    </swiper>
                </template>

                <template v-else>
                    <a-empty description="Mahsulotlar topilmadi" style="color: white; margin-top: 150px" />
                </template>
            </div>
        </a-spin>

        <product-modal-component :open="modalOpen" @update:open="val => modalOpen = val" />
    </section>
</template>

<style>
.product:hover {
    background-color: #252525;

    img {
        transform: scale(1.05);
    }
}
</style>