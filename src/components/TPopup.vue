<!--
 * @Description: 
 * @Author: lmfang
 * @Date: 2022-12-06 16:00:38
 * @LastEditTime: 2022-12-07 10:00:39
 * @LastEditors: lmfang
-->
<template>
  <div class="popup-container">
    <div class="popup-header">
      <span class="popup-title">{{ user.name }}</span>
      <a class="popup-header-close">
        <i class="icon icon-close"></i>
      </a>
    </div>
    <div class="popup-content">
      <slot></slot>
      <slot name="popContent"></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: 'TPopup',
  props: {
    user: {}
  }
}
</script>