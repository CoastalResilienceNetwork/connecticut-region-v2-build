import { createRouter, createWebHashHistory } from 'vue-router'


const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/start'
    },
    {
      path: '/start',
      name: 'start',
      component: () => import('../views/GetStarted.vue'),
    },
    {
      path: '/projects',
      name: 'projects',
      component: () => import('../views/ResilienceProjects.vue'),
    },
    {
      path: '/regional-planning',
      name: 'rPlanning',
      component: () => import('../views/RegionalPlanning.vue'),
    },
    {
      path: '/community-planning',
      name: 'cPlanning',
      component: () => import('../views/CommunityPlanning.vue'),
    },
    {
      path: '/future-habitat',
      name: 'futurehab',
      component: () => import('../views/FutureHabitat.vue'),
    },
    {
      path: '/sea-level-rise',
      name: 'fslr',
      component: () => import('../views/FloodSeaLevelRise.vue'),
    },
      {
      path: '/risk-explorer',
      name: 'risk',
      component: () => import('../views/RiskExplorer.vue'),
    },
  ],
})

export default router
