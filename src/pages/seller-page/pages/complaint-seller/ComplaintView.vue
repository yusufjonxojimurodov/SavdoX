<script setup>
import { onMounted } from 'vue';
import ComplaintCard from './components/ComplaintCard.vue';
import useRegister from '@/store/register.pinia';

const userStore = useRegister()

onMounted(() => {
    userStore.getComplaint()
})
</script>

<template>
    <a-spin size="large" :spinning="userStore.loader">
        <complaint-card />
    </a-spin>
</template>