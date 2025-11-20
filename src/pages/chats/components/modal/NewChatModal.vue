<script setup>
const open = defineModel("open", {
    type: Boolean,
    default: false
})
</script>

<template>
    <a-modal @cancel="open = false" :open="open" :closable="false" centered>
        <div class="flex justify-center items-center gap-4 flex-col mt-5!">
            <a-input class="w-full! h-[50px]! rounded-[30px]! !pl-5 !p-0" size="large" placeholder="Ismini kiriting" />

            <a-list>
                <a-list-item>
                    <a-empty description="Chat topilmadi :(" />
                </a-list-item>
            </a-list>
        </div>

        <template #footer>
            <a-button @click="open = false" size="large" class="rounded-[30px]!" type="primary">
                Yopish
            </a-button>
        </template>
    </a-modal>
</template>