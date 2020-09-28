<template>
  <div class="page-login">
    <a-row type="flex" justify="space-around" align="middle">
      <a-col class="col-form">
        <a-row>
          <a-col><login-form></login-form></a-col>
        </a-row>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import LoginForm from "../components/LoginForm.vue";

export default {
    name: 'Login',
    components: {
      LoginForm
    }
}
</script>
<style scoped>
.page-login {
  min-height: 100vh;
  background-color: gray;
  box-shadow: -6px 0 6px -4px rgba(0, 0, 0, 0.15);
}
.page-login > div.ant-row-flex {
  min-height: 100vh;
}
.col-form {
  background-color: white;
  padding: 50px 20px;
  width: 340px;
  border-radius: 5%;
}
</style>
