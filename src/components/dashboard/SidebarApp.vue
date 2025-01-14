

<template>
  <aside id="logo-sidebar"
    class="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
    aria-label="Sidebar">
    <div class="flex flex-col justify-between h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
      <PanelCo />
      <div @click="handleLogout"
        class="flex items-center justify-center p-2 cursor-pointer text-gray-400 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
        <img :src="close" alt="close" :width="15" :height="15">
        <span class="flex-1 ms-3 whitespace-nowrap">Cerrar sesión</span>
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { initFlowbite } from 'flowbite';
import { useAuthStore } from '@/stores/Auth';
import axios from 'axios';
import router from '@/router';
import PanelCo from '../utils/PanelCo.vue';
import close from '../../assets/svg/close.svg';

// pinia
const authStore = useAuthStore();
const ID_Rol = authStore.user?.ID_Rol;
const dataBaseUrlRol = `${import.meta.env.VITE_URL}/rol`;
const roles = ref();
const permisos = ref();
// const items = ref();

const items = ref([
  {
    label: 'Router',
    icon: 'pi pi-palette',
    items: [
      {
        label: 'Styled',
        icon: 'pi pi-eraser',
        route: '/theming/styled'
      },
      {
        label: 'Unstyled',
        icon: 'pi pi-heart',
        route: '/theming/unstyled'
      }
    ]
  },
  {
    label: 'Programmatic',
    icon: 'pi pi-link',
    command: () => {
      router.push('/introduction');
    }
  },
  {
    label: 'External',
    icon: 'pi pi-home',
    items: [
      {
        label: 'Vue.js',
        icon: 'pi pi-star',
        url: 'https://vuejs.org/'
      },
      {
        label: 'Vite.js',
        icon: 'pi pi-bookmark',
        url: 'https://vuejs.org/'
      }
    ]
  }
]);

const getRoles = async () => {
  try {
    const response = await axios.get(
      `${dataBaseUrlRol}/filterRoles/${ID_Rol}`
    );
    roles.value = response.data;
    permisos.value = roles.value.Id_Permissions;
  } catch (error) {
    console.log(error);
  }
};

const hasPermission = (id: number): boolean => {
  {
    if (!roles.value || !roles.value.Id_Permissions) {
      return false;
    }
    const permissions = permisos.value
      .split(',')
      .map((permission: string) => parseInt(permission.trim()));
    return permissions.includes(id);
  }
};

// inicializar librería flowBite
onMounted(async () => {
  await getRoles();
  initFlowbite();
});

// cerrar session
const handleLogout = () => {
  authStore.logout();
};
</script>
