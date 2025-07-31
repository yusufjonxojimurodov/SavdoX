<script setup>
import { storeToRefs } from 'pinia'
import useRegister from '../../store/register.pinia'
import RegisterFormComponent from './components/RegisterFormComponent.vue'
import LoginComponent from './components/LoginComponent.vue'

const registerStore = useRegister()
const { drawerOpen, drawerMode } = storeToRefs(registerStore)
</script>

<template>
    <a-drawer v-model:open="drawerOpen" :title="drawerMode === 'register' ? `Ro'yxatdan o'tish` : `Tizimga kirish`"
        placement="right" width="800" :body-style="{ backgroundColor: '#1C1C1C', color: '#fff' }"
        :header-style="{ backgroundColor: '#1C1C1C', color: '#fff', borderBottom: 'none' }">
        <component :is="drawerMode === 'register' ? RegisterFormComponent : LoginComponent" />
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