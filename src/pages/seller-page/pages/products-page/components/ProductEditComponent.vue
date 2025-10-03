<script setup>
import { ref, computed, watch } from 'vue';
import { message } from 'ant-design-vue';
import useMeProduct from '@/store/product.me';
import IconUpdate from '@/components/icons/IconUpdate.vue';
import useQueryParams from '@/composables/useQueryParams';

const { getQueries } = useQueryParams()
const productMeStore = useMeProduct()
const props = defineProps({ open: Boolean });
const emit = defineEmits(['update:open']);

const fileList = ref([])
const formRef = ref(null)
const submitLoading = ref(false)

const productId = computed(() => getQueries().productId)

const createProduct = computed({
    get: () => productMeStore.oneProduct,
    set: (val) => {
        Object.assign(productMeStore.oneProduct, val);
    }
});

watch(
    () => productMeStore.oneProduct,
    (val) => {
        if (val && val.images && val.images.length > 0) {
            fileList.value = val.images.map((url, index) => ({
                uid: index,
                name: `image-${index + 1}.png`,
                status: 'done',
                url,
            }));
        } else {
            fileList.value = [];
        }
    },
    { immediate: true }
);


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
    { label: "Huawei", value: "Huawei" },
    { label: "Oppo", value: "Oppo" },
    { label: "Vivo", value: "Vivo" },
    { label: "Honor", value: "Honor" },
    { label: "Boshqalar", value: "Other" },
]

const types = [
    { label: 'Aqlli Soat', value: 'smartwatch' },
    { label: 'Smartfon', value: 'smartfon' },
    { label: 'Televizor', value: 'TV' },
    { label: 'Noutbook', value: 'laptop' },
    { label: 'Monitor', value: 'display' },
    { label: 'Klaviatura', value: 'keyboard' },
    { label: 'Sichqoncha', value: 'mouse' },
    { label: 'Kompyuter', value: 'computer' },
    { label: 'Quloqchin', value: 'headphones' },
    { label: 'Zaryadlovchi qurilmalar', value: 'chargers' },
]

async function editProductDashboard() {
    try {
        submitLoading.value = true;
        await productMeStore.editProductMe(productId.value, {
            name: createProduct.value.name,
            description: createProduct.value.description,
            price: createProduct.value.price,
            left: createProduct.value.left,
            model: createProduct.value.model,
            type: createProduct.value.type,
            discount: createProduct.value.discount || 0,
            images: fileList.value.length
                ? fileList.value.map(f => f.originFileObj || f.url)
                : null
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
        createProduct.type = "",
        createProduct.model = null;
}
</script>

<template>
    <a-modal :get-container="false" @close="cancel" @update:open="emit('update:open', $event)" :open="props.open"
        title="Mahsulotni tahrirlash" footer="">
        <a-form ref="formRef" @finish="editProductDashboard" :model="createProduct" layout="vertical" class="!mt-10">
            <a-row :gutter="[16, 16]">
                <a-col :span="12">
                    <a-form-item name="name" label="Mahsulot Nomi"
                        :rules="[{ required: true, message: 'Majburiy Maydon!' }]">
                        <a-input size="large" v-model:value="createProduct.name" placeholder="Mahsulot nomi" />
                    </a-form-item>
                    <a-form-item name="discount" label="Mahsulot chegirmasi">
                        <a-input size="large" v-model:value="createProduct.discount"
                            placeholder="Mahsulot Chegirmasi" />
                    </a-form-item>
                </a-col>
                <a-col :span="12">
                    <a-form-item name="model" label="Model" :rules="[{ required: true, message: 'Majburiy Maydon!' }]">
                        <a-select size="large" v-model:value="createProduct.model" placeholder="Modelini tanlang"
                            :options="models" allowClear />
                    </a-form-item>
                    <a-form-item name="type" label="Mahsulot turi"
                        :rules="[{ required: true, message: 'Majburiy Maydon!' }]">
                        <a-select size="large" v-model:value="createProduct.type" placeholder="Turini tanlang"
                            :options="types" allowClear />
                    </a-form-item>
                </a-col>
            </a-row>

            <a-row :gutter="[16, 16]">
                <a-col :span="12">
                    <a-form-item name="description" label="Mahsulot Haqida"
                        :rules="[{ required: true, message: 'Majburiy Maydon!' }]">
                        <a-textarea class="textArea" v-model:value="createProduct.description" :rows="4" show-count
                            :minlength="70" :maxlength="130" placeholder="Mahsulot haqida batafsil yozing" />
                    </a-form-item>
                </a-col>
                <a-col :span="12">
                    <a-form-item name="price" label="Mahsulot qoldig'i va narxi"
                        :rules="[{ required: true, message: 'Majburiy Maydon!' }]">
                        <a-input size="large" v-model:value="createProduct.price" type="text" placeholder="Narxi" />
                    </a-form-item>

                    <a-form-item name="left" :rules="[{ required: true, message: 'Majburiy Maydon!' }]">
                        <a-input type="number" v-model:value="createProduct.left" size="large"
                            placeholder="Nechta qolganini yozing" />
                    </a-form-item>
                </a-col>
            </a-row>

            <a-form-item name="image" label="Rasm" :rules="[{ validator: validateImage }]">
                <a-upload accept=".jpg,.png,.webp,.jfif" v-model:fileList="fileList" :before-upload="() => false"
                    list-type="picture-card" :max-count="4">
                    <template v-if="fileList.length < 4">
                        <p>Rasm yuklash</p>
                    </template>
                </a-upload>
            </a-form-item>

            <div class="flex justify-end gap-4 mt-6">
                <a-button size="large" @click="cancel">Bekor qilish</a-button>
                <a-button type="primary" html-type="submit" size="large" :loading="submitLoading"
                    class="!bg-gray-800 !flex justify-center items-center gap-2 hover:!bg-gray-900 !border-none">
                    <template #icon>
                        <icon-update />
                    </template> Yangilash
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
    color: #212529 !important;
}

:deep(.ant-input-textarea-show-count::after) {
    color: #212529 !important;
}

:deep(.ant-upload-picture-card-wrapper .ant-upload.ant-upload-select-picture-card) {
    border-color: #212529 !important;
}

:deep(.ant-upload-picture-card-wrapper .ant-upload.ant-upload-select-picture-card:hover) {
    border-color: #212529 !important;
}

:deep(.ant-upload-picture-card-wrapper .ant-upload.ant-upload-select-picture-card .ant-upload p) {
    color: #212529 !important;
}
</style>