<script setup>
import { ref, reactive } from 'vue';
import { message } from 'ant-design-vue';
import useProducts from '../../../../store/products.pinia';
import useMeProduct from '../../../../store/product.me';

const productMeStore = useMeProduct()
const productsStore = useProducts()
const props = defineProps({ open: Boolean });
const emit = defineEmits(['update:open']);

const createProduct = reactive({
    name: "",
    description: "",
    price: "",
    image: "",
    left: "",
    model: null,
});

const fileList = ref([])
const formRef = ref(null)
const submitLoading = ref(false)

const validateImage = () => {
    return fileList.value && fileList.value.length > 0
        ? Promise.resolve()
        : Promise.reject(new Error('Rasm yuklash shart!'));
};

const models = [
    { label: 'Samsung', value: 'Samsung' },
    { label: 'Xiaomi', value: 'Xiaomi' },
    { label: 'Apple', value: 'Apple' },
    { label: 'Google', value: 'Google' },
    { label: 'Boshqa', value: 'Other' },
]

async function createProductDashboard() {
    try {
        submitLoading.value = true;
        await productsStore.createProduct({
            ...createProduct,
            model: createProduct.model || null,
            image: fileList.value.length ? fileList.value[0].originFileObj : null
        });
        emit('update:open', false);
        productMeStore.GetMeProduct()
        resetForm();
    } catch (err) {
        message.error("Xatolik yuz berdi");
    } finally {
        submitLoading.value = false;
    }
}

function cancel() {
    emit('update:open', false);
    resetForm();
}

function resetForm() {
    fileList.value = [];
    createProduct.name = "";
    createProduct.description = "";
    createProduct.price = "";
    createProduct.left = "",
        createProduct.model = null;
}
</script>

<template>
    <a-modal :get-container="false" @close="cancel" @update:open="emit('update:open', $event)" :open="props.open"
        title="Mahsulot yaratish" footer="">
        <a-form ref="formRef" @finish="createProductDashboard" :model="createProduct" layout="vertical" class="!mt-10">
            <a-row :gutter="[16, 16]">
                <a-col :span="12">
                    <a-form-item name="name" label="Mahsulot Nomi"
                        :rules="[{ required: true, message: 'Majburiy Maydon!' }]">
                        <a-input size="large" v-model:value="createProduct.name" placeholder="Mahsulot nomi" />
                    </a-form-item>
                </a-col>
                <a-col :span="12">
                    <a-form-item name="model" label="Model" :rules="[{ required: true, message: 'Majburiy Maydon!' }]">
                        <a-select size="large" v-model:value="createProduct.model" placeholder="Modelini tanlang"
                            :options="models" allowClear />
                    </a-form-item>
                </a-col>
            </a-row>

            <a-row :gutter="[16, 16]">
                <a-col :span="12">
                    <a-form-item name="description" label="Mahsulot Haqida"
                        :rules="[{ required: true, message: 'Majburiy Maydon!' }]">
                        <a-textarea class="textArea" v-model:value="createProduct.description" :rows="4" show-count
                            :maxlength="100" placeholder="Mahsulot haqida batafsil yozing" />
                    </a-form-item>
                </a-col>
                <a-col :span="12">
                    <a-form-item name="price" label="Mahsulot qoldig'i va narxi"
                        :rules="[{ required: true, message: 'Majburiy Maydon!' }]">
                        <a-input size="large" v-model:value="createProduct.price" type="number" placeholder="Narxi" />
                    </a-form-item>

                    <a-form-item name="left" :rules="[{ required: true, message: 'Majburiy Maydon!' }]">
                        <a-input type="number" v-model:value="createProduct.left" size="large"
                            placeholder="Nechta qolganini yozing" />
                    </a-form-item>
                </a-col>
            </a-row>

            <a-form-item name="image" label="Rasm" :rules="[{ validator: validateImage }]">
                <a-upload accept=".jpg,.png,.webp,.jfif" v-model:fileList="fileList" :before-upload="() => false"
                    list-type="picture-card" :max-count="1">
                    <template v-if="fileList.length === 0">
                        <p>Rasm yuklash</p>
                    </template>
                </a-upload>
            </a-form-item>

            <div class="flex justify-end gap-4 mt-6">
                <a-button size="large" @click="cancel">Bekor qilish</a-button>
                <a-button type="primary" html-type="submit" size="large" :loading="submitLoading"
                    class="!bg-gray-800 hover:!bg-gray-900 !border-none">
                    Yaratish
                </a-button>
            </div>
        </a-form>
    </a-modal>
</template>

<style scoped>
:deep(.textArea textarea) {
    resize: none !important;
}

:deep(.ant-form-item-label > label) {
    color: #fff !important;
}

:deep(.ant-input-textarea-show-count::after) {
    color: #fff !important;
}

:deep(.ant-upload-picture-card-wrapper .ant-upload.ant-upload-select-picture-card) {
    border-color: #494848 !important;
}

:deep(.ant-upload-picture-card-wrapper .ant-upload.ant-upload-select-picture-card:hover) {
    border-color: #fff !important;
}

:deep(.ant-upload-picture-card-wrapper .ant-upload.ant-upload-select-picture-card .ant-upload p) {
    color: #fff !important;
}
</style>