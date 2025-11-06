<script setup>
import BasketProductComponent from './components/BasketProductComponent.vue';
import HeaderComponent from '../../components/HeaderComponent.vue';
import FooterComponent from '../../components/FooterComponent.vue';
import WarningModalComponent from '../../components/WarningModalComponent.vue';
import AuthDrawerView from '../auth/AuthDrawerView.vue';
import SectionNameComponent from '../../components/SectionNameComponent.vue';
</script>

<template>
    <header-component />
    <main>
        <div class="container">
            <section-name-component title="Savatchangiz" :openBack="true" :back="'Mahsulotlar'">
                <basket-product-component />
            </section-name-component>
        </div>
    </main>
    <footer-component />

    <auth-drawer-view />
    <warning-modal-component />
</template>