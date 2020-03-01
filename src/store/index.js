import Vuex from "vuex";
import Vue from "vue";
import getNodeStatus from "@/scripts/transcoders"

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        web3Obj: {
            web3: {},
            provider: {},
            connected: false,
            address: "",
            chainID: "",
            networkID: ""
        },
        status: {
            lpVersion: "",
            transcoders: []
        }
    },
    actions: {
        storeWeb3({commit}, web3Obj) {
            commit("storeWeb3", web3Obj)
        },
        storeAddress({commit}, address) {
            commit("storeAddress", address)
        },
        storeStatus({commit}) {
           getNodeStatus(commit)
        }
    },
    mutations: {
        storeWeb3(state, web3Obj) {
            state.web3Obj = {...web3Obj}
        },
        storeAddress(state, address) {
            state.web3Obj.address = address
        },
        storeStatus(state, status) {
            state.status = {...status}
        }
    },
})