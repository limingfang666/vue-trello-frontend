/*
 * @Description: 统一处理后端请求接口
 * @Author: lmfang
 * @Date: 2022-11-14 16:10:11
 * @LastEditTime: 2023-03-05 14:58:52
 * @LastEditors: lmfang
 */

import axios from "axios";
// js不是vue组件，不能直接通过this获取到this.$message，所以需要重新引入
import TMessage from '@/components/TMessage/TMessage.js'
import router from '@/route/route';

// 基本路径设置(/api)
axios.defaults.baseURL = process.env.VUE_APP_BASE_API;

// 对请求头进行处理（token）
axios.interceptors.request.use(configs => {
    let token = localStorage.getItem("token");
    if (token) {
        configs.headers.authorization = token;
    }
    return configs;
});

// 处理返回数据
axios.interceptors.response.use(response => {
    // 将返回的authorization设置到localStorage中的token
    if (response.headers.authorization) {
        localStorage.setItem("token", response.headers.authorization);
    }
    return response;
}, error => {
    console.log(error);
    // 对返回的错误信息进行统一处理
    let { message, errorDetail } = error.response.data;
    if (errorDetail) {
        message += " : " + errorDetail;
    }

    switch (error.response.data.statusCode) {
        case 401:
            TMessage.error(message);
            localStorage.removeItem("token");
            localStorage.removeItem("loginUser");
            router.push({ path: '/login' });
            break;
        default:
            // 对返回的错误信息进行统一处理
            TMessage.error(message);
            break;

    }
});

export const register = (data) => {

    return axios({
        method: 'post',
        url: '/user/register',
        data
    });
}

export const login = (data) => {
    return axios({
        method: 'post',
        url: '/user/login',
        data
    });
}

/**
 * 获取所有面板
 */
export const getAllBoard = () => {
    return axios({
        method: 'get',
        url: '/board/getAllBoards',
    });
}