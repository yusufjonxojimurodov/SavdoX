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
        userStore.openDrawer()
        return
    }

    if (!text.value.trim()) return

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
                   fill-slate-600 shadow-md cursor-pointer col-span-1 flex justify-center items-center rounded-[30px]! !p-2 duration-300 bg-slate-100 hover:border-slate-600 focus:fill-black focus:bg-[#FFD700]
                ">
                <img width="30px" height="30px" src="/src/assets/images/happy-icon.svg" alt="happy-icon">
            </button>

            <button @click="selectRating('unhappy')" class="fill-slate-600 shadow-md cursor-pointer col-span-1 flex justify-center items-center rounded-[30px]! !p-2 duration-300 bg-slate-100 hover:border-slate-600 focus:fill-white focus:bg-red-500
                ">
                <img width="30px" height="30px" src="/src/assets/images/sad-icon.svg" alt="sad-icon">
            </button>
        </div>

        <div
            class="flex !p-2 justify-between items-end bg-white! shadow-md w-full! sm:!w-[90%] lg:!w-full rounded-[30px]!">
            <a-textarea v-model:value="text" @keydown.enter.prevent="handleSubmit"
                class="!bg-transparent shadow-none! !w-[92%]" :auto-size="{ minRows: 1, maxRows: 6 }"
                placeholder="Fikringizni kiriting..." />
            <a-button :loading="commentStore.createLoader" type="primary" @click="handleSubmit"
                class="!w-8 flex! justify-center! rounded-full! items-center! !h-8 sm:w-8 sm:h-8 !disabled:opacity-60">
                <template #icon>
                    <icon-send-component class="w-5 h-5" />
                </template>
            </a-button>
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