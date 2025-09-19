<script setup>
import useProductInfo from '../store/products.info.pinia';

const productInfo = useProductInfo()

const open = defineModel("open", { type: Boolean, default: false })

const closeModal = () => {
    open.value = false
}

function contactSeller() {
    window.open(`https://t.me/${productInfo.sellerInfo.userName}`, '_blank')
}
</script>

<template>
    <a-modal centered :open="open" :footer="null" :width="500">
        <a-spin :spinning="productInfo.loader">
            <div class="flex flex-col gap-4">

                <div class="flex items-center gap-4">
                    <a-avatar :size="70" :src="productInfo.sellerInfo.avatar" class="!rounded-full" />
                    <div class="flex flex-col">
                        <h2 class="text-white text-[16px] font-semibold">
                            {{ productInfo.sellerInfo.name }} {{ productInfo.sellerInfo.surname }}
                        </h2>
                        <p class="text-gray-300 text-[12px]">@{{ productInfo.sellerInfo.userName }}</p>
                    </div>
                </div>

                <div class="flex flex-col gap-2 !p-3 !rounded-md">
                    <div class="flex justify-between text-white">
                        <p class="!m-0 !p-0 !text-[24x] !font-semibold">Telefon:</p>
                        <p>{{ productInfo.sellerInfo.phone || "–" }}</p>
                    </div>
                    <div class="flex justify-between text-white">
                        <p class="!m-0 !p-0 !text-[24x] !font-semibold">Ball:</p>
                        <p>{{ productInfo.sellerInfo.points || 0 }}</p>
                    </div>
                    <div class="flex justify-between text-white items-center">
                        <p class="!m-0 !p-0 !text-[24x] !font-semibold">Rating:</p>
                        <a-rate :value="productInfo.sellerInfo.rating || 0" disabled :count="5" :character="() => '★'"
                            style="--antd-rate-star-color: #FFD700; --antd-rate-star-bg: #ffffff; font-size: 24px;" />
                    </div>
                </div>

                <div class="flex justify-end gap-2">
                    <a-button type="default" size="large" @click="closeModal">Yopish</a-button>
                    <a-button @click="contactSeller" type="primary" size="large">Bog'lanish</a-button>
                </div>
            </div>
        </a-spin>
    </a-modal>
</template>