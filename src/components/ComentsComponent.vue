<script setup>
import useComments from '../store/comments.pinia';
import dayjs from 'dayjs'

const commentsStore = useComments()
</script>

<template>
    <div v-for="comment in commentsStore.comments" :key="comment._id">
        <div
            class="flex flex-col gap-2 dark:text-white w-[300px]  md:w-[400px] bg-[#1E1E1E] !p-5 rounded-md !mt-8 shadow-[0_4px_12px_rgba(0,0,0,0.6) ">
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
                    <p class="text-xs">{{ dayjs(comment.createdAt).format('YYYY-MM-DD HH:mm') }}</p>
                </div>
            </div>
            <div class="flex flex-row justify-between w-full">

            </div>
            <div class="text-sm">
                {{ comment.text }}
            </div>
        </div>
    </div>

    <a-empty description="Komentariyalar topilmadi" style="color: white; margin-top: 100px;"
        v-if="commentsStore.comments.length === 0" />
</template>