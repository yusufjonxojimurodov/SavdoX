<script setup>
import { ref } from 'vue';
import useSetting from '../../../store/settings.pinia';

const settingStore = useSetting()

const fileList = ref([])

function send() {
    if (fileList.value.length === 0) {
        return alert("Iltimos, rasm tanlang!");
    }
    const file = fileList.value[0].originFileObj; // haqiqiy File obyekti
    settingStore.postUserAvatar(file);
}

</script>

<template>
    <a-upload accept=".jpg,.png,.webp,.jfif" v-model:fileList="fileList" :before-upload="() => false"
        list-type="picture-card" :max-count="1">
        <template v-if="fileList.length === 0">
            <p>Rasm yuklash</p>
        </template>
    </a-upload>

    <a-button @click="send">Yuborish</a-button>
</template>