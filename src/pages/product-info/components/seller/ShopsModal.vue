<script setup>
import dayjs from 'dayjs';

const open = defineModel("open", {
    type: Boolean,
    default: false
})

const shopsList = defineModel("shops-list", {
    type: Array,
    default: []
})

function getCountdown(shop) {
    const now = dayjs()

    const [openH, openM] = shop.open_time.split(":").map(Number)
    const [closeH, closeM] = shop.close_time.split(":").map(Number)

    const openTimeToday = dayjs().hour(openH).minute(openM).second(0)
    const closeTimeToday = dayjs().hour(closeH).minute(closeM).second(0)

    if (now.isBefore(openTimeToday)) {
        return openTimeToday.valueOf()
    }

    if (now.isBefore(closeTimeToday)) {
        return closeTimeToday.valueOf()
    }

    const openTimeTomorrow = openTimeToday.add(1, "day")
    return openTimeTomorrow.valueOf()
}

function getStatusShop(shop) {
    const now = dayjs()

    const [openH, openM] = shop.open_time.split(":").map(Number)
    const [closeH, closeM] = shop.close_time.split(":").map(Number)

    const openTimeToday = dayjs().hour(openH).minute(openM).second(0)
    const closeTimeToday = dayjs().hour(closeH).minute(closeM).second(0)

    if (now.isBefore(openTimeToday)) return "Ochilishiga qoldi"
    if (now.isBefore(closeTimeToday)) return "Yopilishiga qoldi"
    return "Ertaga ochilishiga qoldi"
}
</script>

<template>
    <a-modal :width="700" :body-style="{ maxHeight: '520px', overflowY: 'auto' }" centered v-model:open="open"
        title="Sotuvchi do'konlari">
        <div v-for="shop in shopsList" :key="shop.id" class="!px-4">
            <div class="shadow-md !mb-3 !p-4 rounded-[20px] w-full !mt-4
           flex flex-col gap-3
           md:flex-row md:justify-between md:items-end">

                <div class="w-full">
                    <div class="flex flex-col gap-2
               sm:flex-row sm:justify-between sm:items-center">

                        <span class="font-semibold line-clamp-1 text-[20px] sm:text-[24px]">
                            {{ shop.name }}
                        </span>

                        <div class="flex items-center gap-2 text-sm sm:text-base flex-wrap">
                            <span>Ish vaqti:</span>
                            <span class="text-green-500">{{ shop.open_time }}</span>
                            <span>—</span>
                            <span class="text-red-500">{{ shop.close_time }}</span>
                        </div>
                    </div>

                    <div class="flex flex-col gap-2 !mt-2
               sm:flex-row sm:justify-between sm:items-center">

                        <div class="flex items-center gap-3 flex-wrap">
                            <span>{{ getStatusShop(shop) }}:</span>
                            <a-statistic-countdown :value="getCountdown(shop)" format="HH:mm:ss" />
                        </div>

                        <a target="_blank" class="text-blue-500 underline"
                            :href="`https://www.google.com/maps?q=${shop.lat},${shop.lng}`">
                            Manzilni ko‘rish
                        </a>
                    </div>
                </div>
                <a-qrcode :color="'orange'" :size="80" :value="`https://www.google.com/maps?q=${shop.lat},${shop.lng}`" />
            </div>
        </div>

        <template #footer>
            <div class="flex justify-end items-center">
                <a-button size="large" @click="open = false" danger
                    class="!border-1 !bg-transparent border-red-500 !text-red-500">
                    Yopish
                </a-button>
            </div>
        </template>
    </a-modal>
</template>