<script setup>
import HeaderComponent from '../../components/HeaderComponent.vue';
import SectionNameComponent from '../../components/SectionNameComponent.vue';
import SamsungProductComponent from './components/SamsungProductComponent.vue';
</script>
<template>
    <header-component />
    <main>
        <section-name-component title="Samsung Telefonlari">
            <samsung-product-component />
        </section-name-component>
    </main>
</template>