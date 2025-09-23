<script setup>
import { reactive, ref } from 'vue';
import useProducts from '@/store/products.pinia.js';
import ProductComponent from '@/components/ProductComponent.vue';
import useRegister from '@/store/register.pinia.js';
import useFilterProducts from '@/store/filter.products.pinia.js';
import useProductInfo from '@/store/products.info.pinia.js';
import useComments from '@/store/comments.pinia.js';
import useQueryParams from '@/composables/useQueryParams';

const commentsStore = useComments()
const productsInfoStore = useProductInfo()
const samsungProductsStore = useFilterProducts()
const registerStore = useRegister()
const productsStore = useProducts()
const { setQueries } = useQueryParams()

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
    setQueries({
        productId: id
    })
    productsInfoStore.getProductInfo(id)
    commentsStore.getComments(id)
    productsStore.openInfoModal()
}
</script>

<template>
    <section>
        <div class="container">
            <template class="!flex !justify-between items-center flex-wrap !w-full"
                v-if="samsungProductsStore.samsungProducts.length > 0">
                <div class="grid gap-4 sm:gap-6 !mt-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    <product-component v-for="product in samsungProductsStore.samsungProducts" :key="product._id"
                        :product="product" :button-loading="buttonLoaders[product._id]" @select="getProduct"
                        @add-to-basket="basket" />
                </div>
            </template>
            <template v-else>
                <a-empty description="Mahsulotlar topilmadi" style="color: #212529; margin-top: 150px" />
            </template>
        </div>
    </section>
</template>

<style>
.product img {
    transition: 450ms ease;
}
</style>
