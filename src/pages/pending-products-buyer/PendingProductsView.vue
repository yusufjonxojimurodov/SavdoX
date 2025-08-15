<script setup>
import HeaderComponent from '../../components/HeaderComponent.vue';
import FooterComponent from '../../components/FooterComponent.vue';
import PendingProductsComponent from './components/PendingProductsComponent.vue';
import PendingProductsFilterComponent from './components/PendingProductsFilterComponent.vue';
import { h, onMounted } from 'vue';
import { message } from 'ant-design-vue';

onMounted(() => {
    message.warn({
        content: h('div', [
            h('p', "Agarda sizning telefon raqamingiz yoki telegram foydalanuvchi nomingiz o'zgargan bo'lsa,"),
            h('p', "Sotuvchi mahsulotingizni tasdiqlamaydi."),
            h('p', "Buni oldini olish uchun adminga murojaat qiling yoki ma'lumotlaringizni o'zgartiring."),
            h('p', "Xurmat bilan Savdo X !")
        ]),
        duration: 15
    });
});

</script>

<template>
    <HeaderComponent />
    <main>
        <pending-products-filter-component />
        <pending-products-component />
    </main>
    <footer-component />
</template>