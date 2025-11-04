<script setup>
import { computed } from "vue";
import IconBell from "./icons/IconBell.vue";
import useNotification from "./store/notifications.pinia";

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
            <a-card title="Bildirishnomalar" style="width: 350px">
                <a-list>
                    <a-list-item v-for="notif in notificationStore.notifications" :key="notif.id"
                        :style="{ backgroundColor: notif.read ? '#fff' : '#ffc885', cursor: 'pointer' }"
                        @click="markAsRead(notif.id)">
                        <div style="font-weight: bold;">{{ notif.message }}</div>
                        <div style="font-size: 12px; color: #999;">{{ notif.time }}</div>
                    </a-list-item>
                    <a-list-item class="!flex !justify-center !items-center"
                        v-if="!notificationStore.notifications.length">
                        <a-empty>
                            <template #description>
                                <span>Xabarlar yo'q</span>
                            </template>
                        </a-empty>
                    </a-list-item>
                </a-list>
            </a-card>
        </template>

        <a-badge :count="unreadCount">
            <icon-bell class="text-white w-7 h-7 !cursor-pointer" />
        </a-badge>
    </a-dropdown>
</template>
