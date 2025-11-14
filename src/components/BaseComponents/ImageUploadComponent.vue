<script setup>
import useSetting from '@/store/settings.pinia';

const settingsStore = useSetting();

const handleChange = ({ fileList }) => {
    settingsStore.setFileList(fileList);

    if (fileList.length > 0) {
        settingsStore.uploadAvatar();
    }
};
</script>

<template>
    <a-upload class="upload-wrapper" accept=".jpg,.png,.webp,.jfif" :file-list="settingsStore.fileList"
        :before-upload="() => false" list-type="picture-card" :max-count="1" @change="handleChange">
        <template v-if="settingsStore.fileList.length === 0">
            <p class="upload-text">Profile joylash</p>
        </template>
    </a-upload>
</template>
