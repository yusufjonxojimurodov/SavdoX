<script setup>
import ChatsComponent from './components/ChatsComponent.vue';
import DirectComponent from './components/DirectComponent.vue';
import SendMessageComponent from '../SendMessageComponent.vue';
import HeaderComponent from '@/components/HeaderComponent.vue';
</script>

<template>
    <header-component />
    <div class="flex h-[88vh] overflow-hidden">
        <div class="w-full md:!w-[500px] h-full md:border-r md:border-[#ff8c00]">
            <chats-component />
        </div>

        <div class="flex flex-col flex-1 h-full">
            <direct-component class="flex-1 overflow-hidden" />
            <send-message-component />
        </div>
    </div>
</template>
