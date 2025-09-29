<script setup>
import { onMounted, ref } from 'vue';
import useRegister from '@/store/register.pinia.js';
import useBuyyedProduct from '@/store/buyyed.pinia.js';
import useProductInfo from '@/store/products.info.pinia';
import useComments from '@/store/comments.pinia';
import useProducts from '@/store/products.pinia';
import useQueryParams from '@/composables/useQueryParams';

const buyyedProductStore = useBuyyedProduct()
const registerStore = useRegister()
const productsInfoStore = useProductInfo()
const commentsStore = useComments()
const productsStore = useProducts()
const { setQueries } = useQueryParams()

const modalOpen = ref(false)

onMounted(() => {
    buyyedProductStore.getBuyyedProduct()
    registerStore.userInfo()
})

function getProduct(id) {
    setQueries({
        productId: id
    })
    productsInfoStore.getProductInfo(id)
    commentsStore.getComments(id)
    productsStore.openInfoModal()
}
</script>

<template>
    <section>
        <a-spin :spinning="buyyedProductStore.loader" size="large" class="!flex justify-center items-center">
            <div class="container">
                <template v-if="buyyedProductStore.buyyedProduct.length > 0">
                    <div class="grid gap-4 sm:gap-6 !mt-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                        <div @click="getProduct(product.productId._id)"
                            v-for="product in buyyedProductStore.buyyedProduct" :key="product._id" class="product transition duration-500 bg-[#F8EDEB]
                w-full !relative
                h-[435px] sm:h-[500px] md:!w-[300px]
                cursor-pointer flex flex-col
                gap-4 sm:gap-6
                !p-3 sm:!p-5 md:p-[20px]
                rounded-[30px] md:rounded-[30px]
                shadow-[0_4px_12px_rgba(0,0,0,0.6)]">
                            <a-image @click.stop :src="product.productId.image" alt="Product image"
                                class="w-full !h-[200px] sm:!h-[240px] object-contain transition duration-300 rounded-2xl" />
                            <div class="flex flex-col w-full gap-2 sm:gap-3">
                                <div v-if="product.productId.discount"
                                    class="w-[60px] flex justify-center items-center !p-4 bg-[#FF8C00] absolute top-0 right-0 rounded-tr-[30px] rounded-bl-[30px]">
                                    <p class="text-white !font-semibold text-[16px]">-{{ product.productId.discount }}%
                                    </p>
                                </div>

                                <div class="!flex flex-col !gap-2 sm:!gap-3 !flex-1">
                                    <p class="text-[16px] sm:text-[20px] md:text-[24px] text-[#212529] !font-semibold">
                                        {{ product.productId.name }}</p>

                                    <div class="flex justify-between items-center">
                                        <div class="flex items-center gap-2">
                                            <p :class="[
                                                'text-[14px] sm:text-[16px] md:text-[18px] !font-semibold',
                                                product.productId.discountPrice !== product.productId.price
                                                    ? '!line-through !opacity-80 text-[#53718f]'
                                                    : 'text-[#34495E]'
                                            ]">
                                                {{ product.productId.price }}$
                                            </p>
                                            <p v-if="product.productId.discountPrice !== product.productId.price"
                                                class="text-[#34495E] text-[14px] sm:text-[16px] md:text-[18px] !font-semibold">
                                                {{ product.productId.discountPrice }}$
                                            </p>
                                        </div>
                                    </div>

                                    <div>
                                        <p class="text-[#343A40] text-[14px] sm:text-[13px] md:text-[14px]">
                                            {{ product.productId.description.slice(0, 80) }} <span
                                                class="!text-[#6C757D] text-medium text-[12px] sm:text-[13px] md:text-[14px]">
                                                Batafsil...</span>
                                        </p>
                                    </div>
                                </div>

                                <div class="flex justify-between items-center w-full">
                                    <p class="text-[#888] text-[12px] sm:text-[14px] font-medium">{{ product.address }}
                                    </p>

                                    <p class="text-[12px] sm:text-[14px] text-[#888] font-medium">Olinmoqda: {{
                                        product.quantity }} ta</p>
                                </div>
                                <a-button class="!mt-2"
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
                    <a-empty description="Mahsulotlar topilmadi" style="color: #212529; margin-top: 150px" />
                </template>
            </div>
        </a-spin>
    </section>
</template>