<script setup>
import { ref, reactive } from 'vue'
import ProductComponent from '@/components/ProductComponent.vue'
import ProductModalComponent from '@/components/ProductModalComponent.vue'
import useFilterProducts from '@/store/filter.products.pinia'
import useProducts from '@/store/products.pinia'
import useRegister from '@/store/register.pinia'
import useProductInfo from '@/store/products.info.pinia'
import useComments from '@/store/comments.pinia'

const GoogleProductsStore = useFilterProducts()
const productsStore = useProducts()
const registerStore = useRegister()
const productsInfoStore = useProductInfo()
const commentsStore = useComments()

const modalOpen = ref(false)
const buttonLoaders = reactive({})

function getProduct(id) {
  productsInfoStore.getProductInfo(id)
  commentsStore.getComments(id)
  modalOpen.value = true
}

async function basket(id) {
  if (!registerStore.user) {
    registerStore.openModal()
  } else {
    buttonLoaders[id] = true
    try {
      await productsStore.basketProduct({ productId: id, quantity: 1 })
    } finally {
      buttonLoaders[id] = false
    }
  }
}
</script>

<template>
  <section>
    <div class="container">
      <template v-if="GoogleProductsStore.googleProducts.length">
        <div class="grid gap-4 sm:gap-6 !mt-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          <product-component
            v-for="product in GoogleProductsStore.googleProducts"
            :key="product._id"
            :product="product"
            :button-loading="buttonLoaders[product._id]"
            @select="getProduct"
            @add-to-basket="basket"
          />
        </div>
      </template>

      <template v-else>
        <a-empty description="Mahsulotlar topilmadi" style="color: white; margin-top: 150px" />
      </template>
    </div>

    <product-modal-component :open="modalOpen" @update:open="val => modalOpen = val" />
  </section>
</template>
