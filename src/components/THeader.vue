<!--
 * @Description: Home页面的header头部
 * @Author: lmfang
 * @Date: 2022-12-02 17:35:40
 * @LastEditTime: 2022-12-07 10:01:46
 * @LastEditors: lmfang
-->
<template>
  <header>
    <div class="left">
      <a href="" class="btn btn-icon">
        <i class="icon icon-home"></i>
      </a>
      <a href="" class="btn btn-icon">
        <i class="icon icon-board"></i>
        <span class="txt">看板</span>
      </a>
    </div>
    <a href="/" class="logo"></a>
    <div class="right">
      <a href="" class="btn btn-icon">
        <i class="icon icon-add"></i>
      </a>
      <div>
        <button class="avatar" @click="tiggerAvatar">
          <span>{{ prefixUsername }}</span>
        </button>
      </div>
    </div>
    <!-- 点击按钮显示弹窗 -->
    <div ref="popup" style="left: 930px;top: 98px;display: block">
      <!--弹窗，可用于对话框、弹出式菜单等-->
      <!--弹出式菜单-->
      <t-popup :user="user" ref="popup">
        <!-- 此处THeader为父级页面，TPopup为子组件页面，THeader将TPopupMenu作为模板文件插入到TPopup，所以TPopup中使用<slot></slot>，只有一个插槽，可使用默认插槽，具名插槽使用时必须有默认插槽，单独使用会报错 -->
        <t-popup-menu></t-popup-menu>
        <!-- <t-popup-menu #popContent></t-popup-menu> -->
      </t-popup>
    </div>
  </header>
</template>
<script>
import { mapState } from 'vuex'
import TPopup from '@/components/TPopup'
import TPopupMenu from '@/components/TPopupMenu'

export default {
  name: 'THeader',
  components: {
    TPopup,
    TPopupMenu
  },
  computed: {
    //   直接通过计算属性实现vue2中过滤器的作用
    ...mapState('user', {
      user: state => state.user,
      prefixUsername: state => state.user.name.substring(0, 1).toUpperCase(),
      //   模块化后的数据，获取时一定要注明模块名，否则只能获取时state.user.user
    }),
  },
  mounted () {

  },
  methods: {
    tiggerAvatar () {
      let displayFlag = this.$refs.popup.style.display;

      this.$refs.popup.style.display = displayFlag === 'none' ? 'block' : 'none';
      this.$refs.popup.style.position = 'relative';
      this.$refs.popup.style.zIndex = 0;

    }
  }
}
</script>