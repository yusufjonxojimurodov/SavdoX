<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import useMeProduct from '@/store/product.me';
import useProductInfo from '@/store/products.info.pinia';
import useComments from '@/store/comments.pinia';
import ProductModalComponent from '@/components/ProductModalComponent.vue';
import ProductEditComponent from './ProductEditComponent.vue';
import IconEdit from '@/components/icons/IconEdit.vue';
import IconDelete from '@/components/icons/IconDelete.vue';
import useQueryParams from '@/composables/useQueryParams';

const { setQueries } = useQueryParams()
const productStore = useMeProduct();
const productsInfoStore = useProductInfo();
const commentsStore = useComments();

const currentPage = ref(1);
const buttonLoaders = ref({});
const modalOpen = ref(false);
const modalOpenEdit = ref(false);
const windowWidth = ref(window.innerWidth);

const responsivePageSize = computed(() => {
    return windowWidth.value <= 500 ? 3 : 6;
});

const paginatedProducts = computed(() => {
    const size = responsivePageSize.value;
    const start = (currentPage.value - 1) * size;
    const end = start + size;
    return productStore.meProduct.slice(start, end);
});

function handleResize() {
    windowWidth.value = window.innerWidth;
    currentPage.value = 1;
}
onMounted(() => window.addEventListener('resize', handleResize));
onBeforeUnmount(() => window.removeEventListener('resize', handleResize));

function onPageChange(page) {
    currentPage.value = page;
}

function getProduct(id) {
    productsInfoStore.getProductInfo(id);
    commentsStore.getComments(id);
    modalOpen.value = true;
}

async function delProduct(id) {
    await productStore.deleteMeProduct(id);
    productStore.GetMeProduct();
}

async function openEditForm(id) {
    await productStore.getOneProductInfo(id);
    setQueries({
        productId: id || undefined
    })
    modalOpenEdit.value = true;
}
</script>

<template>
    <section>
        <div class="container">
            <a-spin size="large" :spinning="productStore.loader">
                <template v-if="productStore.meProduct.length > 0">
                    <div class="flex flex-wrap gap-4 sm:gap-6 !mt-6 justify-center">
                        <div @click="getProduct(product._id)" v-for="product in paginatedProducts" :key="product._id"
                            class="product transition duration-500 bg-[#F8EDEB] cursor-pointer !p-3 sm:!p-5 md:p-[20px]
                        flex flex-col justify-between rounded-[30px] md:rounded-[30px] relative
                        shadow-[0_4px_12px_rgba(0,0,0,0.6)] flex-shrink-0 w-[300px]">

                            <div>
                                <a-image @click.stop :src="product.image" alt="Mahsulot rasmi"
                                    class="!w-full !h-[240px] rounded-2xl transition duration-500 object-contain" />
                                <div v-if="product.discount"
                                    class="w-[60px] flex justify-center rounded-tr-[30px] rounded-bl-[30px] items-center !p-[20px] bg-[#FF8C00] absolute top-0 right-0">
                                    <p class="text-white !font-semibold text-[18px]">{{ product.discount }}%</p>
                                </div>

                                <div class="flex flex-col w-full gap-2 sm:gap-3 mt-2">
                                    <p class="text-[16px] sm:text-[20px] md:text-[24px] text-[#212529] !font-semibold">
                                        {{ product.name }}
                                    </p>
                                    <div class="!flex justify-start items-center gap-2">
                                        <p :class="[
                                            'text-[14px] sm:text-[16px] md:text-[18px] rounded-[10px] !font-semibold',
                                            product.discountPrice !== product.price ? '!line-through !opacity-80 text-[#53718f]' : 'text-[#34495E]'
                                        ]">
                                            {{ product.price }}$
                                        </p>
                                        <p v-if="product.discountPrice !== product.price"
                                            class="text-[14px] sm:text-[16px] md:text-[18px] text-[#34495E] !font-semibold">
                                            {{ product.discountPrice }}$
                                        </p>
                                    </div>

                                    <p class="text-[12px] sm:text-[13px] md:text-[14px] text-[#343A40]">
                                        {{ product.description }}
                                    </p>

                                    <div class="flex justify-between items-center w-full mt-2">
                                        <p class="text-[12px] sm:text-[14px] text-[#34495E] font-medium">{{
                                            product.model
                                            }}</p>
                                        <p @click.stop="openEditForm(product._id)"
                                            class="text-[14px] text-[#34495E] font-semibold flex justify-center items-center gap-2">
                                            Mahsulotni yangilash <icon-edit />
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div class="!mt-4 !flex flex-col gap-2">
                                <a-popconfirm :title="`Mahsulot ${product.left} ta qolgan. O'chirishni hohlaysizmi?`"
                                    ok-text="Ha" cancel-text="Yo'q" @confirm="() => delProduct(product._id)">
                                    <a-button :loading="buttonLoaders[product._id]" @click.stop.prevent
                                        class="w-full !font-semibold !flex justify-center items-center gap-2 !text-[12px] sm:!text-[14px] md:!text-[16px]"
                                        size="large">
                                        Mahsulotni o'chirish <icon-delete fill="black" />
                                    </a-button>
                                </a-popconfirm>
                            </div>

                        </div>
                    </div>

                    <a-pagination :current="currentPage" :page-size="responsivePageSize"
                        :total="productStore.meProduct.length" @change="onPageChange" :show-size-changer="false"
                        class="!mt-8 relative z-[99999]" />
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
