/*
 * @Description: 路由文件
 * @Author: lmfang
 * @Date: 2022-11-14 16:11:05
 * @LastEditTime: 2023-03-05 14:06:48
 * @LastEditors: lmfang
 */

import { createRouter, createWebHistory } from 'vue-router'
import { login } from '@/api/api'
import Store from '@/store/store'

const Login = () =>
    import ( /* webpackChunkName: "Login" */ '@/views/Login.vue');
const Register = () =>
    import ( /* webpackChunkName: "Register" */ '@/views/Register.vue');
const Home = () =>
    import ( /* webpackChunkName: "Home" */ '@/views/Home.vue');
const Board = () =>
    import ( /* webpackChunkName: "Board" */ '@/views/Board.vue');
const Card = () =>
    import ( /* webpackChunkName: "Card" */ '@/views/Card.vue');
const NotFound = () =>
    import ( /* webpackChunkName: "NotFound" */ '@/views/NotFound.vue');

const routes = [
    { name: 'Login', path: '/login', component: Login },
    { name: 'Register', path: '/register', component: Register },
    {
        name: 'Home',
        path: '/',
        component: Home,
        meta: {
            authentication: true,
        },
    },
    {
        name: 'Board',
        path: '/board',
        component: Board,
        meta: {
            authentication: true,
        },
    },
    {
        name: 'Board',
        path: '/board/:id(\\d+)',
        component: Board,
        meta: {
            authentication: true,
        },
        children: [
            // 注意子路由，path最前面没有/,否则会报警告[Vue Router warn]: Absolute path "/list/:listId(\d+)/card/:cardId(\d+)" must have the exact same param named "id" as its parent "/board/:id(\d+)".
            {
                name: 'Card',
                path: 'list/:listId(\\d+)/card/:cardId(\\d+)',
                meta: {
                    authentication: true,
                },
                component: Card
            }
        ]
    },
    // vue3不再使用path:'*'正则匹配，而是使用/pathMatch(.*)*或/pathMatch(.*)或/catchAll(.*)
    { name: 'NotFound', path: '/404', component: NotFound },
    { path: '/:pathMatch(.*)', redirect: '/404' },
];

const router = createRouter({
    history: createWebHistory(),
    // 提供的可选 base。当应用程序被托管在诸如 https://example.com/folder/ 之类的文件夹中时非常有用。
    // base: process.env.VUE_APP_BASE_URL, //打包路径，默认为/，可以修改
    routes
})

// 每次刷新时将内存中的loginUser信息存储到vuex中，否则手动刷新时获取不到user信息
Store.commit("user/initUser");

// 路由守卫鉴权处理(判断设置了authentication鉴权的路由，判断token和user信息)
router.beforeEach((to, from, next) => {
    // !isToken没有找到token
    let isToken = !!localStorage.getItem("token");

    // to.matched.some找到的是父级和子级其中有一个需要鉴权设置，则都需要进行鉴权
    let isAuthenticated = to.matched.some(item => item.meta.authentication)

    // 加上user信息校验(从localStorage中获取/或者每次发请求时重新去请求user数据Store.commit("user/initUser")后Store.state.user.user获得)
    let loginUser = Store.state.user.user;

    // 有authentication，有token直接跳转；有authentication，无token跳转到登录页
    // 无authentication，有token无token都可以直接跳转
    if (isAuthenticated) {
        // 如果有token有user信息，直接跳转
        // 如果有token，没有user信息，清空localStorage的token信息然后跳转到登录页面
        if (isToken) {
            if (!loginUser) {
                localStorage.removeItem('token');
            } else {
                next();
            }
        } else {
            // 如果没有token，不管有没有user信息都需要重新登录
            router.push("/login")
        }
    } else {
        next();
    }
});

export default router;