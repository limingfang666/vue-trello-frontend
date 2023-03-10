import * as api from '@/api/api'

const state = () => {
    boards: []
}

const getters = () => {

}

const actions = {
    // { commit, state }, payload
    findAllBoards: async({ commit, state }, boards) => {
        try {
            let allBoards = await api.getAllBoard();
            if (allBoards) {
                commit('updateBoards', allBoards.data.data);
            }
        } catch (error) {
            throw error;
        }
    }

}

const mutations = {
    // 参数类型 state, payload
    updateBoards: (state, boards) => {
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