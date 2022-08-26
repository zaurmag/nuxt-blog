<template>
  <div>
    <el-breadcrumb class="admin-breadcrumb" separator="/">
      <el-breadcrumb-item to="/admin/list">
        Посты
      </el-breadcrumb-item>
      <el-breadcrumb-item>{{ post.title }}</el-breadcrumb-item>
    </el-breadcrumb>

    <div class="admin-post-form">
      <el-form
        ref="form"
        :model="controls"
        class="login-form"
        :rules="rules"
        @submit.native.prevent="onSubmit"
      >
        <el-form-item label="Текст в формате .md или .html" prop="text">
          <el-input
            v-model="controls.text"
            type="textarea"
            rows="8"
          />
        </el-form-item>

        <div class="form-info">
          <div class="form-info-item">
            <i class="el-icon-time" />
            {{ post.date | date }}
          </div>

          <div class="form-info-data">
            <i class="el-icon-view" />
            {{ post.views }}
          </div>
        </div>

        <el-form-item>
          <el-button
            type="primary"
            native-type="submit"
            :loading="loading"
          >
            Обновить
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PostAdmin',
  layout: 'admin',
  middleware: ['admin-auth'],
  head () {
    return {
      title: `${this.post.title} | ${process.env.appName}`
    }
  },
  async asyncData ({
    store,
    params
  }) {
    const post = await store.dispatch('posts/fetchAdminPostById', params.id)

    return {
      post
    }
  },
  data () {
    return {
      loading: false,
      controls: {
        text: ''
      },
      rules: {
        text: [
          {
            required: true,
            message: 'Введите текст поста',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  mounted () {
    this.controls.text = this.post.text
  },
  methods: {
    onSubmit () {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          this.loading = true

          const formData = {
            text: this.controls.text,
            id: this.post._id
          }

          try {
            await this.$store.dispatch('posts/updateAdminPost', formData)
            this.$message.success('Пост успешно обновлен!')
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
  .admin-breadcrumb {
    margin-bottom: 30px;
  }

  .admin-post-form {
    max-width: 600px;
    width: 100%;
  }

  .form-info {
    display: flex;
    align-items: center;
    font-size: 12px;
    margin-bottom: 20px;

    &-item {
      &:not(:last-child) {
        margin-right: 20px;
      }
    }
  }
</style>
