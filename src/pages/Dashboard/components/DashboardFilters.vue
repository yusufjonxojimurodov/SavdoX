<script setup>
import { ref } from 'vue';
import CreateProductForm from './CreateProductForm.vue';

const open = ref(false);
</script>

<template>
    <a-button type="primary" @click="open = true">Mahsulot Yaratish</a-button>
    <CreateProductForm v-model:open="open" />
</template>
