import { createRouter, createWebHistory } from 'vue-router';
import Login from '@/views/Login.vue';
import Publications from '@/views/Publications.vue';
import Profile from '@/views/Profile.vue';
import EditPublication from '@/views/EditPublication.vue';


const routes = [
    {
        name: 'login',
        path: '/',
        component: Login
    },
    {
        name: 'publications',
        path: '/publications/',
        component: Publications
    },
    {
        name: 'profile',
        path: `/profile/:id`,
        component: Profile
    },
    {
        name: 'editPublication',
        path: '/publications/:id',
        component: EditPublication
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes
});


export default router;