<script setup>
import { reactive } from 'vue';
import useProducts from '@/store/products.pinia.js';
import ProductComponent from '@/components/ProductComponent.vue';
import useRegister from '@/store/register.pinia.js';
import useProductInfo from '@/store/products.info.pinia.js';
import useComments from '@/store/comments.pinia.js';
import useFilterProducts from '@/store/filter.products.pinia.js';

const commentsStore = useComments()
const productsInfoStore = useProductInfo()
const otherProductStore = useFilterProducts()
const registerStore = useRegister()
const productsStore = useProducts()

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
                <product-component v-for="product in otherProductStore.otherProducts" :key="product._id"
                    :product="product" :buttonLoading="buttonLoaders[product._id]" @select="getProduct"
                    @add-to-basket="basket" />
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
