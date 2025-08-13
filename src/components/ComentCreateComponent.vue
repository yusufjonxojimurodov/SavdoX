<script setup>
import { ref } from 'vue'
import { message } from 'ant-design-vue'
import useComments from '../store/comments.pinia'
import IconHappyComponent from './icons/reactions/IconHappyComponent.vue'
import IconSadComponent from './icons/reactions/IconSadComponent.vue'
import IconSendComponent from './icons/reactions/IconSendComponent.vue'

const props = defineProps({
    productId: String
})

const commentStore = useComments()
const text = ref('')
const rating = ref(null)
const isFocused = ref(false)
const loading = ref(false)

function blurHandler() {
    setTimeout(() => {
        isFocused.value = false
    }, 3000)
}

function selectRating(value) {
    rating.value = value
}

async function handleSubmit() {
    if (!text.value.trim()) {
        return message.warning('Fikringizni yozing.')
    }

    if (!rating.value) {
        return message.warning('Mahsulot Bahosini tanlang.')
    }

    const form = {
        productId: props.productId,
        text: text.value,
        rating: rating.value
    }

    await commentStore.createComment(form)
    text.value = ''
    rating.value = null
}
</script>

<template>
    <div
        class="bg-[#1E1E1E] fixed bottom-[28%] !mt-6 shadow-[0_4px_12px_rgba(0,0,0,0.6)] grid grid-cols-6 gap-2 rounded-xl w-[300px] md:w-[400px] sm:w-[325px] text-sm">
        <textarea v-model="text" @focus="isFocused = true" @blur="blurHandler"
            placeholder="Mahsulot haqida fikringiz..." :class="['!text-white',
                'bg-[#303030] text-white placeholder:text-gray-500 placeholder:opacity-50 col-span-6 !resize-none outline-none rounded-lg !p-2 duration-300 focus:border-slate-600',
                isFocused ? 'h-20' : 'h-10'
            ]" />

        <div v-if="isFocused" class="flex col-span-6 justify-between items-center !px-2 !pb-2">
            <div class="flex gap-2">
                <button @click="selectRating('happy')" class="
                   fill-slate-600 cursor-pointer col-span-1 flex justify-center items-center rounded-lg !p-2 duration-300 bg-slate-100 hover:border-slate-600 focus:fill-black focus:bg-[#FFD700]
                ">
                    <icon-happy-component />
                </button>

                <button @click="selectRating('unhappy')" class="fill-slate-600 cursor-pointer col-span-1 flex justify-center items-center rounded-lg !p-2 duration-300 bg-slate-100 hover:border-slate-600 focus:fill-white focus:bg-red-500
                ">
                    <icon-sad-component />
                </button>
            </div>

            <a-button @click="handleSubmit"
                class="!bg-[#FFD700] !shadow-[0_4px_12px_rgba(0,0,0,0.6)] w-[30px] !h-[30px] !col-span-2 !flex !justify-center !items-center !rounded-[50%] !p-5 !duration-300"
                :loading="commentStore.createLoader">
                <template #icon>
                    <icon-send-component />
                </template>
            </a-button>
        </div>
    </div>
</template>