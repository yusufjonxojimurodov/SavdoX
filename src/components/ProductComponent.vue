<script setup>
defineProps({
    product: Object,
    buttonLoading: Boolean
})

defineEmits(['select', 'add-to-basket'])
</script>

<template>
        <div class="product !w-[230px] sm:!w-[300px] relative !transition duration-500  bg-[#F8EDEB] !flex flex-col !justify-between !p-3 sm:!p-5 md:!p-6 !rounded-[30px] md:!rounded-[30px] !mt-4 cursor-pointer !h-[450px] sm:!h-[500px]"
            @click="$emit('select', product._id)">
            <a-image @click.stop :src="product.image" alt="Product image"
                class="w-full !h-[240px] object-contain transition duration-300 rounded-2xl" />

            <div v-if="product.discount"
                class="w-[60px] flex justify-center items-center !p-4 bg-[#FF8C00] absolute top-0 right-0 rounded-tr-[30px] rounded-bl-[30px]">
                <p class="text-white !font-semibold text-[16px]">-{{ product.discount }}%</p>
            </div>

            <div class="!flex flex-col !gap-2 sm:!gap-3 !flex-1">
                <p class="text-[16px] sm:text-[20px] md:text-[24px] text-[#212529] !font-semibold">{{ product.name }}
                </p>

                <div class="flex justify-between items-center">
                    <div class="flex items-center gap-2">
                        <p :class="[
                            'text-[14px] sm:text-[16px] md:text-[18px] !font-semibold',
                            product.discountPrice !== product.price
                                ? '!line-through !opacity-80 text-[#53718f]'
                                : 'text-[#34495E]'
                        ]">
                            {{ product.price }}$
                        </p>
                        <p v-if="product.discountPrice !== product.price"
                            class="text-[#34495E] text-[14px] sm:text-[16px] md:text-[18px] !font-semibold">
                            {{ product.discountPrice }}$
                        </p>
                    </div>
                </div>

                <div>
                    <p class="text-[#343A40] text-[12px] sm:text-[13px] md:text-[14px]">
                        {{ product.description.slice(0, 80) }} <span
                            class="!text-[#6C757D] text-medium text-[12px] sm:text-[13px] md:text-[14px]">
                            Batafsil...</span>
                    </p>
                </div>

                <div class="flex justify-between items-center w-full">
                    <div class="flex items-center gap-1 sm:gap-2 w-full">
                        <p
                            class="flex justify-center items-center gap-2 text-[#FF8C00] text-[12px] sm:text-[16px] !font-semibold">
                            <img width="30px" height="30px" src="../assets/images/happy-icon.svg" alt="happy-icon"> {{
                                product.rating.happy }}%
                        </p>
                        <p
                            class="flex justify-center items-center gap-2 text-red-500 text-[12px] sm:text-[16px] !font-semibold">
                            <img width="30px" height="30px" src="../assets/images/sad-icon.svg" alt="sad-icon"> {{
                                product.rating.unhappy }}%
                        </p>
                    </div>
                    <p class="text-[#888] text-[12px] sm:text-[14px] font-medium">{{ product.model ===
                        "Other" ? "Boshqalar" : product.model }}</p>
                </div>
            </div>

            <a-button :disabled="product.left === 0" :loading="buttonLoading"
                @click.stop="$emit('add-to-basket', product._id)"
                class="basketGo w-full !text-[12px] !mt-5 sm:!text-[14px] md:!text-[16px]" size="large" type="primary">
                Savatga ({{ product.left || "0" }} ta qoldi)
            </a-button>
        </div>
</template>

<style scoped>
.product:hover {
    img {
        transform: scale(1.05);
    }
}

.ant-image-preview-operations span {
    background-color: #fff !important;
    border-radius: 4px;
    color: #000 !important;
    padding: 2px;
}

:deep(.basketGo[disabled]) {
    opacity: 0.7 !important;
    cursor: not-allowed !important;
}
</style>