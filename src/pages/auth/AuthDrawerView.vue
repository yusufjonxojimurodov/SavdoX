<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { storeToRefs } from 'pinia'
import useRegister from '../../store/register.pinia'
import LoginComponent from './components/LoginComponent.vue'

const registerStore = useRegister()
const { drawerOpen, drawerMode } = storeToRefs(registerStore)

const drawerWidth = ref(800)

function updateDrawerWidth() {
    drawerWidth.value = window.innerWidth < 768 ? '100%' : 800
}

onMounted(() => {
    updateDrawerWidth()
    window.addEventListener('resize', updateDrawerWidth)
})

onUnmounted(() => {
    window.removeEventListener('resize', updateDrawerWidth)
})
</script>

<template>
    <a-drawer v-model:open="drawerOpen" title="Tizimga kirish" placement="right" :width="drawerWidth"
        :body-style="{ backgroundColor: '#F8EDEB', color: '#212529' }"
        :header-style="{ backgroundColor: '#F8EDEB', color: '#212529', borderBottom: 'none' }">
        <login-component />
    </a-drawer>
</template>

<style scoped>
:deep(.ant-drawer .ant-drawer-title) {
    color: #ffffff !important;
}

:deep(.ant-drawer-close .anticon svg) {
    fill: #ffffff !important;
}
</style>
