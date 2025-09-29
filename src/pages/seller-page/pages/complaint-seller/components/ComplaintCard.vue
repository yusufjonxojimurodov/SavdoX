<script setup>
import useRegister from '@/store/register.pinia';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/uz';
import IconPhoneProduct from '@/components/icons/IconPhoneProduct.vue';
import IconReport from '@/components/icons/IconReport.vue';
import IconUser from '@/components/icons/IconUser.vue';
import IconPhone from '@/components/icons/IconPhone.vue';
import IconTime from '@/components/icons/IconTime.vue';
import IconTelegram from '@/components/icons/IconTelegram.vue';

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

dayjs.extend(relativeTime);
dayjs.locale(uzLatin, null, true)
dayjs.locale('uz-latin')

const userStore = useRegister();

function timeFromNow(date) {
    return dayjs(date).fromNow();
}
</script>

<template>
    <div class="!flex flex-wrap !gap-4 !w-full">
        <div v-for="complaint in userStore.complaint" :key="complaint._id" class="!p-5 !w-[49%] !rounded-xl !shadow-md border"
            style="background-color: #F8EDEB; border-color: #FF8C00; width: 300px;">
            <div class="flex items-center gap-2">
                <icon-phone-product class="!w-5 !h-5" />
                <h2 class="text-lg font-semibold !p-0 !m-0 text-[#34495E]">
                    Mahsulot: <span class="font-semibold">{{ complaint.productName }}</span>
                </h2>
            </div>

            <div class="flex flex-col gap-4 !mt-4 w-full">
                <div class="flex justify-between items-center">
                    <div class="flex items-center gap-2">
                        <icon-report class="!w-5 !h-5" />
                        <p class="text-[#34495E] !font-semibold">Shikoyati:</p>
                    </div>
                    <p>{{ complaint.message }}</p>
                </div>

                <div class="flex justify-between items-center">
                    <div class="flex items-center gap-2">
                        <icon-user class="!w-5 !h-5 stroke-[#212529]" />
                        <p class="text-[#34495E] !font-semibold">Ism familyasi:</p>
                    </div>
                    <p>{{ complaint.complainant.name }} {{ complaint.complainant.surname }}</p>
                </div>

                <div class="flex justify-between items-center">
                    <div class="flex items-center gap-2">
                        <icon-phone class="!w-5 !h-5 stroke-[#212529]" />
                        <p class="text-[#34495E] !font-semibold">Telefon Raqami:</p>
                    </div>
                    <a :href="`tel:${complaint.complainant.phone}`" target="_blank">
                        {{ complaint.complainant.phone }}
                    </a>
                </div>

                <div class="flex justify-between items-center">
                    <div class="flex items-center gap-2">
                        <icon-telegram class="!w-5 !h-5" />
                        <p class="text-[#34495E] !font-semibold">Telegram:</p>
                    </div>
                    <a :href="`https://t.me/${complaint.complainant.userName}`" target="_blank">
                        @{{ complaint.complainant.userName }}
                    </a>
                </div>

                <div class="!text-xs flex items-center gap-2 text-[#343A40]">
                    <icon-time class="fill-[#212529]" />
                    {{ timeFromNow(complaint.createdAt) }}
                </div>
            </div>
        </div>
    </div>
</template>
