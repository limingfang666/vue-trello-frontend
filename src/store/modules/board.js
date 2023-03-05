import * as api from '@/api/api'

const state = () => {
    boards: []
}

const getters = () => {

}

const actions = {
    findAllBoards: async({ commit, state }, boards) => {
        let allBoards = await api.getAllBoard();
        console.log(allBoards);
        commit('updateBoards', allBoards);
    }

}

const mutations = {
    updateBoards: ({ commit, state }, boards) => {
        state.boards = boards;
    }
}


export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}