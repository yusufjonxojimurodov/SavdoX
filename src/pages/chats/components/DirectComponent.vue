<script setup>
import { watch } from 'vue';
import useChat from '@/store/chats-store/chats.pinia';
import useMessage from '@/store/chats-store/messages.pinia';
import MessageSkeleton from './skeletons/MessageSkeleton.vue';
import dayjs from 'dayjs';

const chatsStore = useChat()
const messageStore = useMessage()

watch(() => chatsStore.chatId, () => {
    if (chatsStore.userInfo.openChat || chatsStore.chatId) {
        messageStore.getMessages(chatsStore.chatId)
    }
}, { immediate: true })
</script>

<template>
    <div class="hidden md:flex h-full flex-col">
        <div v-if="!chatsStore.userInfo.openChat" class="seriy-bg fixed top-1/2 left-[56%]">Xabarni boshlash uchun
            chatlardan
            birini tanlang</div>
        <div v-if="chatsStore.userInfo.openChat"
            class="px-4! py-3! bg-white w-[30%] flex justify-start items-center gap-2 !ml-4 !mt-4 shadow rounded-[30px] !mb-2 !sticky !top-0 !z-10">
            <h2 class="text-xl font-semibold !p-0 m-0!">{{ chatsStore.userInfo.username }}</h2>
            <a-tag :bordered="false" :color="chatsStore.userInfo.status === 'online' ? 'success' : 'error'">{{
                chatsStore.userInfo.status
            }}</a-tag>
        </div>

        <div class="flex-1 overflow-y-auto !px-4">
            <div class="fixed top-1/2 left-[63%]"
                v-if="!messageStore.loading && messageStore.messages.length <= 0 && chatsStore.userInfo.openChat">
                <a-empty description="Xabarlar yo'q" />
            </div>

            <div v-else-if="chatsStore.userInfo.openChat" class="flex flex-col gap-3 !py-4 mb-20!">
                <div v-for="msg in messageStore.messages" :key="msg.id"
                    :class="msg.sender_id === chatsStore.userId ? '!self-end !text-right' : '!self-start'">

                    <div class="!px-4 !py-2 rounded-2xl w-full break-words" :class="msg.sender_id === chatsStore.userId
                        ? 'bg-[#ff8c00] text-white'
                        : 'bg-gray-200 text-black'">
                        {{ msg.text }}
                    </div>

                    <span class="text-xs !opacity-60 !mt-1">
                        {{ dayjs(msg.created_at).format('HH:mm') }}
                    </span>
                </div>

                <message-skeleton v-if="messageStore.loading" />
            </div>
        </div>
    </div>
</template>


<style scoped>
.seriy-bg {
    background: linear-gradient(135deg, #f5f5f5, #e5e7eb);
    border-radius: 30px;
    padding: 20px;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.05);
}
</style>
