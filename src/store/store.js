/*
 * @Description: vuex模块化处理
 * @Author: lmfang
 * @Date: 2022-11-14 16:10:42
 * @LastEditTime: 2022-11-15 17:33:36
 * @LastEditors: lmfang
 */
import { createStore, createLogger } from 'vuex'
import user from '@/store/modules/user'
import board from '@/store/modules/board'

const debug = process.env.NODE_ENV !== 'production';

export default createStore({
    modules: {
        user,
        board
    },
    strict: debug,
    plugins: debug ? [createLogger()] : []

});