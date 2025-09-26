<script setup>
import { ref, watch, onBeforeUnmount } from "vue";
import useRegister from "@/store/register.pinia";
import { message } from "ant-design-vue";

const registerStore = useRegister();
let faceapi = null;

const open = defineModel("open", { type: Boolean, default: false });

const modelPalmLogin = ref({
    phone: "",
    face: ""
});

const videoRef = ref(null);
const canvasRef = ref(null);
const loadingCamera = ref(false);

let stream = null;
let detectInterval = null;


async function loadModels() {
  if (typeof window !== "undefined") {
    faceapi = await import("face-api.js");
    await faceapi.nets.tinyFaceDetector.loadFromUri("/models");
  }
}

async function startCamera() {
    loadingCamera.value = true;
    try {
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
            message.error("Brauzer kamerani qo‘llab-quvvatlamaydi!");
            return;
        }

        await loadModels();

        stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.value) {
            videoRef.value.srcObject = stream;
        }

        detectInterval = setInterval(async () => {
            if (videoRef.value && !modelPalmLogin.value.face) {
                const detections = await faceapi.detectAllFaces(
                    videoRef.value,
                    new faceapi.TinyFaceDetectorOptions()
                );

                if (detections.length > 0) {
                    captureFace();
                    stopCamera();
                }
            }
        }, 1500);

    } catch (err) {
        console.error("Kameraga ruxsat berilmadi:", err);
        message.error("Kameraga ruxsat berilmadi yoki HTTPS yo‘q!");
    } finally {
        loadingCamera.value = false;
    }
}

function stopCamera() {
    if (stream) {
        stream.getTracks().forEach(track => track.stop());
        stream = null;
    }
    if (detectInterval) {
        clearInterval(detectInterval);
        detectInterval = null;
    }
}

function captureFace() {
    const video = videoRef.value;
    const canvas = canvasRef.value;
    if (video && canvas) {
        const ctx = canvas.getContext("2d");
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        modelPalmLogin.value.face = canvas.toDataURL("image/png");
    }
}

function retakeFace() {
    modelPalmLogin.value.face = "";
    startCamera();
}

watch(open, (val) => {
    if (val) {
        startCamera();
    } else {
        stopCamera();
    }
});

onBeforeUnmount(() => stopCamera());

function handlePhoneInput(e) {
    let value = e.target.value;
    if (!value.startsWith("+998")) {
        value = "+998" + value.replace(/[^0-9]/g, "");
    }
    let digits = value.replace(/\D/g, "").slice(3);
    let formatted = "+998";
    if (digits.length > 0) formatted += " " + digits.substring(0, 2);
    if (digits.length > 2) formatted += "-" + digits.substring(2, 5);
    if (digits.length > 5) formatted += "-" + digits.substring(5, 7);
    if (digits.length > 7) formatted += "-" + digits.substring(7, 9);

    modelPalmLogin.value.phone = formatted;
}

async function handleOk() {
    if (!modelPalmLogin.value.phone) {
        message.error("Telefon raqam majburiy!");
        return;
    }
    if (!modelPalmLogin.value.face) {
        message.error("Yuz aniqlanmadi!");
        return;
    }

    let cleanPhone = modelPalmLogin.value.phone.replace(/\D/g, "");

    if (!cleanPhone.startsWith("998")) {
        message.error("Telefon raqam noto‘g‘ri!");
        return;
    }
    cleanPhone = "+" + cleanPhone;

    const payload = {
        ...modelPalmLogin.value,
        phone: cleanPhone
    };

    const success = await registerStore.palmLogin(payload);
    if (success) {
        open.value = false;
        setTimeout(() => {
            window.location.reload()
        }, 1000)
    }
}

function closeModal() {
    stopCamera()
    open.value = false
    modelPalmLogin.value.face = ""
    modelPalmLogin.value.phone = ""
}
</script>

<template>
    <a-modal :footer="null" centered v-model:open="open" title="Kaft bilan tizimga kirish" destroyOnClose>
        <a-form :model="modelPalmLogin" layout="vertical">
            <a-form-item name="phone" label="Telefon Raqamingiz"
                :rules="[{ required: true, message: 'Majburiy maydon!' }]">
                <a-input
                    class="w-full h-12 text-base rounded-lg  !border-none text-white placeholder-gray-400 focus:border-gray-400"
                    size="large" v-model:value="modelPalmLogin.phone" @input="handlePhoneInput" autocomplete="off"
                    allow-clear="false" placeholder="+998 XX-XXX-XX-XX" />
            </a-form-item>

            <div class="flex flex-col items-center gap-2">
                <a-spin :spinning="loadingCamera">
                    <video v-if="!modelPalmLogin.face" ref="videoRef" autoplay playsinline
                        class="w-full h-full rounded-lg"></video>
                </a-spin>
                <canvas ref="canvasRef" width="250" height="200" class="hidden"></canvas>
                <div v-if="modelPalmLogin.face" class="flex flex-col !w-full items-center gap-2">
                    <p>Yuz aniqlandi:</p>
                    <img :src="modelPalmLogin.face" alt="Face" class="w-full h-full rounded-lg" />
                    <p class="!text-red-500 text-center !font-semibold !p-2">Yorug' xonada va yuzingizni to'gri holatda
                        tushiring</p>
                    <a-button size="middle" type="primary" @click="retakeFace">Qayta olish</a-button>
                </div>
            </div>
        </a-form>

        <div class="flex justify-end items-center gap-4 !mt-5">
            <a-button size="large" @click="closeModal">
                Bekor qilish
            </a-button>
            <a-button :disabled="!modelPalmLogin.phone || !modelPalmLogin.face" :loading="registerStore.faceLoginBtn"
                type="primary" size="large" @click="handleOk">
                Kirish
            </a-button>
        </div>
    </a-modal>
</template>
