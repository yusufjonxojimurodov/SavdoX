<script setup>
import { computed, ref } from 'vue';
import useProducts from '@/store/products.pinia';
import useRegister from '@/store/register.pinia';
import useQueryParams from '@/composables/useQueryParams';

const productsStore = useProducts()
const userStore = useRegister()
const { getQueries } = useQueryParams()

const open = defineModel("open", { type: Boolean, default: false })

const complaintModel = ref({
    message: ""
})

const productId = computed(() => getQueries().productId)

async function complaintProduct() {
    const form = {
        name: userStore.user.name,
        surname: userStore.user.surname,
        userName: userStore.user.userName,
        phone: userStore.user.phone,
        message: complaintModel.value.message
    }

    await productsStore.deportProduct(productId.value, form)

    form.value = {}
    complaintModel.value.message = ""

    open.value = false
}
</script>

<template>
    <a-modal centered :footer="null" v-model:open="open">
        <a-form layout="vertical" :model="complaintModel">
            <a-form-item :rules="[{ required: true, message: 'Majburiy maydon' }]" name="message" label="Shikoyatingiz">
                <a-textarea :auto-size="{ minRows: 1, maxRows: 6 }" size="large" class="!resize-none"
                    placeholder="Shikoyatingiz xabari" v-model:value="complaintModel.message" />
            </a-form-item>
        </a-form>

        <div class="flex justify-end items-center gap-2">
            <a-button size="large" @click="open = false">
                Yopish
            </a-button>
            <a-button :loading="productsStore.buttonLoader" @click="complaintProduct"
                :disabled="complaintModel.message.length === 0" type="primary" size="large">
                Shikoyat
            </a-button>
        </div>
    </a-modal>
</template>