<script setup>
import IconSendComponent from '@/components/icons/reactions/IconSendComponent.vue';
import IconRecording from '@/components/icons/IconRecording.vue';
import IconPaperclip from '@/components/icons/IconPaperclip.vue';
import { ref } from 'vue';
import useChat from '@/store/chats-store/chats.pinia';
import useRegister from '@/store/register.pinia';

const chatsStore = useChat()
const registerStore = useRegister()

const fileList = ref([])
const isRecording = ref(false)
const isRecorded = ref(false)
const recordedAudioUrl = ref(null)
const message = ref("")

const mediaRecorder = ref(null)
const audioChunks = ref([])

const canvasRef = ref(null)
let audioContext
let analyser
let dataArray
let animationFrame

const startRecording = async () => {
    isRecorded.value = false
    recordedAudioUrl.value = null

    const stream = await navigator.mediaDevices.getUserMedia({ audio: true })

    mediaRecorder.value = new MediaRecorder(stream)
    audioChunks.value = []

    mediaRecorder.value.ondataavailable = (e) => audioChunks.value.push(e.data)

    mediaRecorder.value.start()
    isRecording.value = true

    startWave(stream)
}


const stopRecording = () => {
    if (!isRecording.value) return

    mediaRecorder.value.stop()
    isRecording.value = false

    cancelAnimationFrame(animationFrame)

    mediaRecorder.value.onstop = () => {
        const blob = new Blob(audioChunks.value, { type: "audio/webm" })
        recordedAudioUrl.value = URL.createObjectURL(blob)

        isRecorded.value = true
    }
}

const startWave = (stream) => {
    audioContext = new AudioContext()
    const source = audioContext.createMediaStreamSource(stream)

    analyser = audioContext.createAnalyser()
    analyser.fftSize = 256

    dataArray = new Uint8Array(analyser.frequencyBinCount)
    source.connect(analyser)

    drawWave()
}

const drawWave = () => {
    if (!canvasRef.value) return

    const canvas = canvasRef.value
    const ctx = canvas.getContext("2d")

    if (isRecording.value) {
        animationFrame = requestAnimationFrame(drawWave)
        analyser.getByteTimeDomainData(dataArray)
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.beginPath()
    ctx.lineWidth = 2
    ctx.strokeStyle = "#ff8c00"

    const sliceWidth = canvas.width / dataArray.length
    let x = 0

    for (let i = 0; i < dataArray.length; i++) {
        const v = dataArray[i] / 128.0
        const y = (v * canvas.height) / 2

        if (i === 0) ctx.moveTo(x, y)
        else ctx.lineTo(x, y)

        x += sliceWidth
    }

    ctx.stroke()
}

function handleKeydown(e) {
    if (e.key === "Enter" && e.shiftKey) {
        return
    }

    if (e.key === "Enter") {
        e.preventDefault()
        sendMessage()
    }
}

function sendMessage() {
    if (message.value <= 0) return
    if (chatsStore.messageLoading) return
    if (registerStore.user) {
        chatsStore.sendMessageSocket(chatsStore.userInfo.receiverId, message.value, reset)
    } else {
        registerStore.openDrawer()
    }
}

function reset() {
    message.value = ""
    nextTick(() => {
        textareaRef.value?.focus()
    })
}
</script>

<template>
    <div v-if="chatsStore.userInfo.openChat"
        class="flex blur-bg rounded-[30px]! shadow-md p-2! justify-center gap-4 items-center w-[300px] lg:w-[400px] fixed bottom-6 left-1/2 -translate-x-1/2 lg:left-[70%]">
        <div>
            <a-textarea ref="textareaRef" @keydown="handleKeydown" :disabled="!chatsStore.userInfo.openChat"
                v-model:value="message" v-if="!isRecording && !isRecorded" placeholder="Xabaringizni kiriting"
                class="!w-[220px] lg:w-[330px]! !bg-transparent shadow-none!" :auto-size="{ minRows: 1, maxRows: 8 }" />
            <canvas v-else ref="canvasRef" width="400" height="40" class="rounded bg-blue-50"></canvas>
        </div>
        <!-- <a-button @mousedown="startRecording" @mouseup="stopRecording" type="primary"
            class="flex! justify-center! items-center! w-[35px]! h-[35px]! rounded-full!">
            <template #icon>
                <icon-recording class="w-6 h-6" />
            </template>
</a-button>
<a-upload v-model:file-list="fileList">
    <a-button type="primary" class="flex! justify-center! items-center! w-[35px]! h-[35px]! !p-0 rounded-full!">
        <icon-paperclip class="w-6 h-6" />
    </a-button>
</a-upload> -->
        <a-button :loading="chatsStore.messageLoading" :disabled="!chatsStore.userInfo.openChat || message.length <= 0"
            @click="sendMessage" type="primary"
            class="flex! justify-center! items-center! w-[35px]! h-[35px]! rounded-full!">
            <template #icon>
                <icon-send-component class="w-6 h-6" />
            </template>
        </a-button>
    </div>
</template>

<style>
.blur-bg {
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    background: rgba(255, 255, 255, 0.2);
}
</style>