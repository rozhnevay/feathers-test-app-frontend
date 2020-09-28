<template>
  <a-form layout="vertical" :form="form">
    <a-form-item>
      <a-input
        @change="formChanged"
        placeholder='username'
        v-decorator="[
          'email',
          {
            rules: [
              {
                required: true,
                message: 'Please, enter email'
              }
            ]
          }
        ]"
        ><a-icon slot="prefix" type="user"
      /></a-input>
    </a-form-item>
    <a-form-item>
      <a-input
        @change="formChanged"
        placeholder='password'
        type="password"
        v-decorator="[
          'password',
          {
            rules: [
              {
                required: true,
                message: 'Please, enter password'
              }
            ]
          }
        ]"
        ><a-icon slot="prefix" type="lock"
      /></a-input>
    </a-form-item>
    <div class="login-error">{{ loginError }}</div>
    <a-row type="flex" justify="center">
      <a-button
        @click="handleSubmit "
        type="primary"
        htmlType="submit"
        role="button"
        block
      >
        Login
      </a-button>
    </a-row>
  </a-form>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'LoginForm',
  data() {
    return {
      form : this.$form.createForm(this, { name: "form_in_modal" }),
      loginError : ''
    }
  },
  methods: {
    formChanged() {
      this.loginError = "";
    },
    ...mapActions('auth', ['authenticate']),
    handleSubmit () {
      const { authenticate, $router, form, $store } = this
      authenticate({ strategy: 'local', email: form.getFieldValue("email"), password: form.getFieldValue("password") })
              .then((response) => {
                $store.commit('auth/setUser', response.user.email);
                $router.push('/books')
              })
              .catch((err) => {
                console.log(err)
                this.loginError = "Authentication error, please check email and password";
              })
    }
  },
}

</script>

<style scoped></style>
