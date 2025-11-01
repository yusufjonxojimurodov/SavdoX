<script setup>
import useComments from '@/store/comments.pinia';
import relativeTime from 'dayjs/plugin/relativeTime'
import dayjs from 'dayjs'
import IconDelete from '@/components/icons/IconDelete.vue';
import useRegister from '@/store/register.pinia';

dayjs.extend(relativeTime)

const userStore = useRegister()

const uzLatin = {
    name: 'uz-latin',
    relativeTime: {
        future: ' %s dan keyin',
        past: '%s oldin',
        s: 'bir necha soniya',
        m: '1 daqiqa',
        mm: '%d daqiqa',
        h: '1 soat',
        hh: '%d soat',
        d: '1 kun',
        dd: '%d kun',
        M: '1 oy',
        MM: '%d oy',
        y: '1 yil',
        yy: '%d yil',
    },
}

dayjs.locale(uzLatin, null, true)
dayjs.locale('uz-latin')

const commentsStore = useComments()

function formatTime(date) {
    return dayjs(date).fromNow()
}

function deleteComment(id) {
    commentsStore.deleteComment(id)
}
</script>

<template>
    <div class="comments-container w-[99%] !mt-5 max-h-[400px] sm:w-[520px] overflow-y-auto">
        <div v-for="comment in commentsStore.comments" :key="comment._id">
            <div
                class="flex flex-col gap-2 !mb-[30px] w-[98%] md:w-[500px] bg-white !p-5 rounded-md  shadow-[0_4px_12px_rgba(0,0,0,0.6) ">
                <div class="flex flex-row justify-between w-full">
                    <div class="flex flex-row justify-between w-full">
                        <p class="text-xs">
                            <span v-if="comment.userId">
                                {{ comment.userId.name }} {{ comment.userId.surname }}
                            </span>
                            <span v-else>
                                Noma'lum foydalanuvchi
                            </span>
                        </p>
                        <p class="text-xs"> {{ formatTime(comment.createdAt) }}</p>
                    </div>
                </div>
                <div class="flex justify-between items-center">
                    <p class="text-sm"> {{ comment.text }}</p>
                    <div v-if="userStore.user._id === comment.userId._id" class="!m-0 !p-0 cursor-pointer">
                        <a-popconfirm title="Fikringizni o‘chirishni xohlaysizmi?" ok-text="Ha" class="!outline-none"
                            cancel-text="Yo‘q" @confirm="deleteComment(comment._id)">
                            <icon-delete />
                        </a-popconfirm>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <a-empty description="Komentariyalar topilmadi" style="color: #212529; margin-top: 100px;"
        v-if="commentsStore.comments.length === 0" />
</template>