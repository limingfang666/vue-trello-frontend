<!--
 * @Description: 
 * @Author: lmfang
 * @Date: 2022-11-14 16:06:00
 * @LastEditTime: 2023-03-05 14:44:37
 * @LastEditors: lmfang
-->
<template>
  <div id="home">
    <!--头部:子组件方式引入-->
    <t-header></t-header>

    <main>
      <h2>
        <span class="icon icon-board"></span>
        我的看板
      </h2>
      <ul class="board-items">
        <li class="board-item">
          <span class="title">test</span>
        </li>
        <li class="board-item">
          <span class="title">共同努力吧！</span>
        </li>
        <li class="board-item">
          <span class="title">Welcome Board</span>
        </li>
        <li class="board-item create-new-board">
          <textarea
            class="title form-field-input"
            placeholder="创建新看板"
          ></textarea>
        </li>
      </ul>
    </main>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import THeader from '@/components/THeader'
import {onMounted} from 'vue'

export default {
  name: 'Home',
  components: {
    THeader,
  },
  computed: {
    //   ...mapState({
    //       boards: state => state.boards
    //   })
  },
 mounted(){
      this.$store.dispatch('board/findAllBoards', null);
  },
  methods: {

  }
}
</script>