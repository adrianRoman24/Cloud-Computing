import AdvertisementService from '@/services/advertisement.js'

export const namespaced = true;

export const state = {
    advertisements: null,
};

export const mutations = {
    SET_ADVERTISEMENTS(state, payload) {
        state.advertisements = payload;
    },
};

export const actions = {
    async getAllAdvertisements({commit}, payload) {
        try {
            // TODO 
            const response = await AdvertisementService.getAllAdvertisements(payload);
            // const response = AdvertisementService.getAllAdvertisements(payload);

            commit('SET_ADVERTISEMENTS', response.data);
        } catch (error) {
            console.log(error)
        }
    },

    async createAdvertisement({commit}, payload) {
        try {
            const response = await AdvertisementService.createAdvertisement(payload);
        } catch (error) {
            console.log(error)
        }
    },
};

export const getters = {
    advertisements: (state) => state.advertisements,
};
