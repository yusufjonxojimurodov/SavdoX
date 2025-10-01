<script setup>
import { ref, computed, onMounted } from 'vue';
import usePendingProduct from '@/store/product.pending.pinia';
import useDeliveryProduct from '@/store/delivery.product.pinia';
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";

const deliveryProductStore = useDeliveryProduct()
const productStore = usePendingProduct();

const currentPage = ref(1);
const pageSize = ref(6);
const buttonLoaders = ref({});

const paginatedProducts = computed(() => {
    const start = (currentPage.value - 1) * pageSize.value;
    const end = start + pageSize.value;
    return productStore.pendingProductSeller.slice(start, end);
});

const address = "Tashkent"

function onPageChange(page) {
    currentPage.value = page;
}

onMounted(() => {
    productStore.getPendingProductSeller()
})

async function confirmProduct(productId) {
    await deliveryProductStore.ApiPostDeliveryProduct(productId, address)
    productStore.getPendingProductSeller()
}

async function deleteProduct(id) {
    await productStore.deletePendingProduct(id)
    productStore.getPendingProductSeller()
}
</script>

<template>
    <section>
        <div class="container">
            <a-spin size="large" :spinning="productStore.loader">
                <template v-if="productStore.pendingProductSeller.length > 0">
                    <div class="flex flex-wrap gap-4 sm:gap-6 !mt-6 justify-center">
                        <div v-for="product in paginatedProducts" :key="product._id" class="product transition duration-500 bg-[#F8EDEB]
    cursor-pointer  !p-3 sm:!p-5 md:p-[20px] flex flex-col gap-4 sm:gap-6
    rounded-[20px] md:rounded-[30px]
    shadow-[0_4px_12px_rgba(0,0,0,0.6)]
    flex-shrink-0 relative
    w-[300px] h-[430px] sm:h-[480px]">
                            <swiper :modules="[Pagination]" :pagination="{ clickable: true }"
                                class="w-full !h-[170px] sm:!h-[240px] rounded-2xl">
                                <swiper-slide v-for="(image, index) in product.product.images" :key="index"
                                    class="flex justify-center items-center">
                                    <a-image @click.stop :src="image" alt="Product image"
                                        class="object-contain w-full h-full transition duration-300 rounded-2xl" />
                                </swiper-slide>
                            </swiper>

                            <div v-if="product.product.discount"
                                class="w-[60px] flex justify-center rounded-tr-[30px] rounded-bl-[30px] items-center !p-[20px] bg-[#FF8C00] absolute top-0 right-0">
                                <p class="text-white !font-semibold text-[18px]">{{ product.product.discount }}%</p>
                            </div>
                            <div class="flex flex-col w-full gap-2 sm:gap-3">
                                <p class="text-[16px] sm:text-[20px] md:text-[24px] text-[#212529] !font-semibold">
                                    {{ product.name }}
                                </p>
                                <div class="!flex justify-start items-center gap-2">
                                    <p :class="[
                                        'text-[14px] sm:text-[16px] md:text-[18px] rounded-[10px] !font-semibold',
                                        product.product.discountPrice !== product.price ? '!line-through !opacity-80 text-[#53718f]' : 'text-[#34495E]'
                                    ]">
                                        {{ product.price }}$
                                    </p>
                                    <p v-if="product.product.discountPrice !== product.price"
                                        class="text-[14px] sm:text-[16px] md:text-[18px] text-[#34495E] !font-semibold">
                                        {{ product.product.discountPrice }}$
                                    </p>
                                </div>
                                <p class="text-[12px] sm:text-[13px] md:text-[14px] text-[#343A40]">
                                    {{ product.description }}
                                </p>
                                <div class="flex justify-between items-center w-full">
                                    <p class="text-[12px] sm:text-[14px] text-[#34495E] !font-medium">
                                        {{ product.model }}
                                    </p>
                                    <a :href="'tel:' + product.phone"
                                        class="text-[12px] sm:text-[14px] border-b border-[#34495E] !text-[#34495E] !font-medium">
                                        {{ product.phone }}
                                    </a>
                                </div>

                                <div class="flex justify-between items-center">
                                    <a-popconfirm title="Mahsulot Bekor qilinsinmi ?" ok-text="Ha" cancel-text="Yo'q"
                                        @confirm="() => deleteProduct(product._id)">
                                        <a-button :loading="buttonLoaders[product._id]" @click.stop.prevent
                                            class="!font-semibold !text-white !flex justify-center items-center gap-2 !text-[12px] sm:!text-[14px] md:!text-[16px]"
                                            size="large">
                                            Bekor qilish
                                        </a-button>
                                    </a-popconfirm>
                                    <a-popconfirm :title="`${product.quantity} ta sotib olinmoqda. Tasdiqlansinmi ?`"
                                        ok-text="Ha" cancel-text="Yo'q" @confirm="() => confirmProduct(product._id)">
                                        <a-button type="primary" :loading="buttonLoaders[product._id]"
                                            @click.stop.prevent
                                            class="!font-semibold !flex justify-center items-center gap-2 !text-[12px] sm:!text-[14px] md:!text-[16px]"
                                            size="large">
                                            Tasdiqlash
                                        </a-button>
                                    </a-popconfirm>
                                </div>

                            </div>
                        </div>
                    </div>

                    <a-pagination :current="currentPage" :page-size="pageSize"
                        :total="productStore.pendingProductSeller.length" @change="onPageChange"
                        style="margin-top: 60px !important; position: relative !important; z-index: 110000 !important;"
                        :show-size-changer="false" />
                </template>

                <template v-else>
                    <a-empty description="Mahsulotlar topilmadi" style="color: white; margin-top: 150px" />
                </template>
            </a-spin>
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