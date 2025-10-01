<script setup>
import useProductInfo from "@/store/products.info.pinia";
import { storeToRefs } from "pinia";
import { ShoppingCartOutlined, WarningOutlined } from "@ant-design/icons-vue";
import useRegister from '@/store/register.pinia';
import useProducts from '@/store/products.pinia';
import { ref } from "vue";
import useQueryParams from "@/composables/useQueryParams";
import ComplaintModalComponent from "@/components/ComplaintModalComponent.vue";

const { setQueries } = useQueryParams()
const productInfoStore = useProductInfo();
const registerStore = useRegister()
const productsStore = useProducts()
const { product } = storeToRefs(productInfoStore);

const buttonLoaders = ref(false)
const openComplaintModal = ref(false)

async function basket(id) {
    if (registerStore.user === "") {
        registerStore.openModal()
        return
    } else {
        buttonLoaders.value = true
        try {
            await productsStore.basketProduct({
                productId: id,
                quantity: 1
            })
        } finally {
            buttonLoaders.value = false
        }
    }
}

function deport(id) {
    if (registerStore.user) {
        setQueries({
            productId: id
        })
        openComplaintModal.value = true
    } else {
        registerStore.openModal()
    }
}
</script>

<template>
    <div class="flex flex-col gap-6 max-w-[500px]">
        <div>
            <h1 class="!font-bold text-2xl">{{ product.name }}</h1>

            <p class="text-[#444] !w-[360px] sm:!w-[380px] !text-base !leading-relaxed">
                {{ product.description }}
            </p>
        </div>

        <div class="flex items-center gap-3">
            <span :class="[
                'text-xl font-semibold',
                product.discountPrice !== product.price
                    ? '!line-through text-gray-500 opacity-70'
                    : 'text-black'
            ]">
                {{ product.price }}$
            </span>

            <span v-if="product.discountPrice !== product.price" class="text-xl font-bold text-[#d32f2f]">
                {{ product.discountPrice }}$
            </span>
        </div>

        <div class="text-sm text-gray-600 space-y-1">
            <p><b>Model:</b> {{ product.model }}</p>
            <p><b>Turi:</b> {{ product.type }}</p>
            <p><b>Omborda qoldi:</b> {{ product.left }} dona</p>
        </div>

        <div class="flex gap-3 !mt-4">
            <a-button @click="basket(product._id)" :loading="buttonLoaders" type="primary" size="large"
                class="!flex items-center gap-2">
                Savatchaga
                <template #icon>
                    <ShoppingCartOutlined />
                </template>
            </a-button>

            <a-button @click="deport(product._id)" danger size="large" class="!flex items-center gap-2">
                Shikoyat qilish
                <template #icon>
                    <WarningOutlined />
                </template>
            </a-button>
        </div>
    </div>

    <complaint-modal-component v-model:open="openComplaintModal" />
</template>
