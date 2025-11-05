<script setup>
import { onMounted, reactive } from 'vue';
import usePendingProduct from '@/store/product.pending.pinia.js';
import IconTimeProduct from '@/components/icons/IconTimeProduct.vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/mousewheel';
import 'swiper/css/pagination';
import { Mousewheel, Pagination } from 'swiper/modules';
import { formatPrice } from '@/utils/format.js'

const pendingProductsStore = usePendingProduct()
const buttonLoaders = reactive({})

onMounted(() => {
    pendingProductsStore.getPendingProductBuyer()
})

async function deletePendingProducts(id) {
    try {
        buttonLoaders[id] = true;
        await pendingProductsStore.deletePendingProduct(id);
    } catch (err) {
        console.error(err);
    } finally {
        buttonLoaders[id] = false;
    }
}
</script>

<template>
    <section>
        <div class="container">
            <template v-if="pendingProductsStore.pendingProductBuyer.length > 0">
                <div class="grid gap-4 sm:gap-6 !mt-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    <div v-for="product in pendingProductsStore.pendingProductBuyer" :key="product._id" class="product transition duration-500 bg-white shadow-md
                w-full
                h-[450px] sm:h-[500px] md:!w-[300px]
                cursor-pointer flex flex-col
                gap-4 sm:gap-6 justify-center
                !p-3 sm:!py-5 md:py-[20px]
                rounded-[20px] md:rounded-[30px]
                !relative">
                        <swiper :mousewheel="{ forceToAxis: true }" :grab-cursor="true"
                            :modules="[Mousewheel, Pagination]" :pagination="{ clickable: true }"
                            class="w-full !h-[170px] sm:!h-[240px] rounded-2xl">
                            <swiper-slide v-for="(image, index) in product.product.images" :key="index"
                                class="flex justify-center items-center">
                                <a-image @click.stop :src="image" alt="Product image"
                                    class="object-contain w-full h-full transition duration-300 rounded-2xl" />
                            </swiper-slide>
                        </swiper>
                        <div class="flex flex-col w-full gap-2 sm:gap-3">
                            <div v-if="product.product.discount"
                                class="w-[60px] flex justify-center items-center !p-4 bg-[#FF8C00] absolute top-0 right-0 rounded-tr-[30px] rounded-bl-[30px]">
                                <p class="text-white !font-semibold text-[16px]">-{{ product.product.discount }}%
                                </p>
                            </div>

                            <div class="!flex flex-col !gap-2 sm:!gap-3 !flex-1">
                                <p class="text-[16px] sm:text-[20px] md:text-[24px] text-[#212529] !font-semibold">
                                    {{ product.name }}</p>

                                <div class="flex justify-between items-center">
                                    <div class="flex items-center gap-2">
                                        <p :class="[
                                            'text-[14px] sm:text-[16px] md:text-[18px] !font-semibold',
                                            product.product.discountPrice !== product.product.price
                                                ? '!line-through !opacity-80 text-[#53718f]'
                                                : 'text-[#34495E]'
                                        ]">
                                            {{ formatPrice(product.product.price) }}$
                                        </p>
                                        <p v-if="product.product.discountPrice !== product.product.price"
                                            class="text-[#34495E] text-[14px] sm:text-[16px] md:text-[18px] !font-semibold">
                                            {{ formatPrice(product.product.discountPrice) }}$
                                        </p>
                                    </div>
                                </div>

                                <div>
                                    <p class="text-[#343A40] text-[12px] sm:text-[13px] md:text-[14px]">
                                        {{ product.description.slice(0, 80) }} <span
                                            class="!text-[#6C757D] text-medium text-[12px] sm:text-[13px] md:text-[14px]">
                                            Batafsil...</span>
                                    </p>
                                </div>
                            </div>

                            <div class="flex justify-between items-center w-full">
                                <p class="text-[#888] text-[12px] sm:text-[14px] font-medium">{{ product.model
                                    ===
                                    "Other" ? "Boshqalar" : product.model }}</p>

                                <p class="text-[12px] sm:text-[14px] text-[#888] font-medium">Olinmoqda: {{
                                    product.quantity }} ta</p>
                            </div>

                            <div class="flex flex-col !mt-4 !gap-[10px] sm:flex-row w-full">
                                <a-popconfirm title="Mahsulotni sotib olishni bekor qilmoqchimisiz ?"
                                    ok-text="Tasdiqlash" :okButtonProps="{ loading: buttonLoaders[product._id] }"
                                    cancel-text="Bekor qilish" @confirm="deletePendingProducts(product._id)">
                                    <a-button size="large"
                                        class="!flex !bg-white !border-red-600 !text-red-600 !border-1 !w-full sm:!w-[120px] sm:!p-[18px] !text-[12px] sm:!text-[14px] md:!text-[16px] justify-center items-center">
                                        Bekor Qilish
                                    </a-button>
                                </a-popconfirm>
                                <a-button size="large"
                                    class="!text-[12px] sm:!text-[14px] sm:!p-[18px] md:!text-[16px] !flex !w-full sm:w-[120px] justify-center items-center !font-semibold"
                                    type="primary">
                                    Kutilyapti
                                    <icon-time-product />
                                </a-button>
                            </div>

                        </div>
                    </div>
                </div>
            </template>

            <template v-else>
                <a-empty description="Mahsulotlar topilmadi" style="color: white; margin-top: 150px" />
            </template>
        </div>
    </section>
</template>


<style scoped>
:deep(.swiper-pagination-bullet) {
    background: #ccc !important;
    opacity: 1 !important;
    width: 10px;
    height: 10px;
}

:deep(.swiper-pagination-bullet-active) {
    background: #ff8c00 !important;
    width: 12px;
    height: 12px;
}
</style>