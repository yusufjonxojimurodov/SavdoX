<script setup>
import { ref } from 'vue';
import CreateProductForm from './CreateProductForm.vue';
import useRegister from '../../../store/register.pinia';

const userStore = useRegister()
const open = ref(false);
</script>

<template>
    <a-button v-if="userStore.user.role !== 'customer'" type="primary" @click="open = true">Mahsulot Yaratish</a-button>
    <CreateProductForm v-model:open="open" />
</template>
