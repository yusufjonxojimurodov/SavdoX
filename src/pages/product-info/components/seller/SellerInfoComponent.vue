<script setup>
import { ref } from 'vue';
import useProductInfo from '@/store/products.info.pinia';
import IconPoints from '@/components/icons/IconPoints.vue';
import IconRating from '@/components/icons/IconRating.vue';
import SellerSkeleton from "../skeleton-components/SellerSkeleton.vue"
import IconComent from '@/components/icons/IconComent.vue';
import { useRouter } from 'vue-router';
import IconCall from '@/components/icons/IconCall.vue';
import useChat from '@/store/chats-store/chats.pinia';
import useMessage from '@/store/chats-store/messages.pinia';
import api from '@/utils/api/api';
import ShopsModal from './ShopsModal.vue';
import { message } from 'ant-design-vue';
import IconShops from '@/components/icons/IconShops.vue';

const productInfo = useProductInfo()
const router = useRouter()
const chatsStore = useChat()
const messageStore = useMessage()
const shopsModal = ref(false)
const shopsList = ref([])
const shopsLoading = ref(false)

const open = defineModel("open", { type: Boolean, default: false })

function contactSeller(status) {
    if (status === 'TG') {
        window.open(`https://t.me/${productInfo.sellerInfo.username}`, '_blank')
    } else {
        window.open(`tel:${productInfo.sellerInfo.phone}`, '_blank')
    }
}

const openChat = (seller) => {
    messageStore.$reset()
    chatsStore.userInfo.username = seller.username
    chatsStore.userInfo.receiverId = seller.id
    router.push({ name: "Chats" })
    chatsStore.userInfo.openChat = true
}

function getShops(sellerId) {
    shopsLoading.value = true
    api({
        url: `/api/shops/${sellerId}`,
        method: "GET"
    })
        .then(({ data }) => {
            shopsList.value = data.shops
            shopsModal.value = true
        })
        .catch((error) => {
            const errorMessage = error.response?.data?.message || "Tizim xatosi";
            message.warn(errorMessage);
            console.error(error);
        })
        .finally(() => {
            shopsLoading.value = false
        })
}
</script>

<template>
    <div v-if="!productInfo.loader && productInfo.sellerInfo"
        class="flex flex-col gap-6 !mt-6 bg-white rounded-[30px]! shadow-lg !p-6 w-[100%] lg:w-[430px] mx-auto">
        <div class="flex items-center gap-5 border-b !pb-4">
            <div class="flex flex-col w-full">
                <h2 class="text-[#212529] text-2xl font-bold">
                    {{ productInfo.sellerInfo.name }} {{ productInfo.sellerInfo.surname }}
                </h2>
                <div class="flex justify-between items-center w-full">
                    <p class="text-[#6C757D] text-sm">@{{ productInfo.sellerInfo.username }}</p>
                    <a-button class="!flex !justify-center !items-center !gap-2" type="primary" :loading="shopsLoading" @click="getShops(productInfo.sellerInfo.id)">
                        <template #icon>
                            <icon-shops class="w-5 h-5" />
                        </template>
                        Do'konlar
                    </a-button>
                </div>
            </div>
        </div>

        <div class="flex flex-col gap-5">
            <div class="flex justify-between items-center">
                <div class="flex items-center gap-3 text-[#212529]">
                    <icon-call class="w-6 h-6 text-[#212529]" />
                    <p class="text-lg !font-semibold">Telefon:</p>
                </div>
                <a class="text-base text-[#212529] !border-b !border-[#212529] hover:!text-[#FF8C00]"
                    :href="`tel:${productInfo.sellerInfo.phone}`">
                    {{ productInfo.sellerInfo.phone || "–" }}
                </a>
            </div>

            <div class="flex justify-between items-center">
                <div class="flex items-center gap-3 text-[#212529]">
                    <icon-points class="!w-6 !h-6 text-[#212529]" />
                    <p class="text-lg !font-semibold">To'plangan ball:</p>
                </div>
                <p class="text-lg !font-bold text-[#212529]">{{ productInfo.sellerInfo.points || 0 }}</p>
            </div>

            <div class="flex justify-between items-center">
                <div class="flex items-center gap-3 text-[#212529]">
                    <icon-rating class="w-6 h-6 text-[#212529]" />
                    <p class="text-lg font-semibold">Rating:</p>
                </div>
                <a-rate :value="productInfo.sellerInfo.rating || 0" disabled :count="5" :character="() => '★'"
                    style="--antd-rate-star-color: #FFD700; --antd-rate-star-bg: #e4e4e4; font-size: 26px;" />
            </div>
        </div>

        <div class="flex justify-end gap-4 border-t !pt-4">
            <a-popconfirm @confirm="contactSeller('CALL')" @cancel="contactSeller('TG')"
                title="Qanday bog'lanmoqchisiz ?" ok-text="Qo'ng'iroq qilish" cancel-text="Telegram">
                <a-button type="primary" size="large" class="flex! justify-center! items-center! !px-6 !py-2">
                    <template #icon>
                        <icon-call class="w-5 h-5" />
                    </template>
                    Bog'lanish
                </a-button>
            </a-popconfirm>
            <a-button @click="openChat(productInfo.sellerInfo)" size="large"
                class="!flex justify-center items-center gap-2">
                <template #icon>
                    <icon-coment class="w-5 h-5" />
                </template>
                Chatni ochish
            </a-button>
        </div>
    </div>

    <seller-skeleton v-else />
    <shops-modal v-model:open="shopsModal" v-model:shops-list="shopsList" />
</template>
