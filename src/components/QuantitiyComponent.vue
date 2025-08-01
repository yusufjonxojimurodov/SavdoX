<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
    modelValue: { type: Number, default: 1 },
    min: { type: Number, default: 1 }, 
    max: { type: Number, default: 99 }
});

const emit = defineEmits(['update:modelValue']);
const count = ref(props.modelValue);

function increment() {
    if (count.value < props.max) {
        count.value++;
        emit('update:modelValue', count.value);
    }
}

function decrement() {
    if (count.value > props.min) {
        count.value--;
        emit('update:modelValue', count.value);
    }
}

watch(() => props.modelValue, (val) => {
    count.value = val;
});
</script>

<template>
    <div class="flex items-center gap-3">
        <button @click="decrement"
            class="bg-gray-700 cursor-pointer text-white w-8 h-8 rounded-full flex items-center justify-center">-</button>
        <span class="text-white text-lg w-6 text-center">{{ count }}</span>
        <button @click="increment"
            class="bg-gray-700 cursor-pointer text-white w-8 h-8 rounded-full flex items-center justify-center">+</button>
    </div>
</template>

<style scoped>
button {
    transition: background 0.2s;
}

button:hover {
    background: #4a4a4a;
}
</style>
