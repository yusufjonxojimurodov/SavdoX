<script setup>
import { storeToRefs } from 'pinia';
import useProductInfo from '../store/products.info.pinia';
import IconStar from './icons/IconStar.vue';
import { ref } from 'vue';
import ComentsComponent from './ComentsComponent.vue';
import ComentCreateComponent from './ComentCreateComponent.vue';

const props = defineProps({
    open: Boolean
})
const emits = defineEmits(['update:open'])

const productStore = useProductInfo()
const { product } = storeToRefs(productStore)
</script>

<template>
    <a-modal :open="props.open" @update:open="val => emits('update:open', val)" :closable="false" :maskClosable="false"
        :keyboard="false" class="!w-[800px]  mx-auto">
        <a-spin :spinning="productStore.loader">
            <div
                class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-6 !p-4 sm:!p-6">
                <!-- Product Card -->
                <div class="w-full sm:w-[300px]">
                    <div
                        class="product transition duration-300 bg-[#1E1E1E] w-full sm:h-[430px] md:w-[300px] md:h-[460px] cursor-pointer flex flex-col gap-3 sm:gap-4 !p-3 sm:!p-4 md:!p-4 rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.6)]">
                        <img :src="product.image" alt="Mahsulot rasmi"
                            class="w-full h-[180px] sm:h-[240px] rounded-xl object-contain transition duration-300" />
                        <div class="flex flex-col w-full gap-2">
                            <p class="text-base sm:text-lg md:text-xl text-[#EAEAEA] font-semibold line-clamp-2">
                                {{ product.name }}
                            </p>
                            <p class="text-sm sm:text-base text-[#FFD700] font-semibold">
                                {{ product.price }}$
                            </p>
                            <p class="text-xs sm:text-sm text-[#B0B0B0] line-clamp-3">
                                {{ product.description }}
                            </p>
                            <div class="flex justify-between items-center w-full">
                                <div class="flex items-center gap-1 sm:gap-2">
                                    <p class="text-xs sm:text-sm text-[#FFD700] font-medium">
                                        4.6
                                    </p>
                                    <icon-star class="w-3 h-3 sm:w-4 sm:h-4" />
                                </div>
                                <p class="text-xs sm:text-sm text-[#888] font-medium">
                                    {{ product.model }}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="flex flex-col w-full gap-4">
                    <div class="scroll-comment">
                        <coments-component />
                    </div>
                    <coment-create-component :productId="product._id" />
                </div>
            </div>

            <a-empty description="Mahsulot topilmadi" style="color: white; margin-top: 100px;"
                v-if="!product || Object.keys(product).length === 0" />
        </a-spin>

        <template #footer>
            <a-button size="large" type="primary" @click="() => emits('update:open', false)">
                Yopish
            </a-button>
        </template>
    </a-modal>
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