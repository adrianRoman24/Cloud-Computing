import Vue from 'vue';
import Vuex from 'vuex';
import * as advertisement from './modules/advertisement';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {},
    getters: {},
    mutations: {},
    actions: {},
    modules: {
        advertisement,
    },
});
