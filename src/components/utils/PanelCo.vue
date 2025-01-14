
<template>
    <div class="card flex justify-center">
        <PanelMenu :model="items" class="w-full md:w-80">
            <template #item="{ item }">
                <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
                    <a v-ripple class="flex items-center cursor-pointer text-surface-700 dark:text-surface-0 px-4 py-2" :href="href" @click="navigate">
                        <span :class="item.icon" />
                        <span class="ml-2">{{ item.label }}</span>
                    </a>
                </router-link>
                <a v-else v-ripple class="flex items-center cursor-pointer text-surface-700 dark:text-surface-0 px-4 py-2" :href="item.url" :target="item.target">
                    <span :class="item.icon" />
                    <span class="ml-2">{{ item.label }}</span>
                    <span v-if="item.items" class="pi pi-angle-down text-primary ml-auto" />
                </a>
            </template>
        </PanelMenu>
    </div>
</template>

<script setup>
import { ref } from "vue";
import PanelMenu from 'primevue/panelmenu';

const items = ref([
  {
    label: 'Galpones',
    icon: 'pi pi-warehouse',
    items: [
      {
        label: 'Galpones - Nuevo',
        route: '/sheds/new'
      },
      {
        label: 'Galpones - Listado',
        route: '/sheds/list'
      },
      {
        label: 'Galpones - Cambio',
        route: '/sheds/change'
      }
    ]
  },
  {
    label: 'Usuarios',
    icon: 'pi pi-users',
    items: [
      {
        label: 'Usuarios - Nuevo',
        route: '/users/new'
      },
      {
        label: 'Usuarios - Listado',
        route: '/users/list'
      }
    ]
  },
  {
    label: 'Incidencias',
    icon: 'pi pi-exclamation-circle',
    route: '/incidents'
  }
]);
</script>
