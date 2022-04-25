import { createRouter, createWebHistory } from 'vue-router';


const routes = [
    {
        name: 'login',
        path: '/',
        component: () => import('@/views/Login.vue')
    },
    {
        name: 'publications',
        path: '/publications/',
        component: () => import('@/views/Publications.vue')
    },
    {
        name: 'profile',
        path: `/profile/:id`,
        component: () => import('@/views/Profile.vue')
    },
    {
        name: 'rechercher',
        path: `/rechercher/`,
        component: () => import('@/views/Search.vue')
    },
    {
        name: 'editPublication',
        path: '/publications/:id',
        component: () => import('@/views/EditPublication.vue')
    },
];

const router = createRouter({
    history: createWebHistory(),
    base: 'http://localhost:3000/api/',
    routes
});


export default router;