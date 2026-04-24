import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/MovieSearchView.vue'),
    },
    {
      path: '/movie/:id',
      name: 'movie-detail',
      component: () => import('../views/MovieDetailView.vue'),
      props: true,
    },
  ],
})

export default router
