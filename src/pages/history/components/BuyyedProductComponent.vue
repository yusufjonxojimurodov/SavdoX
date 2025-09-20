<script setup>
import { onMounted } from 'vue';
import useRegister from '../../../store/register.pinia.js';
import IconTimeProduct from '../../../components/icons/IconTimeProduct.vue';
import useBuyyedProduct from '../../../store/buyyed.pinia.js';

const buyyedProductStore = useBuyyedProduct()
const registerStore = useRegister()

onMounted(() => {
    buyyedProductStore.getBuyyedProduct()
    registerStore.userInfo()
})
</script>

<template>
    <section>
        <a-spin :spinning="buyyedProductStore.loader" size="large" class="!flex justify-center items-center">
            <div class="container">
                <template v-if="buyyedProductStore.buyyedProduct.length > 0">
                    <div class="grid gap-4 sm:gap-6 !mt-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                        <div @click="getProduct(product._id)" v-for="product in buyyedProductStore.buyyedProduct"
                            :key="product._id" class="product transition duration-500 bg-[#1E1E1E]
                w-full
                h-[430px] sm:h-[500px] md:!w-[300px]
                cursor-pointer flex flex-col
                gap-4 sm:gap-6
                !p-3 sm:!p-5 md:p-[20px]
                rounded-[20px] md:rounded-[30px]
                shadow-[0_4px_12px_rgba(0,0,0,0.6)]">
                            <img :src="product.productId.image" alt="Mahsulot rasmi"
                                class="w-full h-[220px] rounded-2xl transition duration-500 object-contain" />
                            <div class="flex flex-col w-full gap-2 sm:gap-3">
                                <p class="text-[16px] sm:text-[20px] md:text-[24px] text-[#EAEAEA] font-semibold">
                                    {{ product.productId.name }}
                                </p>
                                <div class="flex justify-between items-center">
                                    <p
                                        class="text-[14px] sm:text-[16px] md:text-[18px] text-[#FFD700] w-[70px] rounded-[10px] font-semibold">
                                        {{ product.productId.price }}$
                                    </p>
                                    <p class="text-[12px] sm:text-[14px] md:text-[16px] text-[#FFD700] font-semibold">{{
                                        product.sellerId.userName }}</p>
                                </div>
                                <p class="text-[12px] sm:text-[13px] md:text-[14px] text-[#B0B0B0]">
                                    {{ product.productId.description }}
                                </p>
                                <div class="flex justify-between items-center w-full">
                                    <p class="text-[12px] sm:text-[14px] text-[#888] font-medium">
                                        Manzil: {{ product.address }}
                                    </p>

                                    <p class="text-[12px] sm:text-[14px] text-[#888] font-medium">Sotib olinmoqda: {{
                                        product.quantity }} ta</p>
                                </div>
                                <a-button
                                    :class="product.status === 'pending' ? '!bg-amber-300' : product.status === 'completed' ? '!bg-green-600' : product.status === 'incompleted' ? '!bg-red-700' : '!bg-gray-600'"
                                    size="large" type="primary">
                                    {{ product.status === "pending" ? "Yetkazilyapti" : product.status === 'completed' ?
                                        'Yetkazilgan' : product.status === 'incompleted' ? 'Yetkazilmagan' : "Topilmadi" }}
                                </a-button>
                            </div>
                        </div>
                    </div>
                </template>

                <template v-else>
                    <a-empty description="Mahsulotlar topilmadi" style="color: white; margin-top: 150px" />
                </template>
            </div>
        </a-spin>
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
