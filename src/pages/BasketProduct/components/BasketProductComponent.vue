<script setup>
import { storeToRefs } from 'pinia';
import { axiosInstance } from '../../../utils/api/api.js';
import useProducts from '../../../store/products.pinia';
import { onMounted, ref, computed } from 'vue';
import IconStar from '../../../components/icons/IconStar.vue';
import QuantitiyComponent from '../../../components/QuantitiyComponent.vue';
import { message } from 'ant-design-vue';
import IconTrash from '../../../components/icons/IconTrash.vue';

const productStore = useProducts()
const { basketProducts } = storeToRefs(productStore)

const quantities = ref({})
const selectedCards = ref([])

const totalPrice = computed(() => {
    return basketProducts.value
        .filter(item => selectedCards.value.includes(item._id))
        .reduce((sum, item) => sum + (item.product.price * quantities.value[item._id]), 0)
})

function selectAll() {
    if (selectedCards.value.length === basketProducts.value.length) {
        selectedCards.value = []
    } else {
        selectedCards.value = basketProducts.value.map(item => item._id)
    }
}

function toggleSelect(id) {
    if (selectedCards.value.includes(id)) {
        selectedCards.value = selectedCards.value.filter(i => i !== id)
    } else {
        selectedCards.value.push(id)
    }
}

async function buySelected() {
    if (selectedCards.value.length === 0) {
        return message.warning("Hech qanday mahsulot tanlanmagan!");
    }

    try {
        await axiosInstance.post("/basket/checkout", {
            products: selectedCards.value
        });
        message.success("Tanlangan mahsulotlar sotib olindi!");
        selectedCards.value = [];
    } catch (err) {
        message.error("Xatolik yuz berdi!");
    }
}

function deleteSelectedProducts() {
    productStore.deleteBasketProduct(selectedCards.value);
    selectedCards.value = [];
}


onMounted(async () => {
    await productStore.basketProductGet()
    basketProducts.value.forEach(item => {
        quantities.value[item._id] = item.quantity
    })
})
</script>

<template>
    <div class="container flex gap-[30px] !mt-[100px]">
        <div class="flex-1 flex flex-col gap-[40px]">
            <template v-if="basketProducts.length > 0">
                <div v-for="basketProduct in basketProducts" :key="basketProduct._id"
                    @click="toggleSelect(basketProduct._id)"
                    :class="['flex justify-start items-center transition duration-500 w-[900px] h-[350px] cursor-pointer gap-[40px] !p-[20px] rounded-[30px] shadow-[0_4px_12px_rgba(0,0,0,0.6)]',
                        selectedCards.includes(basketProduct._id) ? 'bg-[#2E2E2E] border-2 border-[#FFD700]' : 'bg-[#1E1E1E] border-2 border-transparent']">

                    <img :src="axiosInstance.defaults.baseURL + basketProduct.product.image" alt="Mahsulot rasmi"
                        class="w-[400px] h-[320px] rounded-2xl transition duration-500" />

                    <div class="flex justify-center items-start flex-col gap-[20px]">
                        <p class="text-[24px] text-[#EAEAEA] font-semibold">{{ basketProduct.product.name }}</p>
                        <p class="text-[18px] text-[#FFD700] w-[70px] rounded-[10px] font-semibold">
                            {{ basketProduct.product.price }}$
                        </p>
                        <p class="text-[14px] w-[300px] text-[#B0B0B0]">
                            {{ basketProduct.product.description }}
                        </p>
                        <div class="flex justify-start gap-[10px] items-center">
                            <div class="flex justify-start items-center gap-2">
                                <p class="text-[14px] text-[#FFD700] font-medium">4.6</p>
                                <icon-star />
                            </div>
                            <p class="text-[14px] text-[#888] font-medium">{{ basketProduct.product.model }}</p>
                        </div>
                        <QuantitiyComponent @click.stop v-model="quantities[basketProduct._id]"
                            :model-value="basketProduct.quantity" />
                    </div>
                </div>
            </template>
            <template v-else>
                <a-empty style="color: white; margin-top: 150px;" description="Savatchangiz bo'sh" />
            </template>
        </div>

        <div class="w-[300px] bg-[#1E1E1E] !p-[20px] rounded-[20px] shadow-lg flex flex-col gap-4 h-fit sticky top-10">
            <div class="flex justify-between items-center">
                <h3 class="text-white text-xl font-semibold">Tanlanganlar</h3>
                <div class="trash-icon-wrapper cursor-pointer relative">
                    <a-button @click="deleteSelectedProducts" :disabled="selectedCards.length === 0" size="large"
                        type="primary">
                        <IconTrash />
                    </a-button>
                </div>

            </div>
            <p class="text-gray-300">Jami: <span class="text-yellow-400 text-lg font-bold">{{ totalPrice }}$</span>
            </p>
            <a-button @click="selectAll" type="primary" block>
                {{ selectedCards.length === basketProducts.length ? "Hammasini bekor qilish" : "Hammasini tanlash"
                }}
            </a-button>
            <a-button @click="buySelected" type="primary" block size="large" :disabled="selectedCards.length === 0">
                Sotib olish
            </a-button>
        </div>
    </div>
</template>

<style scoped>
.trash-icon-wrapper {
    position: relative;
}

.trash-icon-wrapper:hover::after {
    content: "Savatchadan o'chirish";
    font-size: 10px;
    color: white;
    position: absolute;
    top: 50%;
    right: 100%;
    transform: translateY(-50%);
    background: rgba(0, 0, 0, 0.7);
    padding: 4px 8px;
    border-radius: 4px;
    white-space: nowrap;
}

:deep(.ant-btn[disabled]) {
    opacity: 0.4 !important;
    border: none;
    color: #fff !important;
    cursor: not-allowed !important;
}
</style>