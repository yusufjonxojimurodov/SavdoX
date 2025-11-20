<script setup>
import ChatsComponent from './components/ChatsComponent.vue';
import SendMessageComponent from './components/SendMessageComponent.vue';
import DirectComponent from './components/DirectComponent.vue';
import HeaderComponent from '../../components/HeaderComponent.vue';
</script>

<template>
    <header-component />
    <div class="flex justify-between items-center">
        <chats-component />
        <direct-component />
        <send-message-component />
    </div>
</template>