<script setup>
import { onMounted, reactive, ref } from 'vue';
import { storeToRefs } from 'pinia';
import useFilterProducts from '../../../../store/filter.products.pinia.js';
import useRegister from '../../../../store/register.pinia.js';
import useProducts from '../../../../store/products.pinia.js';
import IconStar from '../../../../components/icons/IconStar.vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/mousewheel';
import { Mousewheel } from 'swiper/modules';
import useProductInfo from '../../../../store/products.info.pinia.js';
import ProductModalComponent from '../../../../components/ProductModalComponent.vue';
import useComments from '../../../../store/comments.pinia.js';
import IconHappyComponent from '../../../../components/icons/reactions/IconHappyComponent.vue';
import IconSadComponent from '../../../../components/icons/reactions/IconSadComponent.vue';

const productInfo = useProductInfo()
const googleFilterproductsStore = useFilterProducts()
const commentsStore = useComments()
const registerStore = useRegister()
const productsStore = useProducts()
const { products } = storeToRefs(productsStore)
const modalOpen = ref(false)

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
    modalOpen.value = true
}
</script>

<template>
    <section>
        <a-spin size="large" :spinning="googleFilterproductsStore.loader">
            <div class="container">
                <template v-if="googleFilterproductsStore.googleProducts.length > 0">
                    <swiper :modules="[Mousewheel]" slides-per-view="auto" :space-between="20"
                        :mousewheel="{ forceToAxis: true }" :grab-cursor="true" class="!mt-6">
                        <swiper-slide v-for="product in googleFilterproductsStore.googleProducts" :key="product._id"
                            class="!w-[300px]">
                            <div @click="getProduct(product._id)" class="product transition duration-500 bg-[#1E1E1E]
               flex flex-col justify-between
               !p-3 sm:!p-5 md:!p-6 relative
               !rounded-[30px] md:!rounded-[30px]
               shadow-[0_4px_12px_rgba(0,0,0,0.6)]
               !h-[500px] sm:!h-[520px] md:!h-[550px] cursor-pointer">

                                <img :src="product.image" alt="Mahsulot rasmi"
                                    class="w-full !h-60 sm:!h-72 md:!h-80 object-contain rounded-2xl transition duration-500" />
                                <div v-if="product.discount"
                                    class="w-[60px] flex justify-center items-center !p-4 bg-red-700 absolute top-0 right-0 rounded-tr-[30px] rounded-bl-[30px]">
                                    <p class="text-white font-semibold text-[16px]">{{ product.discount }}%</p>
                                </div>

                                <div class="flex flex-col gap-2 sm:gap-3">
                                    <p class="text-[16px] sm:text-[20px] md:text-[24px] text-[#EAEAEA] font-semibold">{{
                                        product.name }}</p>
                                    <div class="flex justify-between items-center">
                                        <div class="flex items-center gap-2">
                                            <p :class="[
                                                'text-[14px] sm:text-[16px] md:text-[18px] rounded-[10px] font-semibold',
                                                product.discountPrice ? '!line-through !opacity-80 text-gray-400' : 'text-[#FFD700]'
                                            ]">{{ product.price }}$</p>
                                            <p v-if="product.discountPrice"
                                                class="text-[14px] sm:text-[16px] md:text-[18px] text-[#FFD700] font-semibold">
                                                {{ product.discountPrice }}$</p>
                                        </div>
                                        <p class="text-gray-400 font-semibold text-[16px]">{{ product.createdBy.userName
                                            }}</p>
                                    </div>
                                    <p class="text-[#B0B0B0] text-[12px] sm:text-[13px] md:text-[14px]">
                                        {{ product.description.slice(0, 80) }}
                                        <router-link to="/dashboard"
                                            class="!text-[#c1c1c1] text-medium text-[12px] sm:text-[13px] md:text-[14px]">Batafsil...</router-link>
                                    </p>
                                </div>

                                <div class="flex flex-col gap-2 !mt-5">
                                    <div class="flex justify-between items-center">
                                        <div class="flex items-center gap-2">
                                            <p
                                                class="flex items-center gap-2 text-[#FFD700] font-medium text-[12px] sm:text-[14px]">
                                                <icon-happy-component class="fill-[#FFD700]" /> {{ product.rating.happy
                                                }}%
                                            </p>
                                            <p
                                                class="flex items-center gap-2 text-red-500 font-medium text-[12px] sm:text-[14px]">
                                                <icon-sad-component class="fill-red-500" /> {{ product.rating.unhappy
                                                }}%
                                            </p>
                                        </div>
                                        <p class="text-[#888] font-medium text-[12px] sm:text-[14px]">{{ product.model
                                            }}</p>
                                    </div>

                                    <a-button :disabled="product.left === 0" :loading="buttonLoaders[product._id]"
                                        @click.stop="basket(product._id)"
                                        class="w-full !text-[12px] sm:!text-[14px] md:!text-[16px]" size="large"
                                        type="primary">
                                        Savatga ({{ product.left || "0" }} ta qoldi)
                                    </a-button>
                                </div>
                            </div>
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
