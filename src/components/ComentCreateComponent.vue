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
    <div>
        <div class="flex gap-2 !mb-2">
            <button @click="selectRating('happy')" class="
                   fill-slate-600 shadow-[0_4px_12px_rgba(0,0,0,0.6)] cursor-pointer col-span-1 flex justify-center items-center rounded-lg !p-2 duration-300 bg-slate-100 hover:border-slate-600 focus:fill-black focus:bg-[#FFD700]
                ">
                <img width="30px" height="30px" src="../assets/images/happy-icon.svg" alt="happy-icon">
            </button>

            <button @click="selectRating('unhappy')" class="fill-slate-600 shadow-[0_4px_12px_rgba(0,0,0,0.6)] cursor-pointer col-span-1 flex justify-center items-center rounded-lg !p-2 duration-300 bg-slate-100 hover:border-slate-600 focus:fill-white focus:bg-red-500
                ">
                <img width="30px" height="30px" src="../assets/images/sad-icon.svg" alt="sad-icon">
            </button>
        </div>


        <div class="relative">
            <div class="flex col-span-6">
                <textarea v-model="text" @focus="isFocused = true" @blur="blurHandler"
                    placeholder="Mahsulot haqida fikringiz..." class="!text-white bg-[#343A40] placeholder:text-white 
             placeholder:opacity-50 !resize-none outline-none rounded-lg  
             !w-full !h-10 !pr-10 !p-2" />

                <a-button @click="handleSubmit" class="!bg-[#FFD700] !shadow-[0_4px_12px_rgba(0,0,0,0.6)] 
             !w-[28px] !h-[28px] flex justify-center items-center rounded-full 
             !absolute right-2 top-1/2 -translate-y-1/2" :loading="commentStore.createLoader">
                    <template #icon>
                        <icon-send-component />
                    </template>
                </a-button>
            </div>
        </div>
    </div>
</template>