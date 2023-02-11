<!--
 * @Description: 
 * @Author: lmfang
 * @Date: 2022-11-14 16:06:17
 * @LastEditTime: 2022-12-01 17:07:14
 * @LastEditors: lmfang
-->
<template>
  <!-- 动画效果 -->
  <transition name="message-fade">
    <!-- 使用数据绑定class -->
    <div
      v-if="!closed"
      :class="['message', 'message-' + type, center ? 'is-center' : '']"
      :style="{ top: offset + 'px' }"
    >
      <p class="message-content">{{ message }}</p>
      <i class="icon icon-close" @click="closeTip"></i>
    </div>
  </transition>
</template>
<script>
export default {
  name: 'TMessage',
  props: {
    message: '默认提示信息',
    type: 'info',
    center: true,
    offset: 20,
    duration: 2000,
    // 用于处理所有消息提示框消失后，其他提示框的位置
    onClose: null
  },
  data () {
    return {
      //   定时器
      timer: null,
      closed: false,
    }
  },
  mounted () {
    this.timer = setTimeout(() => {
      if (!this.closed) {
        this.close();
      }
    }, this.duration);
  },
  methods: {
    close () {
      this.closed = true;
      if (typeof this.onClose === 'function') {
        this.onClose();
      }

    }
  }
}
</script>