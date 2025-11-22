<script setup>
import { ref, computed } from "vue";
import useProductInfo from "@/store/products.info.pinia";
import { storeToRefs } from "pinia";
import useRegister from '@/store/register.pinia';
import useQueryParams from "@/composables/useQueryParams";
import ComplaintModalComponent from "@/components/ComplaintModalComponent.vue";
import IconBasket from "@/components/icons/IconBasket.vue";
import IconWarn from "@/components/icons/IconWarn.vue";
import { addBasket, buttonLoader } from "@/utils/helpers/add.basket";

const { setQueries } = useQueryParams();
const productInfoStore = useProductInfo();
const registerStore = useRegister();
const { product } = storeToRefs(productInfoStore);

const openComplaintModal = ref(false);
const showFullDescription = ref(false);

function deport(id) {
    if (registerStore.user) {
        setQueries({ productId: id });
        openComplaintModal.value = true;
    } else {
        registerStore.openModal();
    }
}

const shortDescriptionHTML = computed(() => {
    if (!product.value.description) return "";
    if (showFullDescription.value) return product.value.description;

    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = product.value.description;
    const textContent = tempDiv.textContent || tempDiv.innerText || "";
    const slicedText = textContent.slice(0, 180);

    return slicedText + (textContent.length > 180 ? "..." : "");
});
</script>

<template>
    <div class="flex flex-col gap-6 !w-full">
        <div>
            <div class="flex justify-between items-center !mb-4">
                <h1 class="!font-bold text-2xl !p-0 !m-0">{{ product.name }}</h1>
                <a-tag color="error" v-if="product.status === 'NOTFORSALE'">
                    Sotuvda emas
                </a-tag>
            </div>
            <a-textarea auto-size class="!w-full !shadow-none !p-0 !m-0 !rounded-none !resize-none" size="large"
                v-model:value="shortDescriptionHTML" />

            <span v-if="!showFullDescription && (product.description || '').length > 180"
                class="text-blue-500 cursor-pointer" @click="showFullDescription = true">
                Ko'proq
            </span>
        </div>

        <div class="flex items-center gap-3">
            <span :class="[
                'text-xl font-semibold',
                product.discount_price !== product.price
                    ? '!line-through text-[#212529] opacity-70'
                    : 'text-black'
            ]">
                {{ product.price }}$
            </span>

            <span v-if="product.discount_price !== product.price" class="text-xl font-bold text-[#FF8C00]">
                {{ product.discount_price }}$
            </span>
        </div>

        <div class="text-sm text-[#4A4A4A] space-y-1">
            <p><b>Model:</b> {{ product.model }}</p>
            <p><b>Turi:</b> {{ product.type }}</p>
            <p><b>Omborda qoldi:</b> {{ product.left }} dona</p>
        </div>

        <div class="flex gap-3 !mt-4">
            <a-button :disabled="product.status === 'NOTFORSALE'" @click="addBasket(product)"
                :loading="buttonLoader[product.id]" type="primary" size="large" class="!flex items-center gap-2">
                Savatchaga
                <template #icon>
                    <icon-basket class="basket-icon w-5 h-5" />
                </template>
            </a-button>

            <a-button @click="deport(product.id)" danger size="large" class="!flex items-center gap-2">
                Shikoyat qilish
                <template #icon>
                    <icon-warn />
                </template>
            </a-button>
        </div>
    </div>

    <complaint-modal-component v-model:open="openComplaintModal" />
</template>
