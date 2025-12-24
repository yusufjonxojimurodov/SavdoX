<script setup>
import IconTechnicIssue from './components/icons/IconTechnicIssue.vue'
import { onBeforeMount, onMounted } from 'vue';
import { ApiVisits } from './api/user.api';
import HelperBotComponent from './components/HelperBotComponent.vue';
import useRegister from './store/register.pinia';
import useSetting from './store/settings.pinia';
import { watch } from 'vue';
import useNotification from './store/notifications.pinia';
import { useRoute } from 'vue-router';
import useChat from './store/chats-store/chats.pinia';
import useProducts from './store/products.pinia';
import FooterComponent from './components/FooterComponent.vue';

const registerStore = useRegister()
const settingStore = useSetting()
const chatsStore = useChat()
const route = useRoute()
const notificationStore = useNotification()
const productsStore = useProducts()

onBeforeMount(() => {
  ApiVisits()
})

watch(() => registerStore.user, () => {
  const userId = registerStore.user.id

  if (userId) {
    chatsStore.connectSocket(userId)
    notificationStore.connectWebSocket(userId)
  }
})

onMounted(async () => {
  await registerStore.userInfo()
  settingStore.getUserAvatar()
  productsStore.getTypes()

    for (let i = 0; i < 50; i++) {
    const snow = document.createElement('div')
    snow.className = 'snowflake'
    snow.textContent = '❄'
    snow.style.left = Math.random() * 100 + 'vw'
    snow.style.animationDuration = (5 + Math.random() * 5) + 's'
    snow.style.fontSize = (10 + Math.random() * 20) + 'px'
    document.body.appendChild(snow)
  }
})
</script>

<template>
  <div class="min-h-screen">
    <router-view />
    <helper-bot-component v-if="route.name !== 'Chats'" />
    <div v-if="registerStore.userLoader" class="wrapper">
      <div class="circle"></div>
      <div class="circle"></div>
      <div class="circle"></div>
    </div>
    <div v-if="registerStore.platformStatus.status === 400 || registerStore.platformStatus.status === 500"
      class="down-wrapper">
      <div class="flex justify-center items-center gap-4">
        <IconTechnicIssue />
        <h1 class="!p-0 !m-0 h1">{{ registerStore.platformStatus?.text || "Texnik ishlar olib borilmoqda" }}</h1>
      </div>
      <p class="p">Iltimos, keyinroq yana urinib ko‘ring.</p>
    </div>
  </div>
</template>

<style>
.down-wrapper {
  height: 100vh;
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: center;
  align-items: center;
  background: #fff;
  color: #FF8C00;
  font-family: Arial, sans-serif;
  text-align: center;
}

@keyframes fall {
  0% { transform: translateY(-10px); }
  100% { transform: translateY(100vh); }
}

.snowflake {
  position: fixed;
  top: -10px;
  color: rgb(255, 255, 255);
  user-select: none;
  pointer-events: none;
  animation-name: fall;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
  z-index: 99999999999;
}

.h1 {
  font-size: 2.5rem;
  margin-bottom: 10px;
}

.p {
  font-size: 1.2rem;
  opacity: 0.8;
}
</style>