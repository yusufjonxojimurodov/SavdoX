<script setup>
import { onMounted, reactive } from 'vue';
import IconHappyComponent from '../../../components/icons/reactions/IconHappyComponent.vue';
import IconSadComponent from '../../../components/icons/reactions/IconSadComponent.vue';
import useRegister from '../../../store/register.pinia.js';
import usePendingProduct from '../../../store/product.pending.pinia.js';
import IconTimeProduct from '../../../components/icons/IconTimeProduct.vue';
import IconCansel from '../../../components/icons/IconCansel.vue';

const pendingProductsStore = usePendingProduct()
const registerStore = useRegister()
const buttonLoaders = reactive({})

onMounted(() => {
    pendingProductsStore.getPendingProductBuyer()
    registerStore.userInfo()
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
        <a-spin :spinning="pendingProductsStore.loader" size="large" class="!flex justify-center items-center">
            <div class="container">
                <template v-if="pendingProductsStore.pendingProductBuyer.length > 0">
                    <div class="grid gap-4 sm:gap-6 !mt-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                        <div @click="getProduct(product._id)"
                            v-for="product in pendingProductsStore.pendingProductBuyer" :key="product._id" class="product transition duration-500 bg-[#1E1E1E]
                w-full
                h-[430px] sm:h-[500px] md:!w-[300px]
                cursor-pointer flex flex-col
                gap-4 sm:gap-6
                !p-3 sm:!p-5 md:p-[20px]
                rounded-[20px] md:rounded-[30px]
                shadow-[0_4px_12px_rgba(0,0,0,0.6)]">
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

                                    <p class="text-[12px] sm:text-[14px] text-[#888] font-medium">Sotib olinmoqda: {{
                                        product.quantity }} ta</p>
                                </div>

                                <div class="flex justify-between items-center">
                                    <a-popconfirm title="Mahsulotni sotib olishni bekor qilmoqchimisiz ?"
                                        ok-text="Tasdiqlash" :okButtonProps="{ loading: buttonLoaders[product._id] }"
                                        cancel-text="Bekor qilish" @confirm="deletePendingProducts(product._id)">
                                        <a-button class="!flex justify-center items-center" size="large" danger>
                                            Bekor Qilish
                                            <icon-cansel />
                                        </a-button>
                                    </a-popconfirm>
                                    <a-button
                                        class="!text-[12px] sm:!text-[14px] md:!text-[16px] !flex justify-center items-center !font-semibold !text-gray-900 !bg-[#FFD700] hover:!bg-[#806c00]"
                                        size="large" type="primary">
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
