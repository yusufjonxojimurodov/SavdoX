<script setup>
import useProductInfo from '@/store/products.info.pinia';
import IconPhone from '@/components/icons/IconPhone.vue';
import IconPoints from '@/components/icons/IconPoints.vue';
import IconRating from '@/components/icons/IconRating.vue';
import SellerSkeleton from '../skeleton-components/SellerSkeleton.vue';

const productInfo = useProductInfo()

const open = defineModel("open", { type: Boolean, default: false })

function contactSeller() {
    window.open(`https://t.me/${productInfo.sellerInfo.userName}`, '_blank')
}
</script>

<template>
    <div v-if="!productInfo.loader || productInfo.sellerInfo"
        class="flex flex-col gap-6 !mt-6 bg-white rounded-2xl shadow-lg !p-6 w-full max-w-xl mx-auto">
        <div class="flex items-center gap-5 border-b !pb-4">
            <a-avatar :size="90" :src="productInfo.sellerInfo.avatar"
                class="!rounded-full border-2 !border-[#FFD700]" />
            <div class="flex flex-col">
                <h2 class="text-[#212529] text-2xl font-bold">
                    {{ productInfo.sellerInfo.name }} {{ productInfo.sellerInfo.surname }}
                </h2>
                <p class="text-[#6C757D] text-sm">@{{ productInfo.sellerInfo.userName }}</p>
            </div>
        </div>

        <div class="flex flex-col gap-5">
            <div class="flex justify-between items-center">
                <div class="flex items-center gap-3 text-[#212529]">
                    <icon-phone class="w-6 h-6 text-[#FFD700]" />
                    <p class="text-lg !font-semibold">Telefon:</p>
                </div>
                <a class="text-base text-[#212529] !border-b !border-[#212529] hover:!text-[#FF8C00]"
                    :href="`tel:${productInfo.sellerInfo.phone}`">
                    {{ productInfo.sellerInfo.phone || "–" }}
                </a>
            </div>

            <div class="flex justify-between items-center">
                <div class="flex items-center gap-3 text-[#212529]">
                    <icon-points class="!w-6 !h-6 text-[#FFD700]" />
                    <p class="text-lg !font-semibold">To'plangan ball:</p>
                </div>
                <p class="text-lg !font-bold text-[#212529]">{{ productInfo.sellerInfo.points || 0 }}</p>
            </div>

            <div class="flex justify-between items-center">
                <div class="flex items-center gap-3 text-[#212529]">
                    <icon-rating class="w-6 h-6 text-[#FFD700]" />
                    <p class="text-lg font-semibold">Rating:</p>
                </div>
                <a-rate :value="productInfo.sellerInfo.rating || 0" disabled :count="5" :character="() => '★'"
                    style="--antd-rate-star-color: #FFD700; --antd-rate-star-bg: #e4e4e4; font-size: 26px;" />
            </div>
        </div>

        <div class="flex justify-end gap-4 border-t !pt-4">
            <a-button type="primary" size="large" class="!px-6 !py-2" @click="contactSeller">
                Bog'lanish
            </a-button>
        </div>
    </div>

    <seller-skeleton v-else />
</template>
