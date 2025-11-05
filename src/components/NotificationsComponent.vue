<script setup>
import { computed } from "vue";
import IconBell from "./icons/IconBell.vue";
import useNotification from "../store/notifications.pinia";
import dayjs from "dayjs";

const notificationStore = useNotification();

const unreadCount = computed(() =>
    notificationStore.notifications.filter(n => !n.read).length
);

const markAsRead = (id) => {
    notificationStore.markAsRead(id);
};
</script>

<template>
    <a-dropdown trigger="click" placement="bottomRight">
        <template #overlay>
            <a-card title="Bildirishnomalar"
                class="w-[90vw] sm:w-[400px] md:w-[500px] max-h-[70vh] overflow-y-auto rounded-lg shadow-lg">
                <a-list>
                    <a-list-item v-for="notif in notificationStore.notifications" :key="notif.id" :class="[
                        'p-3 mb-2 rounded-lg cursor-pointer transition-colors',
                        notif.read ? 'bg-white border-none' : 'bg-yellow-50 border-l-4 border-yellow-500'
                    ]" @click="markAsRead(notif.id)">
                        <div class="font-medium text-gray-800">{{ notif.message }}</div>
                        <div class="text-xs text-gray-400 mt-1">
                            {{ notif.time }}
                        </div>
                    </a-list-item>

                    <a-list-item v-if="!notificationStore.notifications.length"
                        class="flex justify-center items-center">
                        <a-empty>
                            <template #description>
                                <span>Xabarlar yo'q</span>
                            </template>
                        </a-empty>
                    </a-list-item>
                </a-list>
            </a-card>
        </template>

        <div class="relative cursor-pointer">
            <a-badge :count="unreadCount" color="#ff4d4f">
                <icon-bell class="text-white w-7 h-7" />
            </a-badge>
        </div>
    </a-dropdown>
</template>
