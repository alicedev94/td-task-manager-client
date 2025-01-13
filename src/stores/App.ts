import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useAppStore = defineStore('app', () => {
  const title = ref('gestor de tareas');

  return {
    title,
  };
});
