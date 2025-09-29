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
        <complaint-card v-if="userStore.complaint.length > 0" />
        <template v-else>
            <a-empty description="Shikoyatlar topilmadi" style="color: white; margin-top: 150px" />
        </template>
    </a-spin>
</template>