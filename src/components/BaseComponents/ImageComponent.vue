<script setup>
import { watch } from 'vue'
import useImage from '@/store/image.pinia'

const props = defineProps({
    product: Object,
    image: String,
    view: Boolean
})

const imageStore = useImage()

watch(
    () => props.product.id,
    (id) => {
        const val = props.product

        if (id && val?.images?.length) {
            imageStore.getImagesByProduct(val.images, id)
        }
    },
    { immediate: true }
)
</script>

<template>
    <div v-if="imageStore.loading[product.id]"
        class="flex justify-center items-center h-[100px] sm:h-[150px] !w-full bg-gray-50 rounded-2xl overflow-hidden">
        <a-skeleton-image :active="true" />
    </div>
    <a-image v-else-if="view" @click.stop :src="image" alt="product-image" />
    <img v-else :src="image" alt="product-image">
</template>