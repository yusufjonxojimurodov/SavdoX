<script setup>
import useStatistic from '../../../../../store/statistic.pinia';
import IconProfile from '../../../../../components/icons/IconProfile.vue';
import IconStar from '../../../../../components/icons/IconStar.vue';
import IconCoin from '../../../../../components/icons/IconCoin.vue';

const statisticStore = useStatistic()
</script>

<template>
    <div class="flex justify-between items-center">
        <div class="flex justify-start items-center gap-4">
            <a-avatar class="avatar" style="background-color: none;">
                <template #icon> <img v-if="statisticStore.userInfo.avatar" :src="statisticStore.userInfo.avatar"
                        alt="avatar">
                    <icon-profile v-else />
                </template>
            </a-avatar>

            <div class="flex justify-center items-start flex-col gap-1">
                <h1 class="!text-2xl !m-0 !font-bold !text-[#212529]">{{ statisticStore.userInfo.name }} {{
                    statisticStore.userInfo.surname }}</h1>
                <p class="text-gray-400 !font-medium text-[14px]">{{ statisticStore.userInfo.userName }}</p>
            </div>
        </div>

        <div class="flex justify-center items-end flex-col gap-4">
            <div class="flex justify-center items-center gap-4">
                <span class="!text-[#212529] text-[18px] !font-semibold">Bahoyingiz:</span>
                <div class="flex justify-center items-center gap-2">
                    <icon-star class="w-5 h-5" />
                    <p class="!text-[#212529] !font-semibold !text-[20px]">{{ statisticStore.userInfo.rating || 0 }} / 5
                    </p>
                </div>
            </div>

            <div class="flex justify-center items-center gap-4">
                <span class="!text-[212529] text-[18px] !font-semibold">To'plangan tanga:</span>
                <div class="flex justify-center items-center gap-2">
                    <icon-coin class="w-5 h-5" />
                    <p class="!text-[#212529] !font-semibold !text-[20px]">{{ statisticStore.userInfo.points || 0 }} ta
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>