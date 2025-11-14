<script setup>
import ProductComponent from '@/components/ProductComponent.vue';
import useProductInfo from '@/store/products.info.pinia.js';
import useComments from '@/store/comments.pinia.js';
import useFilterProducts from '@/store/filter.products.pinia.js';
import { addBasket, buttonLoader } from '@/utils/helpers/add.basket';

const commentsStore = useComments()
const productsInfoStore = useProductInfo()
const otherProductStore = useFilterProducts()

function getProduct(id) {
    productsInfoStore.getProductInfo(id)
    commentsStore.getComments(id)
    router.push({
        name: "ProductInfo",
        query: { productId: id }
    })
}
</script>

<template>
    <section>
        <div class="container">
            <template v-if="otherProductStore.otherProducts.length > 0">
                <product-component v-for="product in otherProductStore.otherProducts" :key="product.id"
                    :product="product" :buttonLoading="buttonLoader[product.id]" @select="getProduct"
                    @add-to-basket="() => addBasket(product)" />
            </template>

            <template v-else>
                <a-empty description="Mahsulotlar topilmadi" style="color: white; margin-top: 150px" />
            </template>
        </div>
    </section>
</template>

<style>
.product img {
    transition: 450ms ease;
}
</style>
