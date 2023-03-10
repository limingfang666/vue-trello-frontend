<!--
 * @Description: 登录页面
 * @Author: lmfang
 * @Date: 2022-11-14 16:03:24
 * @LastEditTime: 2022-12-06 11:06:43
 * @LastEditors: lmfang
-->
<template>
  <div id="register-login">
    <!-- <t-message></t-message> -->
    <a class="logo" href="/"></a>

    <div class="section-wrapper">
      <div class="account-form">
        <h1>登录到 Trello</h1>
        <form id="register-form" @submit.prevent="onSubmit" method="POST">
          <div>
            <label>
              <input
                v-model.trim="user.name"
                class="form-field"
                autofocus="autofocus"
                @keyup.enter="submitLogin"
                placeholder="输入用户名"
              />
            </label>
          </div>
          <div>
            <label>
              <input
                v-model.trim="user.password"
                type="password"
                class="form-field"
                @keyup.enter="submitLogin"
                placeholder="输入密码"
              />
            </label>
          </div>
          <div>
            <!-- @submit.prevent="onSubmit" form表单中取消自动提交，而是使用@click手动提交 -->
            <input
              type="submit"
              @click.enter="submitLogin"
              class="btn btn-success"
              value="登录"
            />
            <span class="signin-signup-separator">或者</span>
            <input
              type="button"
              @click="gotoRegister"
              class="btn"
              value="注册"
            />
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
// import { mapGetters, mapState } from 'vuex'

export default {
  name: 'Login',
  //   当一个组件需要获取多个状态的时候，将这些状态都声明为计算属性会有些重复和冗余,可以使用 mapState 辅助函数帮助我们生成计算属性
  data () {
    return {
      user: {
        name: '',
        password: '',
      }
    }
  },
  methods: {
    async submitLogin () {
      if (this.user.name.trim() === '' || this.user.password.trim() === '') {
        return this.$message.error("登录失败：用户名或密码不能为空");
      }
      try {
        await this.$store.dispatch('user/login', this.user);
        // 登录成功后跳转到home页面
        this.$router.push({
          path: '/'
        });
        //   只要catch错误就行，api中有对错误进行统一处理
      } catch (error) { }
    },
    gotoRegister () {
      this.$router.push({
        path: '/register'
      });
    }
  }
}
</script>