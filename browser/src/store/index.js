import Vue from 'vue'
import Vuex from 'vuex'
import Objects from './modules/Objects';

Vue.use(Vuex)

const Store = new Vuex.Store({
    modules: {
        Objects
    },
    strict: process.env.DEV
})

export default Store;