<script setup>
import { ref, computed } from 'vue';
import useMeProduct from '../../../../store/product.me';
import IconDelete from '../../../../components/icons/IconDelete.vue';
import useProductInfo from '../../../../store/products.info.pinia';
import ProductModalComponent from '../../../../components/ProductModalComponent.vue';
import IconEdit from '../../../../components/icons/IconEdit.vue';
import ProductEditComponent from './ProductEditComponent.vue';
import useQueryParams from '../../../../composables/useQueryParams';
import useComments from '../../../../store/comments.pinia';

const commentsStore = useComments()
const { setQueries, getQueries } = useQueryParams()
const productsInfoStore = useProductInfo()
const productStore = useMeProduct();

const currentPage = ref(1);
const pageSize = ref(6);
const buttonLoaders = ref({});
const modalOpen = ref(false)
const modalOpenEdit = ref(false)

const paginatedProducts = computed(() => {
    const start = (currentPage.value - 1) * pageSize.value;
    const end = start + pageSize.value;
    return productStore.meProduct.slice(start, end);
});

function onPageChange(page) {
    currentPage.value = page;
}

function getProduct(id) {
    productsInfoStore.getProductInfo(id)
    commentsStore.getComments(id)
    modalOpen.value = true
}
async function delProduct(id) {
    await productStore.deleteMeProduct(id)

    productStore.GetMeProduct()
}

async function openEditForm(id) {
    try {
        await productStore.getOneProductInfo(id);
        setQueries({ productId: id });
        modalOpenEdit.value = true;
        console.log(productStore.oneProduct)
    } catch (err) {
        console.error("Mahsulot ma'lumotini olishda xatolik:", err);
    } finally {
    }
}

</script>

<template>
    <section>
        <div class="container">
            <a-spin size="large" :spinning="productStore.loader">
                <template v-if="productStore.meProduct.length > 0">
                    <div class="flex flex-wrap gap-4 sm:gap-6 !mt-6 justify-center">
                        <div @click="getProduct(product._id)" v-for="product in paginatedProducts" :key="product._id"
                            class="product transition duration-500 bg-[#1E1E1E]
    cursor-pointer  !p-3 sm:!p-5 md:p-[20px] flex flex-col gap-4 sm:gap-6
    rounded-[20px] md:rounded-[30px]
    shadow-[0_4px_12px_rgba(0,0,0,0.6)]
    flex-shrink-0
    w-[300px] h-[430px] sm:h-[500px]">
                            <img :src="product.image" alt="Mahsulot rasmi"
                                class="w-full h-[240px] rounded-2xl transition duration-500 object-contain" />
                            <div class="flex flex-col w-full gap-2 sm:gap-3">
                                <p class="text-[16px] sm:text-[20px] md:text-[24px] text-[#EAEAEA] font-semibold">
                                    {{ product.name }}
                                </p>
                                <p
                                    class="text-[14px] sm:text-[16px] md:text-[18px] text-[#FFD700] w-[70px] rounded-[10px] font-semibold">
                                    {{ product.price }}$
                                </p>
                                <p class="text-[12px] sm:text-[13px] md:text-[14px] text-[#B0B0B0]">
                                    {{ product.description }}
                                </p>
                                <div class="flex justify-between items-center w-full">
                                    <p class="text-[12px] sm:text-[14px] text-[#888] font-medium">
                                        {{ product.model }}
                                    </p>

                                    <p @click.stop="openEditForm(product._id)"
                                        class="text-[14px] text-white font-semibold flex justify-center items-center gap-2">
                                        Mahsulotni yangilash <icon-edit /></p>
                                </div>

                                <a-popconfirm :title="`Mahsulot ${product.left} ta qolgan. O'chirishni hohlaysizmi?`"
                                    ok-text="Ha" cancel-text="Yo'q" @confirm="() => delProduct(product._id)">
                                    <a-button :loading="buttonLoaders[product._id]" @click.stop.prevent
                                        class="w-full !font-semibold !text-gray-800 !bg-[#FFD700] !flex justify-center items-center gap-2 !text-[12px] sm:!text-[14px] md:!text-[16px]"
                                        size="large">
                                        Mahsulotni o'chirish <icon-delete fill="black" />
                                    </a-button>
                                </a-popconfirm>

                            </div>
                        </div>
                    </div>

                    <a-pagination :current="currentPage" :page-size="pageSize" :total="productStore.meProduct.length"
                        @change="onPageChange" style="margin-top: 60px !important;" :show-size-changer="false" />
                </template>

                <template v-else>
                    <a-empty description="Mahsulotlar topilmadi" style="color: white; margin-top: 150px" />
                </template>
            </a-spin>

            <product-modal-component :open="modalOpen" @update:open="val => modalOpen = val" />
            <product-edit-component v-model:open="modalOpenEdit" />
        </div>
    </section>
</template>
