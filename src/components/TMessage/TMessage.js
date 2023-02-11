/*
 * @Description: 
 * @Author: lmfang
 * @Date: 2022-11-17 17:26:05
 * @LastEditTime: 2022-12-02 10:49:34
 * @LastEditors: lmfang
 */
import { createApp, createVNode, render } from 'vue'
import TMessage from '@/components/TMessage/TMessage.vue'

// 用于储存多个实例
let instances = [];

function Message(data) {

    // 使用该方法组件（如Login）传过来的数据没有传的变量需要有默认值，否则是undefined传给TMessage
    if (typeof data === 'string') {
        // Message("这是错误的")，除了message，其他的设置默认值
        data = {
            message: data,
            type: 'info',
        }
    }
    data = {
        ...data,
        // 设置具体data参数，根据传入的显示不同
        message: data.message ? data.message : '默认提示信息',
        type: data.type ? data.type : 'info',
        center: data.center ? data.center : true,
        offset: data.offset ? data.offset : 20,
        duration: data.duration ? data.duration : 2000
    }

    // 用于处理所有消息提示框消失后，其他提示框的位置(需要在TMessage.vue中调用)
    data.onClose = function() {
        Message.close(msgNode);

    }

    // 处理多个实例之间间距
    let offset = data.offset || 20;
    // 用于改变后的offset值记录
    let offsetTop = offset;

    //  * 0: 20
    //  * 1: 20 40 20(第0个的offset + 第0个的div高度(offsetHeight) + 第1个的offset 20)
    instances.forEach((item) => {
        // 直接通过item获取的实例offsetHeight不准确
        offsetTop += item.offsetHeight + offset + 26;
    });
    // 设置offset及TMessage.vue中的top值
    data.offset = offsetTop;

    // 创建实例
    const app = createApp(TMessage, data);
    // 准备dom容器
    const msgNode = document.createElement('div');

    // 添加到body上
    app.mount(msgNode);
    document.body.appendChild(msgNode);

    msgNode.style.top = offsetTop + 'px';
    msgNode.style.height = '20px';

    // 将当前实例加入instances
    instances.push(msgNode);
}

// 消息类型：success，info,error,warning
['error', 'info', 'success', 'warning'].forEach(item => {
    Message[item] = function(data) {
        if (typeof data === 'string') {
            data = {
                message: data
            };
        }

        data.type = item;
        return Message(data);
    };
});

// 
//  * 获取当前这个instance的高度
//  * 把这个instance后面的所有实例的top减去这个高度，再减去偏移
//  * 
Message.close = function(msgNode) {
    // 获取到DOM结构中所有新创建的Node
    let curMessage = document.querySelectorAll("div.message");

    // 找到当前div是在instances数组的下标
    let index = instances.findIndex(item => item === msgNode);
    instances = instances.filter(item => item !== msgNode);

    // 获取需要减去的高度(66=自身高度+offset高度);curMessage[0].offsetHeight才能得到真正解析后的高度
    let removeHeight = msgNode.offsetHeight + curMessage[0].offsetHeight;

    for (let i = index; i < curMessage.length; i++) {
        curMessage[i].style.top = parseInt(curMessage[i].style.top.split('px')[0]) - removeHeight + 'px';
    }

    // curMessage.length=1时是最后一次调用close方法，此时清空instances,则再次点击offsetTop不会一直累加
    if (curMessage.length == 1) {
        instances = [];
    }
}

export default Message;
Message;