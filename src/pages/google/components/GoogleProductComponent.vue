<script setup>
import ProductComponent from '@/components/ProductComponent.vue'
import useFilterProducts from '@/store/filter.products.pinia'
import useProductInfo from '@/store/products.info.pinia'
import useComments from '@/store/comments.pinia'
import { useRouter } from 'vue-router'
import { addBasket, buttonLoader } from '@/utils/helpers/add.basket';

const GoogleProductsStore = useFilterProducts()
const productsInfoStore = useProductInfo()
const commentsStore = useComments()
const router = useRouter()


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
      <template v-if="GoogleProductsStore.googleProducts.length">
        <div class="grid gap-4 sm:gap-6 !mt-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          <product-component v-for="product in GoogleProductsStore.googleProducts" :key="product.id" :product="product"
            :button-loading="buttonLoader[product.id]" @select="getProduct" @add-to-basket="() => addBasket(product)" />
        </div>
      </template>

      <template v-else>
        <a-empty description="Mahsulotlar topilmadi" style="color: #212529; margin-top: 150px" />
      </template>
    </div>
  </section>
</template>