<script setup>
import { nextTick, ref, watch } from 'vue';
import useChat from '@/store/chats-store/chats.pinia';
import useMessage from '@/store/chats-store/messages.pinia';
import MessageSkeleton from './skeletons/MessageSkeleton.vue';
import IconTrash from '@/components/icons/IconTrash.vue';
import IconCopy from '@/components/icons/IconCopy.vue';
import IconBack from '@/components/icons/IconBack.vue';
import IconCansel from '@/components/icons/IconCansel.vue';
import dayjs from 'dayjs';

const chatsStore = useChat()
const messageStore = useMessage()

const messageContainer = ref(null)
const selectedMessages = ref([])

function toggleSelect(msg) {
    if (msg.sender_id !== chatsStore.userId) return;

    if (selectedMessages.value.includes(msg.id)) {
        selectedMessages.value = selectedMessages.value.filter(id => id !== msg.id);
    } else {
        selectedMessages.value.push(msg.id);
    }
}

watch(
    () => [chatsStore.chatId, messageStore.messages[chatsStore.chatId]],
    async ([newChatId], [oldChatId] = []) => {

        if (newChatId !== oldChatId && newChatId) {
            await messageStore.getMessages(newChatId)
        }

        nextTick(() => {
            if (messageContainer.value) {
                messageContainer.value.scrollTo({
                    top: messageContainer.value.scrollHeight,
                    behavior: "smooth"
                })
            }
        })
    },
    { immediate: true }
)

const deleteSelected = async () => {
    await chatsStore.deleteMessages(selectedMessages.value)
    selectedMessages.value = []
}

function copyText(text) {
    navigator.clipboard.writeText(text)
        .then(() => {
            message.success("Xabar nusxalandi")
        })
        .catch((error) => {
            message.success(error || "Xabar nusxalanmadi")
        })
}

function back() {
    chatsStore.chatId = null
    chatsStore.userInfo.username = ""
    chatsStore.userInfo.receiverId = null
    chatsStore.userInfo.openChat = false
}
</script>

<template>
    <div class="flex !w-full h-full flex-col">
        <div v-if="!chatsStore.userInfo.openChat" class="seriy-bg fixed top-1/2 left-[56%]">Xabarni boshlash uchun
            chatlardan
            birini tanlang</div>
        <div class="flex justify-start items-center gap-4 !ml-4 !mt-4 !mb-2">
            <a-button @click="back" type="primary"
                class="bg-white! w-[45px]! h-[45px]! !flex justify-center! items-center! rounded-full! shadow-lg!">
                <template #icon>
                    <icon-back class="w-7 h-7 text-black" />
                </template>
            </a-button>
            <div v-if="chatsStore.userInfo.openChat"
                class="px-4! py-3! bg-white w-[70%] md:w-[30%] flex justify-start items-center gap-2 shadow rounded-[30px] !sticky !top-0 !z-10">
                <h2 class="text-xl font-semibold !p-0 m-0!">{{ chatsStore.userInfo.username }}</h2>
                <a-tag :bordered="false" :color="chatsStore.userInfo.status === 'online' ? 'success' : 'error'">{{
                    chatsStore.userInfo.status
                    }}</a-tag>
            </div>
        </div>

        <transition name="slide-fade">
            <div v-if="selectedMessages.length > 0"
                class="absolute -translate-x-1/2 left-1/2 top-3 !px-4 !py-2 bg-white shadow rounded-[30px] w-[300px] flex justify-between items-center">

                <span class="font-medium text-lg">
                    {{ selectedMessages.length }} ta xabar o'chiriladi
                </span>

                <div class="flex justify-center items-center gap-2">
                    <a-button :loading="chatsStore.deleteLoading"
                        class="!flex !justify-center !items-center bg-transparent! !border-1 !border-red-500 !text-red-500"
                        @click="deleteSelected">
                        <template #icon>
                            <icon-trash class="w-5 h-5" />
                        </template>
                    </a-button>
                    <a-button @click="selectedMessages = []" class="!flex !justify-center !items-center" type="primary">
                        <template #icon>
                            <icon-cansel class="w-3 h-3" />
                        </template>
                    </a-button>
                </div>
            </div>
        </transition>

        <div ref="messageContainer" class="flex-1 overflow-y-auto !px-4">
            <div class="fixed top-1/2 -translate-x-1/2 left-1/2"
                v-if="!messageStore.loading && messageStore.messages[chatsStore.chatId]?.length <= 0 && chatsStore.userInfo.openChat">
                <a-empty :image="simpleImage" description="Xabarlar yo'q" />
            </div>

            <div v-else-if="chatsStore.userInfo.openChat" class="flex flex-col gap-3 !py-4 mb-20!">
                <div v-for="msg in chatsStore.chatId ? messageStore.messages[chatsStore.chatId] || [] : []"
                    :key="msg.id" :class="msg.sender_id === chatsStore.userId ? '!self-end !text-left' : '!self-start'">

                    <a-dropdown placement="bottomRight" trigger="contextmenu">
                        <div @contextmenu.prevent @mousedown.prevent
                            @click="msg.sender_id === chatsStore.userId && toggleSelect(msg)"
                            class="!px-4 cursor-pointer !py-2 rounded-2xl transition duration-500 max-w-[400px] break-words whitespace-pre-wrap"
                            :class="[msg.sender_id === chatsStore.userId
                                ? 'bg-[#ff8c00] text-white'
                                : 'bg-gray-200 text-black',
                            selectedMessages.includes(msg.id) ? 'shadow-lg scale-107' : ''
                            ]">
                            {{ msg.text.trimEnd() }}
                        </div>

                        <template #overlay>
                            <a-menu class="!max-w-[140px]">
                                <a-menu-item @click="copyText(msg.text)">
                                    <div class="flex justify-start items-center gap-2">
                                        Nusxa olish
                                        <icon-copy class="w-4 h-4" />
                                    </div>
                                </a-menu-item>
                                <a-menu-item v-if="msg.sender_id === chatsStore.userId" @click="toggleSelect(msg)">
                                    <div class="flex justify-start items-center gap-2">
                                        O'chirish
                                        <icon-trash class="w-4 h-4 text-red-500" />
                                    </div>
                                </a-menu-item>
                            </a-menu>
                        </template>
                    </a-dropdown>

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

.slide-fade-enter-active {
    transition: all 0.3s ease;
}

.slide-fade-leave-active {
    transition: all 0.2s ease;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
    opacity: 0;
    transform: translateY(-10px);
}
</style>
