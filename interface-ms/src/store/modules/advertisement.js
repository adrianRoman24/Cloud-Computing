import AdvertisementService from '@/services/advertisement.js'

export const namespaced = true;

export const state = {
    advertisements: null,
    message: null,
};

export const mutations = {
    SET_ADVERTISEMENTS(state, payload) {
        state.advertisements = payload;
    },
    SET_MESSAGE(state, payload) {
        state.message = payload;
    },
};

export const actions = {
    async getAllAdvertisements({commit}, payload) {
        try {
            const response = await AdvertisementService.getAllAdvertisements(payload);

            commit('SET_ADVERTISEMENTS', response.data);
        } catch (error) {
            console.log(error)
        }
    },

    async createAdvertisement({dispatch}, payload) {
        try {
            const response = await AdvertisementService.createAdvertisement(payload);
            dispatch('setMessage', "Advertisement was successfully created!");
            
        } catch (error) {
            console.log(error)
        }
    },

    async setMessage({commit}, payload) {
        try {
            commit('SET_MESSAGE', payload);
        } catch (error) {
            console.log(error)
        }
    },
};

export const getters = {
    advertisements: (state) => state.advertisements,
    message: (state) => state.message,
};
