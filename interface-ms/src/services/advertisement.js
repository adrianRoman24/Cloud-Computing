import axios from 'axios';
import FilterService from '@/services/filter.js'

const apiClient = axios.create({
    baseURL: 'http://172.28.69.57:3001/',
});

apiClient.interceptors.request.use((config) => {
    return config;
});

apiClient.interceptors.response.use((response) => {
    return response;
});

const getAllAdvertisements = (payload) => {
    let url = '/advertisement';

    url = FilterService.addFiltersToURL(url, payload);

    return apiClient.get(url);
};

const createAdvertisement = (payload) => {
    let url = '/advertisement';

    return apiClient.post(url, payload);
};

export default {
    getAllAdvertisements,
    createAdvertisement
};