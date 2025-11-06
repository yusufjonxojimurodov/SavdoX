<script setup>
import HeaderComponent from '@/components/HeaderComponent.vue';
import BuyyedProductInfoComponent from './components/BuyyedProductInfoComponent.vue';
import BuyyedProductComponent from './components/BuyyedProductComponent.vue';
import FooterComponent from '@/components/FooterComponent.vue';
import SectionNameComponent from '../../components/SectionNameComponent.vue';
import useProducts from '@/store/products.pinia';
</script>

<template>
    <header-component />
    <main>
        <div class="container">
            <section-name-component title="Haridlar tarixi" :openBack="true" :back="'Pending Products'">
                <buyyed-product-component />
            </section-name-component>
        </div>
    </main>
    <footer-component />
</template>