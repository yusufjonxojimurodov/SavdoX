<script setup>
import { ref, computed } from "vue";
import useProductInfo from "@/store/products.info.pinia";
import ImageSkeleton from "../skeleton-components/ImageSkeleton.vue";
import ImageComponent from "@/components/BaseComponents/ImageComponent.vue";
import useImage from "@/store/image.pinia";

const productInfoStore = useProductInfo();
const imageStore = useImage()

const images = computed(() => imageStore.urls[productInfoStore.product.id] || [' ']);

const selectedIndex = ref(0);

function selectImage(index) {
    selectedIndex.value = index;
}
</script>

<template>
    <div v-if="images.length" class="flex flex-col-reverse md:!flex-row gap-6 items-start">
        <div class="flex items-center justify-center !mb-5 w-full md:flex-col md:w-[20%] gap-3">
            <div v-for="(img, index) in images" :key="index"
                class="w-22 h-22 cursor-pointer overflow-hidden rounded-2xl border-2 transition-all duration-300"
                :class="selectedIndex === index ? 'border-[#FF8C00]' : 'border-gray-300'" @click="selectImage(index)">
                <image-component :view="false" @click="selectImage(index)" :image="img" :product="productInfoStore.product"
                    :class="selectedIndex === index ? 'border-[#FF8C00]' : 'border-gray-300'"
                    class="w-full h-full object-contain hover:scale-110 transition-transform duration-300" />
            </div>
        </div>

        <div class="relative w-[99%] h-[435px] md:!w-[450px] lg:!w-[500px] overflow-hidden rounded-[30px] shadow-lg">
            <transition name="fade" mode="out-in">
                <img v-if="images[selectedIndex]" :key="images[selectedIndex]" :src="images[selectedIndex]"
                    alt="selected" class="w-full h-full object-contain" />
            </transition>
        </div>
    </div>

    <image-skeleton v-else />
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
