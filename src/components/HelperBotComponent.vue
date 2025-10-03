<template>
    <div>
        <div class="fixed right-10 bottom-10 z-50">
            <button @click="open = !open" class="flex items-center justify-center w-18 h-18 rounded-full shadow-2xl 
           bg-gradient-to-br from-yellow-400 to-yellow-600 text-white 
           transform transition-transform duration-200 hover:scale-105 focus:outline-none 
           filter blur-[2px]" aria-label="Open chat">
                <svg v-if="!open" xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24"
                    stroke="#fff">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8-1.03 0-2.01-.12-2.92-.35L3 21l1.35-4.08C3.86 16.07 3 14.12 3 12 3 7.582 7.03 4 12 4s9 3.582 9 8z" />
                </svg>
                <svg v-else xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" viewBox="0 0 24 24" fill="none"
                    stroke="#fff">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>

            <div class="absolute inset-0 flex items-center justify-center 
            text-white text-sm font-semibold rounded-full">
                Tez orada
            </div>
        </div>


        <transition name="slide-fade">
            <div v-if="open"
                class="!fixed !right-6 !bottom-20 z-50 !w-80 max-w-sm bg-white/95 dark:bg-gray-900/90 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-800 overflow-hidden flex flex-col">
                <div
                    class="!px-4 !py-3 flex items-center justify-between !border-b border-gray-100 dark:border-gray-800">
                    <div class="flex items-center gap-3">
                        <div
                            class="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center text-xl !font-bold text-white">
                            A</div>
                        <div>
                            <div class="text-sm font-semibold text-gray-900 dark:text-gray-100">Savdo X yordamchi</div>
                            <div class="text-xs text-gray-500 dark:text-gray-400">Odatiy savollar va yordam</div>
                        </div>
                    </div>
                    <button @click="open = false" class="!p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800">
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-gray-700 dark:text-gray-300"
                            fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div ref="messagesRef" class="flex-1 !p-3 overflow-y-auto !space-y-3">
                    <div v-for="(m, idx) in messages" :key="idx" :class="m.from === 'bot' ? 'self-start' : 'self-end'">
                        <div
                            :class="['max-w-[78%] inline-block !px-3 !py-2 rounded-xl', m.from === 'bot' ? 'bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-100' : 'bg-yellow-400 text-white']">
                            <div class="text-sm">{{ m.text }}</div>
                            <div class="text-[10px] !opacity-70 !mt-1 text-right">{{ formatTime(m.time) }}</div>
                        </div>
                    </div>

                    <div v-if="typing" class="self-start">
                        <div class="!inline-block px-3 !py-2 !rounded-xl bg-gray-100 text-gray-700 dark:bg-gray-800">
                            <div class="flex items-center gap-1">
                                <span class="w-2 h-2 bg-gray-500 rounded-full animate-pulse"></span>
                                <span class="w-2 h-2 bg-gray-500 rounded-full animate-pulse delay-150"></span>
                                <span class="w-2 h-2 bg-gray-500 rounded-full animate-pulse delay-300"></span>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="!px-3 !py-2 !border-t border-gray-100 dark:border-gray-800">
                    <div class="flex items-center gap-2">
                        <input v-model="inputText" @keyup.enter="handleSend" placeholder="Savolingizni yozing..."
                            class="flex-1 bg-transparent outline-none !px-3 !py-2 placeholder:!text-white rounded-md !border !border-gray-200 dark:border-gray-700 !text-sm" />

                        <button @click="handleSend" :disabled="!inputText.trim()"
                            class="!px-3 !py-2 !rounded-md !bg-yellow-400 t!ext-white !disabled:opacity-60">
                            Jo'nat
                        </button>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script setup>
import { ref, reactive, onMounted, watch, nextTick } from 'vue';
import dayjs from 'dayjs';

const open = ref(false);
const inputText = ref('');
const typing = ref(false);
const messages = reactive([
    { from: 'bot', text: 'Assalomu alaykum! Yordamchi botga xush kelibsiz. Savolingizni yozing.', time: new Date() }
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

    // Simulate bot typing and response - replace with your API call
    typing.value = true;
    await new Promise((r) => setTimeout(r, 800));

    // here you'd call your backend; example:
    // const res = await fetch('/api/assistant', { method: 'POST', body: JSON.stringify({ q: text }) })
    // const data = await res.json()

    const reply = generateMockReply(text);
    typing.value = false;
    messages.push({ from: 'bot', text: reply, time: new Date() });
    nextTick(scrollToBottom);
}

function attachImage() {
    // optional: open file picker and upload
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        messages.push({ from: 'user', text: '[Image attached]', time: new Date() });
        scrollToBottom();
        // upload file to server here
    };
    input.click();
}

function generateMockReply(text) {
    // Simple canned responses; replace with real AI or FAQ lookup
    const q = text.toLowerCase();
    if (q.includes('buy') || q.includes('sotib') || q.includes('qayerdan')) return 'Mahsulotni sotib olish uchun ...';
    if (q.includes('refund') || q.includes('qaytar')) return 'Qaytarish siyosati ...';
    return 'Kechirasiz, bu savolga hozircha avtomatik javob topilmadi. Operator bilan bog‘lanish uchun "operator" deb yozing.';
}

function scrollToBottom() {
    nextTick(() => {
        const el = messagesRef.value;
        if (!el) return;
        el.scrollTop = el.scrollHeight + 200;
    });
}

onMounted(() => {
    watch(open, (v) => {
        if (v) nextTick(scrollToBottom);
    });
});
</script>

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