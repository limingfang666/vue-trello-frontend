/*
 * @Description: 
 * @Author: lmfang
 * @Date: 2022-11-15 17:31:50
 * @LastEditTime: 2022-12-02 17:29:35
 * @LastEditors: lmfang
 */
import * as api from '@/api/api'

const state = () => {
    // 直接赋值需要使用sessionStorage.getItem("loginUser"),localStorage不行
    user: {}
}

const getters = () => {

}

const actions = {
    // 注意async位置和箭头函数写法
    login: async({ commit }, user) => {
        // 调用登录接口
        try {
            let loginUser = await api.login(user);

            if (loginUser.status === 201) {
                // 调用mutations的login方法
                commit('login', loginUser.data);
            }
        } catch (error) {
            // 此处要抛出错误，组件中才能捕捉到
            throw error;
        }
    },

    register: async({ commit, state }, user) => {
        // 调用注册接口，注册不需要更新vuex，所以不需要调用mutations
        try {
            let registerUser = await api.register(user);
            if (registerUser) {
                return registerUser;
            }
        } catch (error) {
            throw error;
        }
    },

}

const mutations = {
    initUser: (state) => {
        // 从localStorage中获取数据设置进user中，否则通过刷新页面时，获取不到state中的user信息
        state.user = JSON.parse(localStorage.getItem("loginUser"));
    },

    login: (state, user) => {
        // 登录成功后将user信息存到state中，且缓存到localStorage中
        state.user = user;
        localStorage.setItem("loginUser", JSON.stringify(user));
    },

}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}