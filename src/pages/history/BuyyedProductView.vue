<script setup>
import HeaderComponent from '@/components/HeaderComponent.vue';
import BuyyedProductComponent from './components/BuyyedProductComponent.vue';
import FooterComponent from '@/components/FooterComponent.vue';
import SectionNameComponent from '@/components/SectionNameComponent.vue';
</script>

<template>
    <header-component />
    <main>
        <div class="container">
            <section-name-component title="Haridlar tarixi" :openBack="true" :back="'PendingProducts'">
                <buyyed-product-component />
            </section-name-component>
        </div>
    </main>
    <footer-component />
</template>