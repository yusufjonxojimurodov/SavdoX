<script setup>
import { computed, ref } from 'vue'
import { message } from 'ant-design-vue'
import IconSendComponent from '@/components/icons/reactions/IconSendComponent.vue'
import useComments from '@/store/comments.pinia'
import useQueryParams from '@/composables/useQueryParams'
import useRegister from '@/store/register.pinia'

const { getQueries } = useQueryParams()
const commentStore = useComments()
const userStore = useRegister()

const text = ref('')
const rating = ref(null)
const isFocused = ref(false)
const loading = ref(false)

const productId = computed(() => getQueries().productId)

function blurHandler() {
    setTimeout(() => {
        isFocused.value = false
    }, 3000)
}

function selectRating(value) {
    rating.value = value
}

async function handleSubmit() {
    if (!userStore.user) {
        userStore.openModal()
        return
    }

    if (!text.value.trim()) {
        return message.warning('Fikringizni yozing.')
    }

    if (!rating.value) {
        return message.warning('Mahsulot Bahosini tanlang.')
    }

    const form = {
        productId: productId.value,
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
        <div class="flex gap-2 !mt-2 !mb-2">
            <button @click="selectRating('happy')" class="
                   fill-slate-600 shadow-[0_4px_12px_rgba(0,0,0,0.6)] cursor-pointer col-span-1 flex justify-center items-center rounded-lg !p-2 duration-300 bg-slate-100 hover:border-slate-600 focus:fill-black focus:bg-[#FFD700]
                ">
                <img width="30px" height="30px" src="/src/assets/images/happy-icon.svg" alt="happy-icon">
            </button>

            <button @click="selectRating('unhappy')" class="fill-slate-600 shadow-[0_4px_12px_rgba(0,0,0,0.6)] cursor-pointer col-span-1 flex justify-center items-center rounded-lg !p-2 duration-300 bg-slate-100 hover:border-slate-600 focus:fill-white focus:bg-red-500
                ">
                <img width="30px" height="30px" src="/src/assets/images/happy-icon.svg" alt="sad-icon">
            </button>
        </div>


        <div class="relative">
            <div class="flex ">
                <textarea v-model="text" @focus="isFocused = true" @blur="blurHandler"
                    placeholder="Mahsulot haqida fikringiz..." rows="5" class="bg-white text-black placeholder:text-gray-400 placeholder:opacity-70 
             !resize-none outline-none !rounded-lg border border-gray-300 
             focus:ring-2 focus:ring-yellow-400 w-full !pr-10 !p-2 
            " />

                <a-button @click="handleSubmit" class="!bg-[#FFD700] !shadow-[0_4px_12px_rgba(0,0,0,0.6)] 
             !w-[32px] !h-[32px] flex justify-center items-center rounded-full 
             !absolute right-2 top-1/2 cursor-pointer -translate-y-1/2" :loading="commentStore.createLoader">
                    <template #icon>
                        <icon-send-component />
                    </template>
                </a-button>
            </div>
        </div>
    </div>
</template>