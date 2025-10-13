<script setup>
import { computed, onBeforeUnmount, onMounted, reactive, ref } from 'vue';
import useDeliveryProduct from '@/store/delivery.product.pinia.js';
import IconCompelted from '@/components/icons/IconCompelted.vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/mousewheel';
import 'swiper/css/pagination';
import { Mousewheel, Pagination } from 'swiper/modules';

const buyyedProductStore = useDeliveryProduct()
const buttonLoaders = reactive({})
const currentPage = ref(1);
const windowWidth = ref(window.innerWidth);

const responsivePageSize = computed(() => {
    return windowWidth.value <= 500 ? 3 : 6;
});

const paginatedProducts = computed(() => {
    const size = responsivePageSize.value;
    const start = (currentPage.value - 1) * size;
    const end = start + size;
    return buyyedProductStore.deliveryProduct.slice(start, end);
});

function handleResize() {
    windowWidth.value = window.innerWidth;
    currentPage.value = 1;
}

const declined = {
    status: "incompleted"
}
const completed = {
    status: "completed"
}

onMounted(() => {
    buyyedProductStore.getDeliveryProducts()
    window.addEventListener('resize', handleResize)
})
onBeforeUnmount(() => window.removeEventListener('resize', handleResize));

function onPageChange(page) {
    currentPage.value = page;
}

async function declinedDelivery(id) {
    buttonLoaders[id] = "declined"
    await buyyedProductStore.putDeliveryProductStatus(id, declined)
    buyyedProductStore.getDeliveryProducts()
    buttonLoaders[id] = null
}

async function completedDelivery(id) {
    buttonLoaders[id] = "completed"
    await buyyedProductStore.putDeliveryProductStatus(id, completed)
    buyyedProductStore.getDeliveryProducts()
    buttonLoaders[id] = null
}
</script>

<template>
    <section>
        <a-spin :spinning="buyyedProductStore.loader" size="large" class="!flex justify-center items-center">
            <div class="container">
                <template v-if="buyyedProductStore.deliveryProduct.length > 0">
                    <div class="gap-4 sm:gap-6 !mt-6 flex justify-start items-center flex-wrap">
                        <div v-for="product in paginatedProducts" :key="product._id" class="product transition duration-500 bg-[#F8EDEB]
                w-full relative
                h-[430px] sm:h-[500px] md:!w-[300px]
                cursor-pointer flex flex-col
                gap-4 sm:gap-6 justify-between
                !p-3 sm:!p-5 md:p-[20px]
                rounded-[20px] md:rounded-[30px]
                shadow-[0_4px_12px_rgba(0,0,0,0.6)]">
                            <swiper :mousewheel="{ forceToAxis: true }" :grab-cursor="true"
                                :modules="[Mousewheel, Pagination]" :pagination="{ clickable: true }"
                                class="w-full !h-[170px] sm:!h-[240px] rounded-2xl">
                                <swiper-slide v-for="(image, index) in product.productId.images" :key="index"
                                    class="flex justify-center items-center">
                                    <a-image @click.stop :src="image" alt="Product image"
                                        class="object-contain w-full h-full transition duration-300 rounded-2xl" />
                                </swiper-slide>
                            </swiper>

                            <div v-if="product.productId.discount"
                                class="w-[60px] flex justify-center rounded-tr-[30px] rounded-bl-[30px] items-center !p-[20px] bg-[#FF8C00] absolute top-0 right-0">
                                <p class="text-white !font-semibold text-[18px]">{{ product.productId.discount }}%</p>
                            </div>

                            <div class="flex flex-col w-full gap-2 sm:gap-3">
                                <p class="text-[16px] sm:text-[20px] md:text-[24px] text-[#212529] !font-semibold">
                                    {{ product.productId.name }}
                                </p>
                                <div class="flex justify-between items-center">
                                    <div class="!flex justify-start items-center gap-2">
                                        <p :class="[
                                            'text-[14px] sm:text-[16px] md:text-[18px] rounded-[10px] !font-semibold',
                                            product.productId.discountPrice !== product.price ? '!line-through !opacity-80 text-[#53718f]' : 'text-[#34495E]'
                                        ]">
                                            {{ product.price }}$
                                        </p>
                                        <p v-if="product.productId.discountPrice !== product.price"
                                            class="text-[14px] sm:text-[16px] md:text-[18px] text-[#34495E] !font-semibold">
                                            {{ product.productId.discountPrice }}$
                                        </p>
                                    </div>
                                    <p class="text-[12px] sm:text-[14px] md:text-[16px] text-[#212529] font-semibold">{{
                                        product.sellerId.userName }}</p>
                                </div>
                                <p class="text-[12px] sm:text-[13px] md:text-[14px] text-[#343A40]">
                                    {{ product.productId.description }}
                                </p>
                                <div class="flex justify-between items-center w-full">
                                    <p class="text-[12px] sm:text-[14px] text-[#343A40] !font-medium">
                                        Manzil: {{ product.address }}
                                    </p>

                                    <p class="text-[12px] sm:text-[14px] text-[#343A40] font-medium">Sotib olinmoqda: {{
                                        product.quantity }} ta</p>
                                </div>
                                <div v-if="product.status === 'pending'" class="flex justify-between items-center">
                                    <a-button :loading="buttonLoaders[product._id] === 'declined'"
                                        @click="declinedDelivery(product._id)"
                                        class="!text-[12px] !w-[125px] sm:!text-[14px] md:!text-[16px] !flex justify-center items-center !font-semibold !text-white"
                                        size="large">
                                        Yetkazilmadi
                                    </a-button>
                                    <a-button :loading="buttonLoaders[product._id] === 'completed'"
                                        @click="completedDelivery(product._id)"
                                        class="!text-[12px] !w-[125px] sm:!text-[14px] md:!text-[16px] !flex justify-center items-center !font-semibold !text-gray-900 !bg-[#FFD700] hover:!bg-[#806c00]"
                                        size="large" type="primary">
                                        Yetkazildi
                                        <icon-compelted />
                                    </a-button>
                                </div>

                                <a-button v-if="product.status === 'completed'" size="large" type="primary">
                                    Yetkazilgan
                                </a-button>

                                <a-button v-if="product.status === 'incompleted'" size="large">
                                    Yetkazilmagan
                                </a-button>
                            </div>
                        </div>
                    </div>
                </template>

                <template v-else>
                    <a-empty description="Mahsulotlar topilmadi" style="color: white; margin-top: 150px" />
                </template>

                <a-pagination :current="currentPage" :page-size="responsivePageSize"
                    :total="buyyedProductStore.deliveryProduct.length" @change="onPageChange" :show-size-changer="false"
                    class="!mt-8 relative z-[99999]" />
            </div>
        </a-spin>
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