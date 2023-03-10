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

      <h2>
        <span class="icon icon-board"></span>
        我的看板
      </h2> 
      <ul class="board-items">
        <li class="board-item" v-for="board in boards" :key="board.id">
          <span class="title">{{board.name}}</span>
        </li>
        <li class="board-item create-new-board">
          <textarea
            class="title form-field-input"
            placeholder="创建新看板"
          ></textarea>
        </li>
      </ul>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import THeader from '@/components/THeader'
import Board from '@/views/Board.vue'

export default {
  name: 'Home',
  components: {
    THeader,
    Board
  },
  // mapState当一个组件需要获取多个状态的时，将这些状态都声明为计算属性会有些重复和冗余。可以使用 mapState 辅助函数帮助我们生成计算属性
  computed: mapState({
    // 注意模块路径
    boards: state => state.board.boards
  }),
  
 mounted(){
      this.$store.dispatch('board/findAllBoards', null);
  },
  methods: {

  }
}
</script>