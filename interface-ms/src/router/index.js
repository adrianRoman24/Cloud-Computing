import Vue from 'vue';
import VueRouter from 'vue-router';
import AdvertisementList from '@/features/advertisement/AdvertisementList.vue';
import AdvertisementCreate from '@/features/advertisement/AdvertisementCreate.vue';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        redirect: '/advertisement'
    },
    {
        path: '/advertisement',
        name: 'Advertisement',
        component: AdvertisementList,
    },
    {
        path: '/advertisement/create',
        name: 'AdvertisementCreate',
        component: AdvertisementCreate,
    },
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
});

export default router;
