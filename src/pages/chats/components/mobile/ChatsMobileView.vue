<script setup>
import ChatsComponent from './components/ChatsComponent.vue';
import DirectComponent from './components/DirectComponent.vue';
import SendMessageComponent from '../SendMessageComponent.vue';
import HeaderComponent from '@/components/HeaderComponent.vue';
import useChat from '@/store/chats-store/chats.pinia';

const chatsStore = useChat()
</script>

<template>
    <header-component />
    <div class="flex h-[88vh] overflow-hidden">
        <div v-if="!chatsStore.userInfo.openChat" class="w-full h-full md:border-r md:border-[#ff8c00]">
            <chats-component />
        </div>

        <div v-if="chatsStore.userInfo.openChat" class="flex !w-full flex-col h-full">
            <direct-component class="flex-1 overflow-hidden" />
            <send-message-component />
        </div>
    </div>
</template>
