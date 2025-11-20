<script setup>
import ProductImageComponent from './components/product/ProductImageComponent.vue';
import ProductInfoComponent from './components/product/ProductInfoComponent.vue';
import HeaderComponent from '@/components/HeaderComponent.vue';
import SectionNameComponent from '@/components/SectionNameComponent.vue';
import ComentsComponent from './components/product/ComentsComponent.vue';
import FooterComponent from '@/components/FooterComponent.vue';
import ComentCreateComponent from './components/product/ComentCreateComponent.vue';
import { onMounted } from 'vue';
import useProductInfo from '@/store/products.info.pinia';
import { useRoute } from 'vue-router';
import useComments from '@/store/comments.pinia';
import SellerInfoComponent from './components/seller/SellerInfoComponent.vue';
import InfoSkeleton from './components/skeleton-components/InfoSkeleton.vue';

const productStore = useProductInfo()
const commentsStore = useComments()
const route = useRoute()


onMounted(async () => {
    const id = route.query.productId
    if (id) {
        await productStore.getProductInfo(id)
        const userId = productStore.sellerId || 0
        if (userId) {
            productStore.getSellerInfo(userId)
        }
        commentsStore.getComments(id)
    }
})
</script>

<template>
    <header-component />
    <div class="container">
        <section-name-component :back="'Products'" :open-back="true" title="Mahsulot haqida">
            <div class="flex flex-col md:!flex-row md:!justify-between md:!items-start !mt-[5%]">
                <product-image-component />
                <div class="m-0 p-0 md:!ml-2">
                    <a-card class="!shadow-md !border-none !rounded-[30px]">
                    <product-info-component v-if="!productStore.modalLoader" />
                    <info-skeleton v-else />
                </a-card>
                </div>
            </div>
        </section-name-component>
        <div class="flex flex-col-reverse md:flex-row md:justify-between !mt-5 !w-full">
            <section-name-component title="Komentariyalar">
                <coments-component />
                <coment-create-component />
            </section-name-component>
            <section-name-component title="Sotuvchi">
                <seller-info-component />
            </section-name-component>
        </div>
    </div>
    <footer-component />
</template>
