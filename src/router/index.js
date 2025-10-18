import { createRouter, createWebHistory } from 'vue-router'
import LayoutDefault from '@/layouts/LayoutDefault.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'DefaultLayout',
      component: LayoutDefault,
      children: [
        {
          path: '',
          name: 'Fruit Shop',
          component: () => import('@/pages/fruit-shop-page/fruit-shop-page.vue'),
        },
      ],
    },
  ],
})

export default router
