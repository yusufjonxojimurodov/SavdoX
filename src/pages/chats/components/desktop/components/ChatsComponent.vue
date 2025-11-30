<script setup>
import IconPlus from '@/components/icons/IconPlus.vue';
import IconBack from '@/components/icons/IconBack.vue';
import { useRouter } from 'vue-router';
import NewChatModal from './modal/NewChatModal.vue';
import ChatListSkeleton from './skeletons/ChatListSkeleton.vue';
import { ref } from 'vue';
import useChat from '@/store/chats-store/chats.pinia';
import useMessage from '@/store/chats-store/messages.pinia';
import useRegister from '@/store/register.pinia';

const router = useRouter()
const chatsStore = useChat()
const messageStore = useMessage()
const registerStore = useRegister()

const openNewChat = ref(false)

const openChat = (chat) => {
    messageStore.$reset()
    chatsStore.chatId = chat.chat_id
    chatsStore.userInfo.username = chat.username
    chatsStore.userInfo.receiverId = chat.user_id
    chatsStore.readMessage()
    chatsStore.openChat()
    chatsStore.userInfo.status = chat.status
    chatsStore.userInfo.openChat = true
}
</script>

<template>
    <div
        class="w-[93%]! relative left-4! top-4! shadow-md rounded-[30px] bg-white flex justify-start items-center flex-col h-[84vh]! gap-4">
        <div class="p-4! !w-full border-b border-b-gray-300">
            <div class="flex justify-start items-center gap-2 mb-4!">
                <a-button @click="router.push({ name: 'Products' })" type="primary"
                    class="bg-white! w-[40px]! h-[40px]! !flex justify-center! items-center! rounded-full! shadow-lg!">
                    <template #icon>
                        <icon-back class="w-7 h-7 text-black" />
                    </template>
                </a-button>
                <h2 class="font-bold! text-2xl! !p-0 !m-0">Chatlaringiz</h2>
            </div>
            <a-button @click="registerStore.user ? openNewChat = true : registerStore.openDrawer()"
                class="flex! rounded-[30px]! w-full! justify-center! items-center! gap-2!" type="primary" size="large">
                <template #icon>
                    <icon-plus />
                </template>
                Yangi chat
            </a-button>
        </div>
        <div class="flex justify-start flex-col gap-4 items-center h-full! w-[93%]! mt-5!">
            <div v-if="chatsStore.chatList.length > 0" v-for="chat in chatsStore.chatList" :key="chat.id"
                @click="openChat(chat)"
                class="flex justify-start items-start shadow-md w-full !rounded-[30px] hover:bg-[#ff8c00] hover:text-white cursor-pointer transition duration-300 gap-2 p-4!"
                :class="chatsStore.chatId === chat.chat_id ? 'bg-[#ff8c00] text-white' : 'bg-white text-black'">

                <a-avatar :src="chat.avatar || ''" :size="40">
                    <span class="text-[24px]! font-semibold!">{{ chat.username?.charAt(0).toUpperCase() }}</span>
                </a-avatar>

                <div class="flex justify-start flex-col gap-1">
                    <div class="flex justify-between items-center">
                        <div class="flex justify-center items-center gap-2">
                            <p class="!p-0 !m-0 text-[18px]! font-semibold!">{{ chat.username }}</p>
                            <a-tag :bordered="false" :color="chat.status === 'online' ? 'success' : 'error'">
                                {{ chat.status }}
                            </a-tag>
                        </div>
                        <div v-if="chat.unread_count > 0"
                            class="absolute right-6 w-6 h-6 rounded-full bg-red-600 text-white flex items-center justify-center">
                            {{ chat.unread_count }}
                        </div>
                    </div>
                    <span class="text-[12px] !p-0 !m-0 truncate w-60">
                        Oxirgi xabar: {{ chat.text }}
                    </span>
                </div>
            </div>
            <a-empty v-else-if="!chatsStore.chatLoading"
                description="Chatlaringiz yo'q. Yangi chat tugmasini bosib foydalanuvchilar bilan suhbatlashing" />
            <chat-list-skeleton v-if="chatsStore.chatLoading" />
        </div>
    </div>

    <new-chat-modal v-model:open="openNewChat" />
</template>