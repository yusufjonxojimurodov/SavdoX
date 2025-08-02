<script setup>
import { storeToRefs } from 'pinia';
import { axiosInstance } from '../../../utils/api/api.js';
import useProducts from '../../../store/products.pinia';
import { onMounted, ref, computed, onUnmounted } from 'vue';
import IconStar from '../../../components/icons/IconStar.vue';
import QuantitiyComponent from '../../../components/QuantitiyComponent.vue';
import { message } from 'ant-design-vue';
import IconTrash from '../../../components/icons/IconTrash.vue';
import useRegister from '../../../store/register.pinia.js';

const productStore = useProducts()
const { basketProducts } = storeToRefs(productStore)
const registerStore = useRegister()
const quantities = ref({})
const selectedCards = ref([])
const isFooterVisible = ref(false);
let observer = null;

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
    registerStore.userInfo()
    await productStore.basketProductGet()
    basketProducts.value.forEach(item => {
        quantities.value[item._id] = item.quantity
    })

    const footer = document.querySelector("footer");
    if (!footer) return;

    observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                isFooterVisible.value = entry.isIntersecting;
            });
        },
        { threshold: 0.1 }
    );

    observer.observe(footer);
})

onUnmounted(() => {
    if (observer) observer.disconnect();
});
</script>

<template>
    <div class="container flex flex-col lg:flex-row gap-[30px] !mt-[100px]">
        <div class="flex-1 flex flex-col gap-[40px]">
            <template v-if="basketProducts.length > 0">
                <div v-for="basketProduct in basketProducts" :key="basketProduct._id"
                    @click="toggleSelect(basketProduct._id)" :class="[
                        'flex flex-col sm:flex-row justify-start items-center transition duration-500 w-full lg:w-[900px] h-auto sm:h-[350px] cursor-pointer gap-[20px] sm:gap-[40px] !p-[20px] rounded-[30px] shadow-[0_4px_12px_rgba(0,0,0,0.6)]',
                        selectedCards.includes(basketProduct._id)
                            ? 'bg-[#2E2E2E] border-2 border-[#FFD700]'
                            : 'bg-[#1E1E1E] border-2 border-transparent'
                    ]">
                    <img :src="axiosInstance.defaults.baseURL + basketProduct.product.image" alt="Mahsulot rasmi"
                        class="w-full sm:w-[400px] h-[200px] sm:h-[320px] object-cover rounded-2xl transition duration-500" />

                    <div class="flex justify-center items-start flex-col gap-[20px] w-full sm:w-auto">
                        <p class="text-[20px] sm:text-[24px] text-[#EAEAEA] font-semibold">
                            {{ basketProduct.product.name }}
                        </p>
                        <p class="text-[16px] sm:text-[18px] text-[#FFD700] w-[70px] rounded-[10px] font-semibold">
                            {{ basketProduct.product.price }}$
                        </p>
                        <p class="text-[14px] sm:text-[14px] w-full sm:w-[300px] text-[#B0B0B0]">
                            {{ basketProduct.product.description }}
                        </p>
                        <div class="flex justify-start gap-[10px] items-center">
                            <div class="flex justify-start items-center gap-2">
                                <p class="text-[14px] text-[#FFD700] font-medium">4.6</p>
                                <icon-star />
                            </div>
                            <p class="text-[14px] text-[#888] font-medium">
                                {{ basketProduct.product.model }}
                            </p>
                        </div>
                        <QuantitiyComponent @click.stop v-model="quantities[basketProduct._id]"
                            :model-value="basketProduct.quantity" :max="basketProduct.product.left" />
                    </div>
                </div>
            </template>
            <template v-else>
                <a-empty style="color: white; margin-top: 150px;" description="Savatchingiz bo'sh" />
            </template>
        </div>

        <div v-show="!isFooterVisible" class="bg-[#1E1E1E] !p-[15px] rounded-t-[20px] lg:rounded-[20px] shadow-lg flex flex-col gap-3 
             fixed bottom-0 left-0 w-full z-50 
             lg:w-[300px] lg:gap-4 lg:p-[20px] lg:h-fit lg:sticky lg:top-10 transition-all duration-300">
            <div class="flex justify-between items-center">
                <h3 class="text-white text-lg lg:text-xl font-semibold">Tanlanganlar</h3>
                <div class="trash-icon-wrapper cursor-pointer relative">
                    <a-button @click="deleteSelectedProducts" :disabled="selectedCards.length === 0" size="middle"
                        type="primary" class="lg:size-large">
                        <IconTrash />
                    </a-button>
                </div>
            </div>
            <p class="text-gray-300 text-sm lg:text-base">
                Jami:
                <span class="text-yellow-400 text-lg font-bold">{{ totalPrice }}$</span>
            </p>
            <a-button @click="selectAll" type="primary" block size="middle" class="lg:size-large">
                {{ selectedCards.length === basketProducts.length ? "Hammasini bekor qilish" : "Hammasini tanlash" }}
            </a-button>
            <a-button @click="buySelected" type="primary" block size="middle" :disabled="selectedCards.length === 0"
                class="lg:size-large">
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