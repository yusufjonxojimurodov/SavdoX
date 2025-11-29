<script setup>
import { ref } from 'vue';
import ChatsDesktopView from './components/desktop/ChatsDesktopView.vue';
import ChatsMobileView from './components/mobile/ChatsMobileView.vue';

const innerWidth = ref(window.innerWidth)
</script>

<template>
    <chats-desktop-view v-if="innerWidth > 1016" />
    <chats-mobile-view v-else />
</template>