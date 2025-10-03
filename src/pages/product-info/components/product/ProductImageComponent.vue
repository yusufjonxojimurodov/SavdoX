<script setup>
import { ref, computed } from "vue";
import useProductInfo from "@/store/products.info.pinia";

const productInfoStore = useProductInfo();

const images = computed(() => productInfoStore.product?.images || []);

const selectedIndex = ref(0);

function selectImage(index) {
    selectedIndex.value = index;
}
</script>

<template>
    <div v-if="images.length" class="flex flex-col-reverse sm:!flex-row gap-6 items-start">
        <div class="flex items-center justify-center !mb-5 w-full sm:flex-col sm:w-[20%] gap-3">
            <div v-for="(img, index) in images" :key="index"
                class="w-22 h-22 cursor-pointer overflow-hidden rounded-lg border-2 transition-all duration-300"
                :class="selectedIndex === index ? 'border-[#FF8C00]' : 'border-gray-300'" @click="selectImage(index)">
                <img :src="img" alt="thumbnail"
                    class="w-full h-full object-contain hover:scale-110 transition-transform duration-300" />
            </div>
        </div>

        <div class="relative w-[99%] h-[400px] sm:!w-[500px] overflow-hidden rounded-2xl shadow-lg">
            <transition name="fade" mode="out-in">
                <img v-if="images[selectedIndex]" :key="images[selectedIndex]" :src="images[selectedIndex]"
                    alt="selected" class="w-full h-full object-contain" />
            </transition>
        </div>
    </div>

    <div v-else class="text-gray-500">Rasmlar yuklanmoqda...</div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.4s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>
