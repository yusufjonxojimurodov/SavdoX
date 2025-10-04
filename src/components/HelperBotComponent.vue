<script setup>
import IconSendComponent from './icons/reactions/IconSendComponent.vue';
import { ref, reactive, onMounted, watch, nextTick } from 'vue';
import dayjs from 'dayjs';
import { generateMockReply } from '@/composables/helper.bot';

const open = ref(false);
const inputText = ref('');
const typing = ref(false);
const messages = reactive([
    { from: 'bot', text: 'Assalomu alaykum! TexnoBazaar yordamchi  botiga Xush Kelibsiz!. Savolingiz bolsa mendan sorashingiz mumkin.(BETA)', time: new Date() }
]);

const messagesRef = ref(null);

function formatTime(d) {
    return dayjs(d).format('HH:mm');
}

async function handleSend() {
    if (!inputText.value.trim()) return;

    const text = inputText.value.trim();
    messages.push({ from: 'user', text, time: new Date() });
    inputText.value = '';
    scrollToBottom();

    typing.value = true;
    await new Promise((r) => setTimeout(r, 800));

    const reply = generateMockReply(text);
    typing.value = false;
    messages.push({ from: 'bot', text: reply, time: new Date() });
    nextTick(scrollToBottom);
}

onMounted(() => {
    watch(open, (v) => {
        if (v) nextTick(scrollToBottom);
    });
});

function scrollToBottom() {
    nextTick(() => {
        const el = messagesRef.value;
        if (!el) return;
        el.scrollTo({
            top: el.scrollHeight,
            behavior: 'smooth'
        });
    });
}
</script>

<template>
    <div>
        <button @click="open = !open" :aria-expanded="open" class="fixed cursor-pointer right-6 bottom-6 sm:right-10 sm:bottom-10 z-50 flex items-center justify-center
                   w-12 h-12 sm:w-16 sm:h-16 rounded-full shadow-2xl bg-gradient-to-br bg-[#FF8C00] text-white
                   transform transition-transform duration-200 hover:scale-105 focus:outline-none"
            aria-label="Open chat">
            <svg v-if="!open" xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 sm:w-6 sm:h-6" fill="none"
                viewBox="0 0 24 24" stroke="#fff">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8-1.03 0-2.01-.12-2.92-.35L3 21l1.35-4.08C3.86 16.07 3 14.12 3 12 3 7.582 7.03 4 12 4s9 3.582 9 8z" />
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none"
                stroke="#fff">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
        </button>

        <transition name="slide-fade">
            <div v-if="open" class="fixed right-4 bottom-20 sm:right-6 z-50 w-[90%] max-w-sm sm:w-100
                       liquid-glass backdrop-blur-md rounded-2xl overflow-hidden flex flex-col">
                <div class="!px-3 !py-2 sm:!px-4 sm:!py-3 flex items-center justify-between border-b border-gray-100">
                    <div class="flex items-center gap-2 sm:gap-3">
                        <img class="w-12 h-12 sm:w-16 sm:h-16" src="../assets/images/bot.png" alt="avatar">
                        <div>
                            <div class="text-[15px] sm:text-[18px] !font-semibold text-[#2a2a2a]">
                                Savdo X yordamchi (BETA)
                            </div>
                            <div class="text-[11px] sm:text-xs text-gray-700">
                                Odatiy savollar va yordam
                            </div>
                        </div>
                    </div>
                    <a-button type="primary" @click="open = false"
                        class="!p-1 sm:!p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800">
                        <svg xmlns="http://www.w3.org/2000/svg"
                            class="w-4 h-4 sm:w-5 sm:h-5 text-gray-700 dark:text-gray-300" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </a-button>
                </div>

                <div ref="messagesRef" class="comments-container overflow-y-auto max-h-[400px] sm:max-h-[500px]">
                    <div class="flex flex-col gap-3 !p-2 sm:!p-3">
                        <div v-for="(m, idx) in messages" :key="idx" class="flex"
                            :class="m.from === 'bot' ? 'justify-start' : 'justify-end'">

                            <div :class="[
                                'max-w-[80%] !px-2 !py-1.5 sm:!px-3 sm:!py-2 rounded-xl text-sm',
                                m.from === 'bot'
                                    ? 'bg-gray-100 text-gray-900'
                                    : 'bg-[#FF8C00] text-white'
                            ]">
                                <div v-if="m.from === 'bot'" v-html="m.text"></div>
                                <div v-else>{{ m.text }}</div>
                                <div class="text-[9px] sm:text-[10px] opacity-70 !mt-1 text-right">
                                    {{ formatTime(m.time) }}
                                </div>
                            </div>
                        </div>

                        <div v-if="typing" class="flex justify-start">
                            <div
                                class="inline-block !px-2 !py-1 sm:!px-3 sm:!py-2 rounded-xl bg-transparent text-gray-700">
                                <div class="flex items-center gap-1">
                                    <span
                                        class="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#FF8C00] rounded-full animate-pulse"></span>
                                    <span
                                        class="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#FF8C00] rounded-full animate-pulse delay-150"></span>
                                    <span
                                        class="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#FF8C00] rounded-full animate-pulse delay-300"></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="!px-2 !py-2 sm:!px-3 border-t border-gray-100">
                    <div class="flex items-center gap-2">
                        <a-input v-model:value="inputText" @keyup.enter="handleSend"
                            placeholder="Savolingizni yozing..." size="large" class="text-sm sm:text-base" />
                        <a-button type="primary" @click="handleSend" :disabled="!inputText.trim()"
                            class="w-7 h-7 sm:w-8 sm:h-8 !disabled:opacity-60">
                            <template #icon>
                                <icon-send-component />
                            </template>
                        </a-button>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>


<style scoped>
.slide-fade-enter-active {
    transition: all 240ms cubic-bezier(.2, .9, .2, 1);
}

.slide-fade-leave-active {
    transition: all 180ms cubic-bezier(.2, .9, .2, 1);
}

.slide-fade-enter-from {
    transform: translateY(10px);
    opacity: 0;
}

.slide-fade-enter-to {
    transform: translateY(0);
    opacity: 1;
}

.slide-fade-leave-from {
    transform: translateY(0);
    opacity: 1;
}

.slide-fade-leave-to {
    transform: translateY(10px);
    opacity: 0;
}
</style>