<script setup>
import useChat from '@/store/chats-store/chats.pinia';
import { debounce } from '@/utils/helpers/debounce';
import ChatSkeleton from './ChatSkeleton.vue';
import { computed, ref } from 'vue';
import useMessage from '@/store/chats-store/messages.pinia';

const chatsStore = useChat()
const messageStore = useMessage()

const open = defineModel("open", {
    type: Boolean,
    default: false
})

const searchUser = ref("")
const hover = ref(null)

const filteredUsers = computed(() => {
    if (!searchUser.value) return [];
    return chatsStore.users.filter(user =>
        user.username.toLowerCase().includes(searchUser.value.toLowerCase())
    );
});

const handleSearchUser = debounce((e) => {
    chatsStore.searchUsers(e.target?.value)
}, 500)

const openChat = (user) => {
    messageStore.$reset()
    chatsStore.userInfo.username = user.username
    chatsStore.userInfo.receiverId = user.id
    chatsStore.userInfo.openChat = true
    closeModal()
}

function closeModal() {
    searchUser.value = ""
    chatsStore.users = []
    open.value = false
}
</script>

<template>
    <a-modal @cancel="open = false" :open="open" :closable="false" centered>
        <div class="flex justify-center items-center gap-4 flex-col mt-5! w-full">
            <a-input v-model:value="searchUser" @input="handleSearchUser"
                class="w-full! h-[50px]! rounded-[30px]! !pl-5 !p-0" size="large"
                placeholder="Foydalanuvchi nomini kiriting" />

            <a-list v-if="!chatsStore.searchLoading"
                :locale="{ emptyText: 'Siz izlayotgan foydalanuvchi topilmadi :(' }"
                class="!w-full rounded-[30px]! mt-4!" bordered style="max-height: 300px; overflow-y: auto;">
                <a-list-item v-for="user in filteredUsers" :key="user.id" @click="openChat(user)"
                    style="cursor: pointer; display: flex; align-items: center; padding: 10px; transition: background 0.2s; width: 100% !important;"
                    @mouseover="hover = user.id" @mouseleave="hover = null"
                    :style="{ background: hover === user.id ? '#f5f5f5' : 'transparent' }">
                    <a-avatar :src="user.avatar || ''" style="margin-right: 12px">
                        {{ user.username?.charAt(0).toUpperCase() }}
                    </a-avatar>

                    <div style="flex: 1; display: flex; flex-direction: column; width: 100%;">
                        <span style="font-weight: 500; font-size: 16px;">{{ user.username }}</span>
                        <small style="color: #888;">Xabar boshlash uchun chatni ustiga bosing</small>
                    </div>

                    <a-badge v-if="user.unreadCount" :count="user.unreadCount" />
                </a-list-item>
                <a-empty v-if="false" description="User topilmadi :(" />
            </a-list>
            <chat-skeleton v-if="chatsStore.searchLoading" />
        </div>

        <template #footer>
            <a-button @click="open = false" size="large" class="rounded-[30px]!" type="primary">
                Yopish
            </a-button>
        </template>
    </a-modal>
</template>

<style scoped>
.a-list {
    scrollbar-width: thin;
    scrollbar-color: #c1c1c1 transparent;
}

.a-list::-webkit-scrollbar {
    width: 6px;
}

.a-list::-webkit-scrollbar-thumb {
    background-color: #c1c1c1;
    border-radius: 3px;
}

.a-list::-webkit-scrollbar-track {
    background: transparent;
}
</style>