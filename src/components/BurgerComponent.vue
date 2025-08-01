<script setup>
import { defineProps, defineEmits } from 'vue'
import IconBasket from './icons/IconBasket.vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const props = defineProps({ open: Boolean })
const emit = defineEmits(['update:open'])

function closeDrawer() {
    emit('update:open', false)
}

function basketProduct() {
    router.push("/basketProductView")
}
</script>

<template>
    <a-drawer placement="left" :visible="props.open" :closable="false" @close="closeDrawer" width="250"
        body-style="background-color:#1E1E1E; padding:20px;">
        <h2 class="logoName text-3xl mb-6">SavdoX</h2>
        <ul class="flex flex-col gap-4">
            <li><router-link to="" class="nav-link text-[18px] !text-white font-medium hover:!text-[#FFD700]"
                    @click="closeDrawer">Samsung</router-link></li>
            <li><router-link to="" class="nav-link text-[18px] !text-white font-medium hover:!text-[#FFD700]"
                    @click="closeDrawer">Iphone</router-link></li>
            <li><router-link to="" class="nav-link text-[18px] !text-white font-medium hover:!text-[#FFD700]"
                    @click="closeDrawer">Xiaomi</router-link></li>
            <li><router-link to="" class="nav-link text-[18px] !text-white font-medium hover:!text-[#FFD700]"
                    @click="closeDrawer">Boshqalar</router-link></li>
        </ul>

        <div @click="basketProduct"
            class="basket flex items-center gap-2 !p-[10px] cursor-pointer rounded-2xl hover:bg-[#2A2A2A] transition duration-500">
            <icon-basket />
            <p class="font-medium text-[18px] text-[white]">Savatcha</p>
        </div>
    </a-drawer>
</template>

<style scoped>
.logoName {
    color: white;
    letter-spacing: 1px;
    font-weight: 700;
}
</style>
