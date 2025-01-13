<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { initFlowbite } from 'flowbite'
import { useAuthStore } from '@/stores/Auth';
import axios from 'axios';

// pinia
const authStore = useAuthStore();
const ID_Rol = authStore.user?.ID_Rol
const dataBaseUrlRol = `${import.meta.env.VITE_URL}/rol`;
const roles = ref();
const permisos = ref();


const getRoles = async () => {
  try{
      const response = await axios.get(`${dataBaseUrlRol}/filterRoles/${ID_Rol}`);
      roles.value = response.data
      permisos.value = roles.value.Id_Permissions
  } catch(error){
      console.log(error)
  }
}

const hasPermission = (id: number): boolean => {
    { if (!roles.value || !roles.value.Id_Permissions) { return false;}
    const permissions =  permisos.value.split(',').map(permission => parseInt(permission.trim())); 
    return permissions.includes(id);
}
};

// inicializar librería flowBite 
onMounted(async () => {
    await getRoles();
    initFlowbite();
})

// cerrar session
const handleLogout = () => {
  authStore.logout();
};
</script>

<template>
    <aside id="logo-sidebar" class="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700" aria-label="Sidebar">
        <div class="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
            <ul class="space-y-2 font-medium">
                <li >
                    <RouterLink to="/dashboard" class="flex items-center p-2 text-gray-400 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                        <span class="ms-3">Dashboard</span>
                    </RouterLink>
                </li>
                <li v-if="hasPermission(1)">
                    <RouterLink to="/tables" class="flex items-center p-2 text-gray-400 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                
                        <span class="flex-1 ms-3 whitespace-nowrap">Tablas</span>
                    </RouterLink>
                </li>
                <li v-if="hasPermission(2)">
                    <RouterLink to="/tablesExhibition" class="flex items-center p-2 text-gray-400 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                  
                        <span class="flex-1 ms-3 whitespace-nowrap">Exhibición</span>
                        <span class="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">3</span>
                    </RouterLink>
                </li>
                <li v-if="hasPermission(1)">
                    <button type="button" class="flex items-center w-full p-2 text-base text-gray-400 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700" aria-controls="dropdown-example" data-collapse-toggle="dropdown-example">
                  
                        <span class="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">Usuarios</span>
                        <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
                        </svg>
                    </button>
                    <ul id="dropdown-example" class="hidden py-2 space-y-2">
                        <li>
                            <RouterLink to="/tables" class="flex items-center w-full p-2 text-gray-400 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">
                                Maestro de usuarios
                            </RouterLink>
                        </li>
                        <li>
                            <RouterLink to="/tablesRoles" class="flex items-center w-full p-2 text-gray-400 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">
                                Maestro de Roles
                            </RouterLink>
                        </li>
                    </ul>
                </li>
                
                <li v-if="hasPermission(3)">
                    <RouterLink to="#" class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                        <svg class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                            <path d="M17 5.923A1 1 0 0 0 16 5h-3V4a4 4 0 1 0-8 0v1H2a1 1 0 0 0-1 .923L.086 17.846A2 2 0 0 0 2.08 20h13.84a2 2 0 0 0 1.994-2.153L17 5.923ZM7 9a1 1 0 0 1-2 0V7h2v2Zm0-5a2 2 0 1 1 4 0v1H7V4Zm6 5a1 1 0 1 1-2 0V7h2v2Z"/>
                        </svg>
                        <span class="flex-1 ms-3 whitespace-nowrap">Lead Time</span>
                    </RouterLink>
                </li>
                <li>
                    <div @click="handleLogout" class="flex items-center p-2 cursor-pointer text-gray-400 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                        <svg class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 16">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3"/>
                        </svg>
                        <span class="flex-1 ms-3 whitespace-nowrap">Cerrar sesión</span>
                    </div>
                </li>
            </ul>

        
        </div>
    </aside>
</template>