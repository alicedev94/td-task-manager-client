<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { initFlowbite } from 'flowbite';
import { useAuthStore } from '@/stores/Auth';
import axios from 'axios';
import router from '@/router';


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

// Alicedev94 intervention
const getItems = async () => {
  try {
    // Change to production URL
    const { data } = await axios.get(
      `http://localhost:3000/api/v1/navigation`
    );
    if (!data) {
      throw new Error(`Fail to get items: ${data.error}`);
    }

    return { success: true, data };
  } catch (error) {
    return { success: false, error };
  }
};

// inicializar librería flowBite
onMounted(async () => {
  await getRoles();
  let responseItems = await getItems();
  // items.value = responseItems?.data?.data ?? '';
  // console.log(items.value);
  initFlowbite();
});

// cerrar session
const handleLogout = () => {
  authStore.logout();
};
</script>

<template>
  <aside id="logo-sidebar"
    class="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
    aria-label="Sidebar">
    <div class="flex flex-col justify-between h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">

      <!-- Items -->
      <!-- <div>
        <div v-for="item in items">
          <div v-if="item.children && item.children.length">
            <div
              class="flex items-center p-2 text-dark font-semibold  rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
              <span class="ms-3">{{ item.name }}</span>
            </div>

            <div v-for="child in item.children">
              <RouterLink :to="child.link"
                class="flex items-center p-2 text-gray-400 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <span class="ms-3">{{ child.name }}</span>
              </RouterLink>
            </div>
          </div>
          <div v-else>
            <RouterLink :to="item.link"
              class="flex items-center p-2 text-dark font-semibold rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
              <span class="ms-3">{{ item.name }}</span>
            </RouterLink>
          </div>
        </div>
      </div> -->


      <!-- items 2 -->

      <div class="card flex justify-center">
        <PanelMenu :model="items" class="w-full md:w-80">
          <template #item="{ item }">
            <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
              <a v-ripple class="flex items-center cursor-pointer text-surface-700 dark:text-surface-0 px-4 py-2"
                :href="href" @click="navigate">
                <span :class="item.icon" />
                <span class="ml-2">{{ item.label }}</span>
              </a>
            </router-link>
            <a v-else v-ripple class="flex items-center cursor-pointer text-surface-700 dark:text-surface-0 px-4 py-2"
              :href="item.url" :target="item.target">
              <span :class="item.icon" />
              <span class="ml-2">{{ item.label }}</span>
              <span v-if="item.items" class="pi pi-angle-down text-primary ml-auto" />
            </a>
          </template>
        </PanelMenu>
      </div>
      <!-- this is singup, please add to commponent -->
      <div @click="handleLogout"
        class="flex items-center p-2 cursor-pointer text-gray-400 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
        <svg
          class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
          aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 16">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3" />
        </svg>
        <span class="flex-1 ms-3 whitespace-nowrap">Cerrar sesión</span>
      </div>
    </div>
  </aside>
</template>
