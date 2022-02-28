import { createRouter, createWebHistory } from 'vue-router';
import Login from '@/views/Login.vue';
import Home from '@/views/Home.vue';
import Profile from '@/views/Profile.vue';
import Publication from '@/views/Publication.vue';
import EditPublication from '@/views/EditPublication.vue';


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
        path: `/profile/:id`,
        component: Profile
    },
    {
        name: 'publication',
        path: '/publication',
        component: Publication
    },
    {
        name: 'editPublication',
        path: '/modification',
        component: EditPublication
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes
});


export default router;