/*
 * @Description: 
 * @Author: lmfang
 * @Date: 2022-11-14 15:36:38
 * @LastEditTime: 2022-11-30 17:57:41
 * @LastEditors: lmfang
 */
import { createApp } from 'vue'
import App from './App.vue'
// css文件直接引入
import '@/assets/css/css.css'
import router from '@/route/route'
import store from '@/store/store'
import Message from '@/components/TMessage/TMessage.js'

// Vue3将自定义组件加载到全局方法
const app = createApp(App);
app.config.globalProperties.$message = Message;

//Vue全局异常捕获，落日志
// const errorHandler = (err, vm, info) => {
//     // Message.error(err.toString());
//     if (err.isAxiosError) {
//         Message.error(err.toString());
//     }
// }

// app.config.errorHandler = errorHandler;

// 4.创建一个vue应用，将App组件和定义的路由放入到vue应用，并挂载到模板页面id为app的元素上。
app.use(router).use(store).mount('#app')