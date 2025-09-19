<template>
  <div class="down-wrapper">
    <div class="flex justify-center items-center gap-4">
      <icon-technic-issue />
      <h1 class="!p-0 !m-0">Texnik ishlar olib borilmoqda</h1>
    </div>
    <p>Iltimos, keyinroq yana urinib ko‘ring.</p>
  </div>
</template>

<script setup>
import IconTechnicIssue from './components/icons/IconTechnicIssue.vue'
</script>

<style scoped>
.down-wrapper {
  height: 100vh;
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: center;
  align-items: center;
  background: #0f172a;
  color: #f8fafc;
  font-family: Arial, sans-serif;
  text-align: center;
}

h1 {
  font-size: 2.5rem;
  margin-bottom: 10px;
}

p {
  font-size: 1.2rem;
  opacity: 0.8;
}
</style>

<!-- <script setup></script>

<template>
  <router-view />
</template> -->