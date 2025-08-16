<script setup>
import { ref, computed, onMounted } from 'vue';
import usePendingProduct from '../../../../../store/product.pending.pinia';
import ProductModalComponent from '../../../../../components/ProductModalComponent.vue';
import useDeliveryProduct from '../../../../../store/delivery.product.pinia';

const deliveryProductStore = useDeliveryProduct()
const productStore = usePendingProduct();

const currentPage = ref(1);
const pageSize = ref(6);
const buttonLoaders = ref({});
const modalOpen = ref(false)

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
                        <div v-for="product in paginatedProducts" :key="product._id" class="product transition duration-500 bg-[#1E1E1E]
    cursor-pointer  !p-3 sm:!p-5 md:p-[20px] flex flex-col gap-4 sm:gap-6
    rounded-[20px] md:rounded-[30px]
    shadow-[0_4px_12px_rgba(0,0,0,0.6)]
    flex-shrink-0
    w-[300px] h-[430px] sm:h-[500px]">
                            <img :src="product.image" alt="Mahsulot rasmi"
                                class="w-full h-[240px] rounded-2xl transition duration-500 object-contain" />
                            <div class="flex flex-col w-full gap-2 sm:gap-3">
                                <p class="text-[16px] sm:text-[20px] md:text-[24px] text-[#EAEAEA] font-semibold">
                                    {{ product.name }}
                                </p>
                                <p
                                    class="text-[14px] sm:text-[16px] md:text-[18px] text-[#FFD700] w-[70px] rounded-[10px] font-semibold">
                                    {{ product.price }}$
                                </p>
                                <p class="text-[12px] sm:text-[13px] md:text-[14px] text-[#B0B0B0]">
                                    {{ product.description }}
                                </p>
                                <div class="flex justify-between items-center w-full">
                                    <p class="text-[12px] sm:text-[14px] text-[#888] font-medium">
                                        {{ product.model }}
                                    </p>
                                    <a :href="'tel:' + product.phone"
                                        class="text-[12px] sm:text-[14px] border-b border-[#888] !text-[#888] font-medium">
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
                                    <a-popconfirm title="Mahsulot Tasdiqlansinmi ?" ok-text="Ha" cancel-text="Yo'q"
                                        @confirm="() => confirmProduct(product._id)">
                                        <a-button :loading="buttonLoaders[product._id]" @click.stop.prevent
                                            class="!font-semibold !text-gray-800 !bg-[#FFD700] !flex justify-center items-center gap-2 !text-[12px] sm:!text-[14px] md:!text-[16px]"
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
                        style="margin-top: 60px !important;" :show-size-changer="false" />
                </template>

                <template v-else>
                    <a-empty description="Mahsulotlar topilmadi" style="color: white; margin-top: 150px" />
                </template>
            </a-spin>

            <product-modal-component :open="modalOpen" @update:open="val => modalOpen = val" />
        </div>
    </section>
</template>
