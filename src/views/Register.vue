<!--
 * @Description: 注册页面
 * @Author: lmfang
 * @Date: 2022-11-14 16:05:05
 * @LastEditTime: 2022-12-06 11:04:52
 * @LastEditors: lmfang
-->
<template>
  <div id="register-login">
    <a class="logo" href="/"></a>

    <div class="section-wrapper">
      <div class="account-form">
        <h1>注册 Trello</h1>
        <form id="login-form" method="POST" @submit.prevent>
          <div>
            <label>
              <input
                class="form-field"
                v-model.trim="user.name"
                autofocus="autofocus"
                placeholder="输入用户名"
              />
            </label>
          </div>
          <div>
            <label>
              <input
                type="password"
                v-model.trim="user.password"
                class="form-field"
                placeholder="输入密码"
              />
            </label>
          </div>
          <div>
            <label>
              <input
                type="password"
                v-model.trim="user.rePassword"
                class="form-field"
                placeholder="再次确认密码"
              />
            </label>
          </div>
          <div>
            <input
              type="submit"
              @click="submitRegister"
              class="btn btn-success"
              value="注册"
            />
            <span class="signin-signup-separator">或者</span>
            <input type="button" @click="gotoLogin" class="btn" value="登录" />
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Register',
  data () {
    return {
      user: {
        name: '',
        password: '',
        rePassword: ''
      }
    }
  },
  methods: {
    async submitRegister () {
      if (this.user.name.trim() === '' || this.user.password.trim() === '') {
        return this.$message.error("注册失败：用户名或密码不能为空");
      }
      if (this.user.rePassword.trim() === '') {
        return this.$message.error("注册失败：请输入确认密码");
      }
      if (this.user.password.trim() !== this.user.rePassword.trim()) {
        return this.$message.error("注册失败：两次输入密码不一致");
      }
      try {
        //   验证通过
        let registerUser = await this.$store.dispatch('user/register', this.user);
        console.log(registerUser);
        if (registerUser.status) {
          this.$message.success("亲爱的用户" + registerUser.data.name + "，恭喜您注册成功，请重新登录");
          //   注册成功后，清空表单
          this.user = {};
        }
      } catch (error) { }
    },
    gotoLogin () {
      this.$router.push({
        path: '/login'
      });
    }
  }
}
</script>