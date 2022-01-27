import { createRouter, createWebHistory } from 'vue-router';
import Login from '@/views/Login.vue';
import Home from '@/views/Home.vue';
import Profile from '@/views/Profile.vue';
import Publication from '@/views/Publication.vue';


const routes = [
    {
        name: 'login',
        path: '/',
        component: Login
    },
    {
        name: 'home',
        path: '/home',
        component: Home
    },
    {
        name: 'profile',
        path: '/profile',
        component: Profile
    },
    {
        name: 'publication',
        path: '/publication',
        component: Publication
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes
});


export default router;