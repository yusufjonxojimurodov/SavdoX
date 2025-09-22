<script setup>
import { reactive, ref } from 'vue';
import useProducts from '@/store/products.pinia.js';
import ProductComponent from '@/components/ProductComponent.vue';
import useRegister from '@/store/register.pinia.js';
import ProductModalComponent from '@/components/ProductModalComponent.vue';
import useProductInfo from '@/store/products.info.pinia.js';
import useComments from '@/store/comments.pinia.js';
import useFilterProducts from '@/store/filter.products.pinia.js';

const commentsStore = useComments()
const productsInfoStore = useProductInfo()
const otherProductStore = useFilterProducts()
const registerStore = useRegister()
const productsStore = useProducts()

const modalOpen = ref(false)
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
    modalOpen.value = true
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

    <product-modal-component :open="modalOpen" @update:open="val => modalOpen = val" />
</template>

<style>
.product img {
    transition: 450ms ease;
}
</style>
