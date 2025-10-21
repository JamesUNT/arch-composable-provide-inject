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
          name: 'Form',
          component: () => import('@/pages/form/form-page.vue'),
        },
      ],
    },
  ],
})

export default router
