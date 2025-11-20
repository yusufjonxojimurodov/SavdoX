<script setup>
import IconPlus from '../../../components/icons/IconPlus.vue';
import IconBack from '../../../components/icons/IconBack.vue';
import IconMessage from '../../../components/icons/IconMessage.vue';
import { useRouter } from 'vue-router';
import NewChatModal from './modal/NewChatModal.vue';
import ChatListSkeleton from './skeletons/ChatListSkeleton.vue';
import { ref } from 'vue';

const router = useRouter()

const openNewChat = ref(false)
</script>

<template>
    <div
        class="w-[30%] relative left-4! top-4! shadow-md rounded-[30px] bg-white flex justify-start items-center flex-col h-[84vh]! gap-4">
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
            <a-button @click="openNewChat = true"
                class="flex! rounded-[30px]! w-full! justify-center! items-center! gap-2!" type="primary" size="large">
                <template #icon>
                    <icon-plus />
                </template>
                Yangi chat
            </a-button>
        </div>
        <div class="flex justify-center items-start h-full! w-[93%]! mt-5!">
            <div class="flex justify-center items-center flex-col gap-4 w-full!">
                <div
                    class="flex justify-start p-4! rounded-[30px]! hover:scale-[1.1] cursor-pointer transition duration-300 items-center gap-2 shadow-md bg-white! w-full!">
                    <icon-message class="w-5 h-5" />
                    <p class="!p-0 !m-0 text-[16px]! font-medium! text-gray-800!">Xojimurodov Yusufjon</p>
                </div>
                <div
                    class="flex justify-start p-4! rounded-[30px]! hover:scale-[1.1] cursor-pointer transition duration-300 items-center gap-2 shadow-md bg-white! w-full!">
                    <icon-message class="w-5 h-5" />
                    <p class="!p-0 !m-0 text-[16px]! font-medium! text-gray-800!">Dilbek Sherbekov</p>
                </div>
                <div
                    class="flex justify-start p-4! rounded-[30px]! hover:scale-[1.1] cursor-pointer transition duration-300 items-center gap-2 shadow-md bg-white! w-full!">
                    <icon-message class="w-5 h-5" />
                    <p class="!p-0 !m-0 text-[16px]! font-medium! text-gray-800!">Ubaydullayev Abdurasul</p>
                </div>
                <div
                    class="flex justify-start p-4! rounded-[30px]! hover:scale-[1.1] cursor-pointer transition duration-300 items-center gap-2 shadow-md bg-white! w-full!">
                    <icon-message class="w-5 h-5" />
                    <p class="!p-0 !m-0 text-[16px]! font-medium! text-gray-800!">Zaynutdinov Azizbek</p>
                </div>
            </div>
            <!-- <chat-list-skeleton /> -->
        </div>
    </div>

    <new-chat-modal v-model:open="openNewChat" />
</template>