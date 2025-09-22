<script setup>
import { defineProps, defineEmits, ref } from 'vue'
import IconSamsung from './icons/companies/IconSamsung.vue';
import IconApple from './icons/companies/IconApple.vue';
import IconXiaomi from './icons/companies/IconXiaomi.vue';
import IconGoogle from './icons/companies/IconGoogle.vue';
import IconOther from './icons/companies/IconOther.vue';
import { useRouter } from 'vue-router'
import { version } from "../version.js"

const router = useRouter()
const props = defineProps({ open: Boolean })
const emit = defineEmits(['update:open'])

function closeDrawer() {
    emit('update:open', false)
}
</script>

<template>
    <a-drawer placement="left" :visible="props.open" :closable="false" @close="closeDrawer" width="250"
        :body-style="{ backgroundColor: '#FF8C00', padding: '20px' }">
        <h2 class="logoName border-b border-gray-500 text-center !mt-6 !p-[10px] text-3xl !mb-8">SavdoX</h2>
        <ul class="flex justify-center items-center flex-col gap-4">
            <li><router-link to="/samsung" class="nav-link text-[18px] !text-white font-medium hover:!text-[#FFD700]"
                    @click="closeDrawer">
                    <icon-samsung />
                    Samsung
                </router-link></li>
            <li><router-link to="/apple" class="nav-link text-[18px] !text-white font-medium hover:!text-[#FFD700]"
                    @click="closeDrawer">
                    <icon-apple />
                    Apple
                </router-link></li>
            <li><router-link to="/xiaomi" class="nav-link text-[18px] !text-white font-medium hover:!text-[#FFD700]"
                    @click="closeDrawer">
                    <icon-xiaomi />
                    Xiaomi
                </router-link></li>
            <li><router-link to="/google" class="nav-link text-[18px] !text-white font-medium hover:!text-[#FFD700]"
                    @click="closeDrawer">
                    <icon-google />
                    Google
                </router-link></li>
            <li><router-link to="/others" class="nav-link text-[18px] !text-white font-medium hover:!text-[#FFD700]"
                    @click="closeDrawer">
                    <icon-other />
                    Boshqalar
                </router-link></li>
        </ul>

        <p class="fixed bottom-3 left-23 text-white !font-medium">version {{ version }}</p>
    </a-drawer>
</template>

<style scoped>
.logoName {
    color: white;
    letter-spacing: 1px;
    font-weight: 700;
}

::v-deep(.nav-link) {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5px;
    padding-bottom: 4px;
}

::v-deep(.nav-link::after) {
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    width: 0%;
    height: 1.5px;
    background: #FFD700;
    transition: width 0.4s ease;
    border-radius: 1000px;
}

::v-deep(.nav-link:hover::after) {
    width: 100%;
}
</style>
