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
                <img width="30px" height="30px" src="/src/assets/images/sad-icon.svg" alt="sad-icon">
            </button>
        </div>


        <div class="relative">
            <div class="flex ">
                <a-textarea v-model:value="text" @focus="isFocused = true" @blur="blurHandler"
                    placeholder="Mahsulot haqida fikringiz..." :auto-size="{ minRows: 1, maxRows: 6 }" class="bg-white text-black placeholder:text-gray-400 placeholder:opacity-70 
             !resize-none outline-none transition duration-300 !rounded-lg border border-gray-300 
             focus:ring-2 focus:ring-[#FF8C00] w-full !pr-10 !p-2 
            " />

                <a-button @click="handleSubmit" class="!bg-[#FF8C00] !shadow-md
             !w-[32px] !h-[32px] flex justify-center items-center !rounded-full 
             !absolute right-2 bottom-1 cursor-pointer " :loading="commentStore.createLoader">
                    <template #icon>
                        <icon-send-component class="w-5 h-5" />
                    </template>
                </a-button>
            </div>
        </div>
    </div>
</template>

<style>
textarea::-webkit-scrollbar {
    display: none;
}

textarea {
    -ms-overflow-style: none;
    scrollbar-width: none;
}
</style>