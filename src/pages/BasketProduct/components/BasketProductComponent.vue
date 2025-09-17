<script setup>
import { storeToRefs } from 'pinia';
import useProducts from '../../../store/products.pinia';
import usePendingProduct from '../../../store/product.pending.pinia';
import { onMounted, ref, computed, onUnmounted, watch } from 'vue';
import IconStar from '../../../components/icons/IconStar.vue';
import QuantitiyComponent from '../../../components/QuantitiyComponent.vue';
import { message } from 'ant-design-vue';
import IconTrash from '../../../components/icons/IconTrash.vue';
import useRegister from '../../../store/register.pinia.js';
import IconBack from '../../../components/icons/IconBack.vue';

import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

const productStore = useProducts()
const pendingProductStore = usePendingProduct()
const { basketProducts } = storeToRefs(productStore)
const registerStore = useRegister()

const quantities = ref({})
const selectedCards = ref([])
const isFooterVisible = ref(false);

let observer = null;

// 📍 Location tanlash uchun
const showMap = ref(false)
const tempLocation = ref({ lat: 41.2995, lng: 69.2401 }) // default Toshkent
const mapEl = ref(null)
let map = null
let marker = null

const totalPrice = computed(() => {
    return basketProducts.value
        .filter(item => selectedCards.value.includes(item._id))
        .reduce((sum, item) => {
            const priceToUse = item.product.discountPrice ?? item.product.price
            return sum + (priceToUse * quantities.value[item._id])
        }, 0)
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

async function deleteSelectedProducts() {
    try {
        await productStore.deleteBasketProduct(selectedCards.value);
        message.success("Savatchadan mahsulot o'chirildi")
    } catch (error) {
        message.error(error)
    }
}

// 📍 Sotib olish tugmasi bosilganda map ochiladi
function openMap() {
    if (selectedCards.value.length === 0) {
        return message.warning("Hech qanday mahsulot tanlanmagan!");
    }
    showMap.value = true
}

function addLocateButton() {
    const locateControl = L.control({ position: 'topleft' }) // chap yuqorida chiqadi

    locateControl.onAdd = function () {
        const div = L.DomUtil.create('div', 'leaflet-bar leaflet-control leaflet-control-custom')
        div.innerHTML = '📍'
        div.style.backgroundColor = 'white'
        div.style.width = '34px'
        div.style.height = '34px'
        div.style.display = 'flex'
        div.style.alignItems = 'center'
        div.style.justifyContent = 'center'
        div.style.cursor = 'pointer'
        div.title = "Men qayerdaman"

        div.onclick = () => detectLocation()

        return div
    }

    locateControl.addTo(map)
}

function initMap() {
    if (!mapEl.value) return;

    // Agar eski map bo‘lsa o‘chirib tashlaymiz
    if (map) {
        map.remove();
        map = null;
    }

    map = L.map(mapEl.value).setView([tempLocation.value.lat, tempLocation.value.lng], 12)

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map)

    marker = L.marker([tempLocation.value.lat, tempLocation.value.lng], { draggable: true }).addTo(map)

    marker.on('dragend', () => {
        const pos = marker.getLatLng()
        tempLocation.value = { lat: pos.lat, lng: pos.lng }
    })

    // 📍 kartaga bosib marker qo‘yish
    map.on('click', (e) => {
        tempLocation.value = { lat: e.latlng.lat, lng: e.latlng.lng }
        marker.setLatLng([e.latlng.lat, e.latlng.lng])
    })

    addLocateButton()
}

// 📍 User joylashuvini aniqlash
function detectLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((pos) => {
            tempLocation.value = { lat: pos.coords.latitude, lng: pos.coords.longitude }
            map.setView([tempLocation.value.lat, tempLocation.value.lng], 14)
            marker.setLatLng([tempLocation.value.lat, tempLocation.value.lng])
        })
    } else {
        message.warning("Brauzer joylashuvni aniqlay olmaydi")
    }
}

// 📍 Tasdiqlash tugmasi
async function confirmLocationAndBuy() {
    const orders = selectedCards.value.map(id => ({
        productId: id,
        quantity: quantities.value[id]
    }))

    const information = {
        orders,
        phone: registerStore.user.phone,
        userName: registerStore.user.userName,
        buyerChatId: registerStore.user.chatId,
        location: tempLocation.value   // 🔥 joylashuv qo‘shildi
    }

    try {
        await pendingProductStore.ApiPostPendingProduct(information)
        productStore.deleteBasketProduct(selectedCards.value)
        showMap.value = false
        message.success("Buyurtma qabul qilindi!")
    } catch (err) {
        message.error("Xatolik yuz berdi")
    }

    window.location.reload()
}

