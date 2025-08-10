<script setup>
import IconTelegram from './icons/IconTelegram.vue';
import IconInstagram from './icons/IconInstagram.vue';
import IconYoutube from './icons/IconYoutube.vue';
</script>

<template>
    <footer class="bg-[#1C1C1C] text-white !mt-[100px]">
        <div class="container">
            <div class="max-w-7xl mx-auto px-4 py-10 sm:px-6 lg:px-8">
                <nav class="
            flex flex-col gap-10
            md:flex-row md:justify-between md:items-start
            !p-[30px] md:!p-[50px]
          ">
                    <div class="flex flex-col gap-[10px] items-center md:items-start text-center md:text-left">
                        <h3 class="text-lg font-semibold !text-[#FFD700] text-[18px] !m-0">Bo'limlar</h3>
                        <ul class="flex flex-col gap-[10px]">
                            <li><a href="#"
                                    class="!text-white hover:!text-[#FFD700] text-[16px] transition-colors">Asosiy
                                    sahifa</a></li>
                            <li><a href="#"
                                    class="!text-white hover:!text-[#FFD700] text-[16px] transition-colors">Mahsulotlar</a>
                            </li>
                            <li><a href="#"
                                    class="!text-white hover:!text-[#FFD700] text-[16px] transition-colors">Savat</a>
                            </li>
                            <li><a href="#"
                                    class="!text-white hover:!text-[#FFD700] text-[16px] transition-colors">Sevimlilar</a>
                            </li>
                        </ul>
                    </div>

                    <div class="flex flex-col gap-[10px] items-center md:items-start text-center md:text-left">
                        <h3 class="text-[18px] font-semibold text-[#FFD700] !m-0">Bizning manzilimiz</h3>
                        <ul class="flex flex-col gap-[10px]">
                            <li>
                                <a class="!text-white hover:!text-[#FFD700] text-[16px] transition-colors"
                                    href="https://www.google.com/maps/@41.3824294,69.3235123,15z?entry=ttu&g_ep=EgoyMDI1MDcyOC4wIKXMDSoASAFQAw%3D%3D">Toshkent
                                    shahri, Chilonzor tumani, 12-uy</a>
                            </li>
                            <li><a class="!text-white hover:!text-[#FFD700] text-[16px] transition-colors"
                                    href="https://gmail.com">Email: info@savdox.com</a></li>
                            <li><a class="!text-white hover:!text-[#FFD700] text-[16px] transition-colors"
                                    href="tel:+998910118353">Telefon: +998 91 011 83 53</a></li>
                        </ul>
                    </div>

                    <div class="flex flex-col gap-[10px] items-center md:items-start text-center md:text-left">
                        <h3 class="text-lg font-semibold text-yellow-400 !m-0">Yordam</h3>
                        <ul class="flex flex-col gap-[10px]">
                            <li><a href="https://t.me/savdo_x_bot"
                                    class="!text-white hover:!text-[#FFD700] text-[16px] transition-colors">Savol-javob</a>
                            </li>
                            <li><a href="#"
                                    class="!text-white hover:!text-[#FFD700] text-[16px] transition-colors">Qaytarish
                                    siyosati</a></li>
                            <li><a href="https://t.me/savdo_x_bot"
                                    class="!text-white hover:!text-[#FFD700] text-[16px] transition-colors">Bog‘lanish</a>
                            </li>
                        </ul>
                    </div>

                    <div class="flex flex-col gap-[10px] items-center text-center">
                        <h3 class="text-lg font-semibold text-[#FFD700] !m-0">Ijtimoiy Tarmoqlar</h3>
                        <ul class="flex justify-center items-center gap-[15px]">
                            <li><a target="_blank" href="https://www.instagram.com/just_user.01/"><icon-instagram /></a>
                            </li>
                            <li><a target="_blank" href="https://t.me/y_bahodirovich"><icon-telegram /></a></li>
                            <li><a target="_blank" href="https://www.youtube.com/"><icon-youtube /></a></li>
                        </ul>
                    </div>
                </nav>

                <div class="mt-8 !p-6 border-t border-gray-800 text-center text-gray-500 text-sm">
                    <p>&copy; 2025 SavdoX. Barcha huquqlar himoyalangan.</p>
                </div>
            </div>
        </div>
    </footer>
</template>
