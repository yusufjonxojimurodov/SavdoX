<script setup>
import { onMounted, reactive } from 'vue';
import { storeToRefs } from 'pinia';
import { axiosInstance } from '../../../../utils/api/api.js';
import useFilterProducts from '../../../../store/filter.products.pinia.js';
import useRegister from '../../../../store/register.pinia.js';
import useProducts from '../../../../store/products.pinia.js';
import IconStar from '../../../../components/icons/IconStar.vue';

import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/mousewheel';
import { Mousewheel } from 'swiper/modules';

const iphoneFilterproductsStore = useFilterProducts()
const registerStore = useRegister()
const productsStore = useProducts()
const { products } = storeToRefs(productsStore)

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
</script>

<template>
    <div class="container">
        <template v-if="iphoneFilterproductsStore.iphoneProducts.length > 0">
            <swiper :modules="[Mousewheel]" slides-per-view="auto" :space-between="20"
                :mousewheel="{ forceToAxis: true }" :grab-cursor="true" class="!mt-6">
                <swiper-slide v-for="product in iphoneFilterproductsStore.iphoneProducts" :key="product._id"
                    class="!w-[300px]">
                    <div class="product transition duration-500 bg-[#1E1E1E]
                        w-full
                        h-auto md:h-[430px] md:!w-[300px]
                        cursor-pointer flex flex-col
                        gap-4 sm:gap-6
                        !p-3 sm:!p-5 md:p-[20px]
                        rounded-[20px] md:rounded-[30px]
                        shadow-[0_4px_12px_rgba(0,0,0,0.6)]">
                        <img :src="axiosInstance.defaults.baseURL + product.image" alt="Mahsulot rasmi"
                            class="w-full h-[200px] sm:h-[150px] md:h-[180px] rounded-2xl transition duration-500 object-cover" />
                        <div class="flex flex-col w-full gap-2 sm:gap-3">
                            <p class="text-[16px] sm:text-[20px] md:text-[24px] text-[#EAEAEA] font-semibold">
                                {{ product.name }}
                            </p>
                            <p
                                class="text-[14px] sm:text-[16px] md:text-[18px] text-[#FFD700] w-[70px] rounded-[10px] font-semibold">
                                {{ product.price }}$
                            </p>
                            <p class="text-[12px] sm:text-[13px] md:text-[14px] text-[#B0B0B0]">
                                {{ product.description.slice(0, 80) }}
                                <router-link to="/dashboard"
                                    class="text-[12px] sm:text-[13px] md:text-[14px] !text-[#c1c1c1] text-medium">Batafsil...</router-link>
                            </p>
                            <div class="flex justify-between items-center w-full">
                                <div class="flex items-center gap-1 sm:gap-2 w-full">
                                    <p class="text-[12px] sm:text-[14px] text-[#FFD700] font-medium">4.6</p>
                                    <icon-star class="w-3 h-3 sm:w-4 sm:h-4" />
                                </div>
                                <p class="text-[12px] sm:text-[14px] text-[#888] font-medium">
                                    {{ product.model }}
                                </p>
                            </div>

                            <a-button :loading="buttonLoaders[product._id]" @click="basket(product._id)"
                                class="w-full !text-[12px] sm:!text-[14px] md:!text-[16px]" size="large" type="primary">
                                Savatga ({{ product.left || "topilmadi" }} ta qoldi)
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
</template>

<style>
.product:hover {
    background-color: #252525;

    img {
        transform: scale(1.05);
    }
}
</style>
