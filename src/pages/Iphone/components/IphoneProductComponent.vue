<script setup>
import { onMounted, reactive } from 'vue'
import { axiosInstance } from '../../../../utils/api/api.js'
import useFilterProducts from '../../../../store/filter.products.pinia.js'
import useRegister from '../../../../store/register.pinia.js'
import useProducts from '../../../../store/products.pinia.js'
import IconStar from '../../../../components/icons/IconStar.vue'

// Pinia storeni ulash
const samsungProductsStore = useFilterProducts()
const registerStore = useRegister()
const productsStore = useProducts()

// Tugmalar uchun loaderlar holati
const buttonLoaders = reactive({})

// Savatga qo‘shish funksiyasi
async function basket(id) {
  if (!registerStore.user) {
    registerStore.openModal()
  } else {
    buttonLoaders[id] = true
    try {
      await productsStore.basketProduct({
        productId: id,
        quantity: 1,
      })
    } catch (err) {
      console.error("Savatga qo‘shishda xatolik:", err)
    } finally {
      buttonLoaders[id] = false
    }
  }
}

// Komponent yuklanganda mahsulotlarni olib kelish
onMounted(() => {
  productsStore.getProducts()
  samsungProductsStore.getSamsungProducts()
  samsungProductsStore.ApiGetIphone()
})
</script>

<template>
  <!-- Samsung Mahsulotlari -->
  <template v-if="samsungProductsStore.samsungProducts.length > 0">
    <h2 class="text-2xl font-bold mb-4">📱 Samsung Mahsulotlari</h2>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <div
        v-for="product in samsungProductsStore.samsungProducts"
        :key="product._id"
        class="border rounded-lg p-4 shadow-md"
      >
        <img
          :src="axiosInstance.defaults.baseURL + product.image"
          alt="Mahsulot rasmi"
          class="w-full h-48 object-contain mb-4"
        />
        <p class="font-semibold">{{ product.name }}</p>
        <p class="text-gray-600">{{ product.price }}$</p>
        <p class="text-sm text-gray-500">Model: {{ product.model }}</p>
        <router-link
          to="/dashboard"
          class="text-blue-500 hover:underline block mb-2"
        >
          Batafsil...
        </router-link>
        <a-button
          :loading="buttonLoaders[product._id]"
          :disabled="!product.left"
          @click="basket(product._id)"
          class="w-full"
          size="large"
          type="primary"
        >
          Savatga ({{ product.left || 0 }} ta qoldi)
        </a-button>
      </div>
    </div>
  </template>

  <!-- iPhone Mahsulotlari -->
  <template v-if="samsungProductsStore.iphoneProducts.length > 0">
    <h2 class="text-2xl font-bold mt-10 mb-4">🍏 iPhone Mahsulotlari</h2>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <div
        v-for="product in samsungProductsStore.iphoneProducts"
        :key="product._id"
        class="border rounded-lg p-4 shadow-md"
      >
        <img
          :src="axiosInstance.defaults.baseURL + product.image"
          alt="Mahsulot rasmi"
          class="w-full h-48 object-contain mb-4"
        />
        <div class="flex items-center gap-2 mb-2">
          <IconStar class="w-4 h-4 text-yellow-400" />
          <span class="text-sm font-medium">4.8</span>
        </div>
        <p class="font-semibold">{{ product.name }}</p>
        <p class="text-gray-600">{{ product.price }}$</p>
        <router-link
          to="/dashboard"
          class="text-blue-500 hover:underline block mb-2"
        >
          Batafsil...
        </router-link>
        <a-button
          :loading="buttonLoaders[product._id]"
          :disabled="!product.left"
          @click="basket(product._id)"
          class="w-full"
          size="large"
          type="primary"
        >
          Savatga ({{ product.left || 0 }} ta qoldi)
        </a-button>
      </div>
    </div>
  </template>
</template>
