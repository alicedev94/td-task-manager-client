
<template>
  <div class="about">
    <div>This is dashboard</div>
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
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { initFlowbite } from 'flowbite';


import { ref } from "vue";
import { useRouter } from 'vue-router';

const router = useRouter();

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


// initialize components based on data attribute selectors
// onMounted(() => {
//   initFlowbite();
// });
</script>

