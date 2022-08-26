<template>
  <el-form
    ref="form"
    :model="form"
    class="user-form"
    :rules="rules"
    @submit.native.prevent="onSubmit"
  >
    <h2 class="user-form-title">
      Добавление нового пользователя
    </h2>
    <el-form-item label="Логин" prop="login">
      <el-input v-model="form.login" />
    </el-form-item>

    <el-form-item label="Пароль" prop="password">
      <el-input
        v-model="form.password"
        type="password"
      />
    </el-form-item>

    <el-form-item>
      <el-button
        type="primary"
        native-type="submit"
        :loading="loading"
      >
        Добавить
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'AdminUsers',
  layout: 'admin',
  middleware: ['admin-auth'],
  head: {
    title: `Добавить нового пользователя | ${process.env.appName}`
  },
  data () {
    return {
      loading: false,
      form: {
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
  methods: {
    onSubmit () {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          this.loading = true

          const formData = {
            login: this.form.login,
            password: this.form.password
          }

          try {
            await this.$store.dispatch('auth/createUser', formData)
            this.$message.success('Пользователь успешно добавлен!')
            this.form.login = ''
            this.form.password = ''
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
  .user-form {
    max-width: 450px;

    &-title {
      margin-bottom: 20px;
    }
  }
</style>
