

<template>
  <div class="p-3 mt-40 sm:ml-64 flex justify-center">
    <footer>
      <div
        class="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between"
      ></div>
      <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400"
        >© {{ new Date().getFullYear() }} Tiendas Daka™.</span
      >
    </footer>
  </div>
</template>

<script setup lang="ts">
  import { onMounted } from 'vue';
  import { initFlowbite } from 'flowbite';

  // inicializar librería flowBite
  onMounted(() => {
    initFlowbite();
  });
</script>
