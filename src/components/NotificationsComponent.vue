<script setup>
import { ref, computed } from "vue";
import IconBell from "./icons/IconBell.vue";

const notifications = ref([]);

const unreadCount = computed(() =>
    notifications.value.filter(n => !n.read).length
);

const markAsRead = (id) => {
    const notif = notifications.value.find(n => n.id === id);
    if (notif) {
        notif.read = true;
    }
};
</script>

<template>
    <a-dropdown trigger="click" placement="bottomRight">
        <template #overlay>
            <a-card title="Bildirishnomalar" style="width: 350px">
                <a-list>
                    <a-list-item v-if="notifications.length" v-for="notif in notifications" :key="notif.id"
                        :style="{ backgroundColor: notif.read ? '#fff' : '#ffc885', cursor: 'pointer' }"
                        @click="markAsRead(notif.id)">
                        <div style="font-weight: bold;">{{ notif.title }}</div>
                        <div style="font-size: 12px; color: #999;">{{ notif.time }}</div>
                    </a-list-item>
                    <a-list-item class="!flex !justify-center !items-center" v-else>
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