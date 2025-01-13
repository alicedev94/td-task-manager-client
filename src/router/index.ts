import { createRouter, createWebHistory } from 'vue-router';
import MainRoutes from './MainRouter';
import AuthRoutes from './AuthRouter';
import { useAuthStore } from '@/stores/Auth';

const routes = [
  AuthRoutes,
  MainRoutes,
  {
    path: '/:pathMatch(.*)*',
    component: () => import('@/views/404/ErrorApp404.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const publicPages = ['/'];
  const authRequired = !publicPages.includes(to.path);
  const auth: any = useAuthStore();

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (authRequired && !auth.user) {
      auth.returnUrl = to.fullPath;
      return next('/');
    } else next();
  } else {
    next();
  }
});

export default router;
