import axios from 'axios';
import FilterService from '@/services/filter.js'

const apiClient = axios.create({
    baseURL: 'http://localhost:8000/',
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

    console.log(url)

    // TODO 
    return apiClient.get(url);
    //return getAdvertisementsMocks;
};

const createAdvertisement = (payload) => {
    let url = '/advertisement';

    return apiClient.post(url, payload);
};

export default {
    getAllAdvertisements,
    createAdvertisement
};

const getAdvertisementsMocks = [
        {
            id: 1,
            "mileage": "235000",
            "make": "BMW",
            "model": "316",
            "fuel": "Diesel",
            "gear": "Manual",
            "offerType": "Used",
            "price": "6800",
            "hp": "116",
            "year": "2011",
            "name": 'Bianca',
            "phone": '+40763690217'
        },
        {
            id: 2,
            "mileage": "92800",
            "make": "Volkswagen",
            "model": "Golf",
            "fuel": "Gasoline",
            "gear": "Manual",
            "offerType": "Used",
            "price": "6877",
            "hp": "122",
            "year": "2011",
            name: 'Bianca',
            phone: '+40763690217'
        },
        {
            id: 3,
            "mileage": "149300",
            "make": "SEAT",
            "model": "Exeo",
            "fuel": "Gasoline",
            "gear": "Manual",
            "offerType": "Used",
            "price": "6900",
            "hp": "160",
            "year": "2011",
            name: 'Bianca',
            phone: '+40763690217'
        },
        {
            id: 4,
            "mileage": "96200",
            "make": "Renault",
            "model": "Megane",
            "fuel": "Gasoline",
            "gear": "Manual",
            "offerType": "Used",
            "price": "6950",
            "hp": "110",
            "year": "2011",
            name: 'Bianca',
            phone: '+40763690217'
        },
        {
            id:5,
            "mileage": "156000",
            "make": "Peugeot",
            "model": "308",
            "fuel": "Gasoline",
            "gear": "Manual",
            "offerType": "Used",
            "price": "6950",
            "hp": "156",
            "year": "2011",
            name: 'Bianca',
            phone: '+40763690217'
        }
]