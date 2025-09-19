<script setup>
import { onMounted, reactive, ref } from 'vue';
import { storeToRefs } from 'pinia';
import useProducts from '../../../store/products.pinia.js';
import IconHappyComponent from '../../../components/icons/reactions/IconHappyComponent.vue';
import IconSadComponent from '../../../components/icons/reactions/IconSadComponent.vue';
import useRegister from '../../../store/register.pinia.js';
import ProductModalComponent from '../../../components/ProductModalComponent.vue';
import useProductInfo from '../../../store/products.info.pinia.js';
import useComments from '../../../store/comments.pinia.js';
import useFilterProducts from '../../../store/filter.products.pinia.js';

const commentsStore = useComments()
const productsInfoStore = useProductInfo()
const otherProductStore = useFilterProducts()
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

function getProduct(id) {
    productsInfoStore.getProductInfo(id)
    commentsStore.getComments(id)
    modalOpen.value = true
}
</script>

<template>
    <section>
        <div class="container">
            <template v-if="otherProductStore.otherProducts.length > 0">
                <div class="grid gap-4 sm:gap-6 !mt-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 auto-rows-fr">
                    <div v-for="product in otherProductStore.otherProducts" :key="product._id"
                        @click="getProduct(product._id)"
                        class="product relative !transition duration-500 bg-[#1E1E1E] !flex flex-col !justify-between !p-3 sm:!p-5 md:!p-6 !rounded-[20px] md:!rounded-[30px] shadow-[0_4px_12px_rgba(0,0,0,0.6)] cursor-pointer h-[400px] sm:!h-[500px]">

                        <img :src="product.image" alt="Mahsulot rasmi"
                            class="w-full !h-[240px] object-contain rounded-2xl" />

                        <div v-if="product.discount"
                            class="w-[60px] flex justify-center items-center !p-4 bg-red-700 absolute top-0 right-0 rounded-tr-[30px] rounded-bl-[30px]">
                            <p class="text-white !font-semibold text-[16px]">-{{ product.discount }}%</p>
                        </div>
                        <div class="!flex flex-col !gap-2 sm:!gap-3 !flex-1">
                            <p class="text-[16px] sm:text-[20px] md:text-[24px] text-[#EAEAEA] font-semibold">{{
                                product.name }}</p>
                            <div class="flex justify-between items-center">
                                <div class="flex items-center gap-2">
                                    <p
                                        :class="['text-[14px] sm:text-[16px] md:text-[18px] font-semibold', product.discountPrice !== product.price ? '!line-through !opacity-80 text-gray-400' : 'text-[#FFD700]']">
                                        {{ product.price }}$</p>
                                    <p v-if="product.discountPrice !== product.price"
                                        class="text-[#FFD700] text-[14px] sm:text-[16px] md:text-[18px] font-semibold">
                                        {{ product.discountPrice }}$</p>
                                </div>
                            </div>
                            <p class="text-[#B0B0B0] text-[12px] sm:text-[13px] md:text-[14px]">
                                {{ product.description.slice(0, 80) }}
                                <router-link to="/dashboard"
                                    class="!text-[#c1c1c1] text-medium text-[12px] sm:text-[13px] md:text-[14px]">Batafsil...</router-link>
                            </p>
                            <div class="flex justify-between items-center w-full">
                                <div class="flex items-center gap-1 sm:gap-2 w-full">
                                    <p
                                        class="flex justify-center items-center gap-2 text-[#FFD700] text-[12px] sm:text-[14px] font-medium">
                                        <icon-happy-component class="fill-[#FFD700]" /> {{ product.rating.happy }}%
                                    </p>
                                    <p
                                        class="flex justify-center items-center gap-2 text-red-500 text-[12px] sm:text-[14px] font-medium">
                                        <icon-sad-component class="fill-red-500" /> {{ product.rating.unhappy }}%
                                    </p>
                                </div>
                                <p class="text-[#888] text-[12px] sm:text-[14px] font-medium">{{ product.model ===
                                    "Other" ? "Boshqalar" : product.model }}</p>
                            </div>
                        </div>

                        <a-button :loading="buttonLoaders[product._id]" @click.stop="basket(product._id)"
                            class="w-full !text-[12px] !mt-5 sm:!text-[14px] md:!text-[16px]" size="large"
                            type="primary">
                            Savatga ({{ product.left || "topilmadi" }} ta qoldi)
                        </a-button>
                    </div>
                </div>

            </template>

            <template v-else>
                <a-empty description="Mahsulotlar topilmadi" style="color: white; margin-top: 150px" />
            </template>
        </div>
    </section>

    <product-modal-component :open="modalOpen" @update:open="val => modalOpen = val" />
</template>

<style>
.product img {
    transition: 450ms ease;
}

.product:hover {
    background-color: #252525;

    img {
        transform: scale(1.05);
    }
}
</style>
