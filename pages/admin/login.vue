<template>
  <el-form
    ref="form"
    :model="loginForm"
    class="login-form"
    :rules="rules"
    @submit.native.prevent="onSubmit"
  >
    <h2 class="login-form-title">
      Вход в админ-панель
    </h2>
    <el-form-item label="Логин" prop="login">
      <el-input v-model="loginForm.login" />
    </el-form-item>

    <el-form-item label="Пароль" prop="password">
      <el-input
        v-model="loginForm.password"
        type="password"
      />
    </el-form-item>

    <el-form-item>
      <el-button
        type="primary"
        native-type="submit"
        :loading="loading"
      >
        Войти
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'AdminLogin',
  layout: 'empty',
  head: {
    title: `Войти в панель администратора | ${process.env.appName}`
  },
  data () {
    return {
      loading: false,
      loginForm: {
        login: '',
        password: ''
      },
      rules: {
        login: [
          {
            required: true,
            message: 'Введите ваш логин',
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            message: 'Введите пароль',
            trigger: 'blur'
          },
          {
            min: 6,
            message: 'Минимальная длина пароля должна быть 6 символов',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  mounted () {
    const { message } = this.$route.query
    switch (message) {
      case 'login':
        this.$message.info('Необходимо авторизоваться в системе!')
        break

      case 'logout':
        this.$message.success('Вы вышли из системы!')
        break

      case 'session':
        this.$message.warning('Время авторизации истекло. Пожалуйста войдите заново!')
        break
    }
  },
  methods: {
    onSubmit () {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          this.loading = true

          const loginData = {
            login: this.loginForm.login,
            password: this.loginForm.password
          }

          try {
            await this.$store.dispatch('auth/login', loginData)
            await this.$router.push('/admin')
            this.loading = false
          } catch (e) {
            this.loading = false
          }
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .login {
    &-form {
      width: 100%;

      &-title {
        margin-bottom: 20px;
        text-align: center;
      }
    }
  }
</style>
