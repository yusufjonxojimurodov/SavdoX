<script setup>
import { onMounted, reactive } from 'vue';
import useProducts from '../../../store/products.pinia';
import { storeToRefs } from 'pinia';
import { axiosInstance } from '../../../utils/api/api.js';
import IconStar from '../../../components/icons/IconStar.vue';
import useRegister from '../../../store/register.pinia';

const registerStore = useRegister()
const productsStore = useProducts()
const { products } = storeToRefs(productsStore)

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

onMounted(() => {
    productsStore.getProducts()
})
</script>

<template>
    <div class="container">
        <template v-if="products.length > 0">
            <div class="flex justify-start flex-wrap items-center gap-6 !mt-8">
                <div class="product transition duration-500 bg-[#1E1E1E] w-[300px] h-[450px] cursor-pointer flex justify-center items-center flex-col gap-[40px] !p-[20px] rounded-[30px] shadow-[0_4px_12px_rgba(0,0,0,0.6)]"
                    v-for="product in products" :key="product._id">
                    <img :src="axiosInstance.defaults.baseURL + product.image" alt="Mahsulot rasmi"
                        class="w-[400px]  h-[180px] rounded-2xl transition duration-500" />
                    <div class="flex justify-start flex-col w-full items-start gap-[10px]">
                        <p class="text-[24px] text-[#EAEAEA] font-semibold">{{ product.name }}</p>
                        <p class="text-[18px]  text-[#FFD700] w-[70px] rounded-[10px] font-semibold">{{ product.price
                        }}$</p>
                        <p class="text-[14px] text-[#B0B0B0]">{{ product.description.slice(0, 80) }} <router-link
                                to="/dashboard"
                                class="text-[14px] !text-[#c1c1c1] text-medium">Batafsil...</router-link></p>
                        <div class="flex justify-between items-center w-full">
                            <div class="flex justify-start items-center gap-2 w-full">
                                <p class="text-[14px] text-[#FFD700] font-medium">4.6</p>
                                <icon-star />
                            </div>

                            <p class="text-[14px] text-[#888] font-medium">{{ product.model }}</p>
                        </div>

                        <a-button :loading="buttonLoaders[product._id]" @click="basket(product._id)" class="w-full"
                            size="large" type="primary">Savatga ({{ product.left || "topilmadi" }} ta qoldi)</a-button>
                    </div>
                </div>
            </div>
        </template>


        <template v-else>
            <a-empty description="Mahsulotlar topilmadi" style="color: white; margin-top: 150px;" />
        </template>
    </div>
</template>

<style>
.product:hover {
    background-color: #252525;

    img {
        transform: scale(1.05);
    }
}
</style>