onMounted(async () => {
    registerStore.userInfo()
    await productStore.basketProductGet()
    basketProducts.value.forEach(item => {
        quantities.value[item._id] = item.quantity
    })

    if (window.innerWidth <= 460) {
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
    } else {
        isFooterVisible.value = false;
    }
})

onUnmounted(() => {
    if (observer) observer.disconnect();
});

// 🔥 Modal ochilganda har safar map init qilish
watch(showMap, (val) => {
    if (val) {
        setTimeout(initMap, 200);
    }
})
</script>

<template>
    <section>
        <router-link to="/"
            class="!text-white text-[24px] !p-[10px] font-semibold flex justify-start items-center gap-2">
            <icon-back />Bosh Sahifaga
        </router-link>

        <div class="container flex flex-col lg:flex-row gap-[30px] !mt-[40px]">
            <div class="flex-1 flex flex-col gap-[40px]">
                <template v-if="basketProducts.length > 0">
                    <div v-for="basketProduct in basketProducts" :key="basketProduct._id"
                        @click="toggleSelect(basketProduct._id)" :class="[
                            'flex flex-col sm:flex-row justify-start relative items-center transition duration-500 w-full lg:w-[900px] h-auto sm:h-[350px] cursor-pointer gap-[20px] sm:gap-[40px] !p-[20px] rounded-[30px] shadow-[0_4px_12px_rgba(0,0,0,0.6)]',
                            selectedCards.includes(basketProduct._id)
                                ? 'bg-[#2E2E2E] border-2 border-[#FFD700]'
                                : 'bg-[#1E1E1E] border-2 border-transparent'
                        ]">
                        <img :src="basketProduct.product.image" alt="Mahsulot rasmi"
                            class="w-full h-[240px] rounded-2xl transition duration-500 object-contain" />

                        <div v-if="basketProduct.product.discount"
                            class="w-[60px] flex justify-center items-center !p-4 bg-red-700 absolute top-0 right-0 rounded-tr-[30px] rounded-bl-[30px]">
                            <p class="text-white !font-semibold text-[16px]">-{{ basketProduct.product.discount }}%</p>
                        </div>
                        <div class="flex justify-center items-start flex-col gap-[20px] w-full sm:w-auto">
                            <p class="text-[20px] sm:text-[24px] text-[#EAEAEA] font-semibold">
                                {{ basketProduct.product.name }}
                            </p>
                            <div class="!flex justify-start items-center gap-2">
                                <p :class="[
                                    'text-[14px] sm:text-[16px] md:text-[18px] rounded-[10px] font-semibold',
                                    basketProduct.product.discountPrice !== basketProduct.product.price ? '!line-through !opacity-80 text-gray-400' : 'text-[#FFD700]'
                                ]">
                                    {{ basketProduct.product.price }}$
                                </p>
                                <p v-if="basketProduct.product.discountPrice !== basketProduct.product.price"
                                    class="text-[14px] sm:text-[16px] md:text-[18px] text-[#FFD700] font-semibold">
                                    {{ basketProduct.product.discountPrice }}$
                                </p>
                            </div>
                            <p class="text-[14px] sm:text-[14px] w-full sm:w-[300px] text-[#B0B0B0]">
                                {{ basketProduct.product.description }}
                            </p>
                            <div class="flex justify-start gap-[10px] items-center">
                                <p class="text-[14px] text-[#888] font-medium">
                                    {{ basketProduct.product.model }}
                                </p>
                            </div>
                            <quantitiy-component @click.stop v-model="quantities[basketProduct._id]"
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
                    {{ selectedCards.length === basketProducts.length ? "Hammasini bekor qilish" : "Hammasini tanlash"
                    }}
                </a-button>
                <a-button @click="openMap" type="primary" block size="middle" :disabled="selectedCards.length === 0"
                    class="lg:size-large">
                    Sotib olish
                </a-button>
            </div>
        </div>

        <a-modal v-model:open="showMap" title="Joylashuvni tanlang" :width="800" :footer="null">
            <div ref="mapEl" style="height:400px; border-radius:10px; margin-bottom: 10px;"></div>

            <div class="flex justify-end items-center !mt-4 gap-4">
                <a-button size="large" @click="showMap = false">Bekor qilish</a-button>
                <a-button :loading="pendingProductStore.loader" size="large" type="primary"
                    @click="confirmLocationAndBuy">Tasdiqlash</a-button>
            </div>
        </a-modal>
    </section>
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