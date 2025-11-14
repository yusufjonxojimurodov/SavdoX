import useRegister from "@/store/register.pinia";
import useProducts from "@/store/products.pinia";
import { reactive } from "vue";

export let buttonLoader = reactive({});

export async function addBasket(product) {
  const token = localStorage.getItem("access_token");
  if (!token) {
    useRegister().openModal();
    return;
  } else {
    buttonLoader[product.id] = true
    const products = {
      productId: product.id,
      quantity: 1,
      name: product.name,
      price: product.price,
      model: product.model,
      description: product.description,
      images: product.images,
      discount: product.discount,
      discountPrice: product.discountPrice,
      left: product.left_count,
      type: product.type,
    };
    try {
      await useProducts().basketProduct(products);
    } finally {
      buttonLoader[product.id] = false;
    }
  }
}