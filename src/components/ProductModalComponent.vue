<script setup>
import { storeToRefs } from 'pinia';
import useProductInfo from '../store/products.info.pinia';
import SellerInfoModalComponent from './SellerInfoModalComponent.vue';
import ComentsComponent from './ComentsComponent.vue';
import ComentCreateComponent from './ComentCreateComponent.vue';
import ComplaintModalComponent from './ComplaintModalComponent.vue';
import { onMounted, ref } from 'vue';
import useQueryParams from '@/composables/useQueryParams';
import useRegister from '@/store/register.pinia';
import { useRoute } from 'vue-router';
import useComments from '@/store/comments.pinia';
import useProducts from '@/store/products.pinia';

const props = defineProps({
    open: Boolean
})

const productStore = useProductInfo()
const productsStore = useProducts()
const userStore = useRegister()
const { setQueries } = useQueryParams()
const commentsStore = useComments()
const route = useRoute()
const openInfoModal = ref(false)
const openComplaintModal = ref(false)
const { product } = storeToRefs(productStore)

function openSellerInfoModal(id) {
    productStore.getSellerInfo(id)
    productsStore.closeInfoModal()
    openInfoModal.value = true
}

function deport(id) {
    if (userStore.user) {
        setQueries({
            productId: id
        })
        openComplaintModal.value = true
    } else {
        userStore.openModal()
    }
}

onMounted(() => {
    const id = route.query.productId
    if (id) {
        productStore.getProductInfo(id)
        commentsStore.getComments(id)
        productsStore.openInfoModal()
    }
})

function closeModal() {
    setQueries({
        productId: undefined
    })
    productsStore.closeInfoModal()
}
</script>

<template>
    <a-modal :open="props.open" :closable="false" :maskClosable="false" :keyboard="false" class="!w-[800px]  mx-auto">
        <a-spin :spinning="productStore.modalLoader">
            <div
                class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-6 !p-4 sm:!p-6">
                <div v-if="product && Object.keys(product).length > 1" class="w-full sm:w-[300px]">
                    <div
                        class="product relative transition duration-300 bg-[#F8EDEB] w-full sm:h-[430px] md:w-[300px] md:h-[460px] cursor-pointer flex flex-col gap-3 sm:gap-4 !p-3 sm:!p-4 md:!p-4 rounded-[30px] shadow-[0_4px_12px_rgba(0,0,0,0.6)]">
                        <img :src="product.image" alt="Mahsulot rasmi"
                            class="w-full h-[180px] sm:h-[240px] rounded-xl object-contain transition duration-300" />

                        <div v-if="product.discount"
                            class="w-[60px] flex justify-center items-center !p-4 bg-red-700 absolute top-0 right-0 rounded-tr-[30px] rounded-bl-[30px]">
                            <p class="text-white !font-semibold text-[16px]">-{{ product.discount }}%</p>
                        </div>
                        <div class="flex flex-col w-full gap-2">
                            <p class="text-base sm:text-lg md:text-xl text-[#343A40] !font-semibold line-clamp-2">
                                {{ product.name }}
                            </p>
                            <div class="flex justify-between items-center w-full">
                                <div class="flex items-center gap-1 sm:gap-2 w-full">
                                    <p
                                        class="flex justify-center items-center gap-2 text-[#FF8C00] text-[12px] sm:text-[16px] !font-semibold">
                                        <img width="30px" height="30px" src="../assets/images/happy-icon.svg"
                                            alt="happy-icon"> {{
                                                product.rating.happy }}%
                                    </p>
                                    <p
                                        class="flex justify-center items-center gap-2 text-red-500 text-[12px] sm:text-[16px] !font-semibold">
                                        <img width="30px" height="30px" src="../assets/images/sad-icon.svg"
                                            alt="sad-icon"> {{
                                                product.rating.unhappy }}%
                                    </p>
                                </div>
                                <p class="text-[#888] text-[12px] sm:text-[14px] font-medium">{{ product.model ===
                                    "Other" ? "Boshqalar" : product.model }}</p>
                            </div>
                            <p class="text-xs sm:text-sm text-[#343A40] line-clamp-3">
                                {{ product.description }}
                            </p>
                            <div class="flex justify-between items-center w-full">
                                <a-button @click="deport(product._id)" size="middle" danger>
                                    Shikoyat
                                </a-button>

                                <p @click="openSellerInfoModal(product.createdBy._id)" type="text"
                                    class="!text-[12px] border-b border-[#343A40] text-[#343A40]" size="middle">
                                    Sotuvchi ha'qida ma'lumot olish
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <a-empty description="Mahsulot topilmadi" style="color: white; margin-top: 100px;" v-else />

                <div class="flex flex-col w-full gap-4">
                    <div class="scroll-comment">
                        <coments-component />
                    </div>
                    <coment-create-component :productId="product._id" />
                </div>
            </div>
        </a-spin>

        <template #footer>
            <a-button size="large" type="primary" @click="closeModal">
                Yopish
            </a-button>
        </template>
    </a-modal>

    <seller-info-modal-component v-model:open="openInfoModal" />
    <complaint-modal-component v-model:open="openComplaintModal" />
</template>

<style scoped>
.scroll-comment {
    max-height: 380px;
    overflow-y: auto;
    padding-right: 4px;
}

.scroll-comment::-webkit-scrollbar {
    width: 5px;
}

.scroll-comment::-webkit-scrollbar-thumb {
    background-color: #555;
    border-radius: 10px;
    height: 2px !important;
    width: 2px;
}

.scroll-comment::-webkit-scrollbar-track {
    background: transparent;
}

@media (max-width: 640px) {
    .scroll-comment {
        max-height: 350px;
    }
}
</style>