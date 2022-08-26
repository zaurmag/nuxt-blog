<template>
  <div>
    <el-form
      ref="form"
      :model="controls"
      class="create-form"
      :rules="rules"
      @submit.native.prevent="onSubmit"
    >
      <h1 class="create-form-title">
        Добавить новый пост
      </h1>

      <el-form-item label="Заголовок поста" prop="title">
        <el-input
          v-model="controls.title"
        />
      </el-form-item>

      <el-form-item label="Текст в формате .md или .html" prop="text">
        <el-input
          v-model="controls.text"
          type="textarea"
          rows="8"
        />
      </el-form-item>

      <div class="create-form-row">
        <el-button
          type="success"
          size="small"
          plain
          @click="previewDialog = true"
        >
          Предпросмотр
        </el-button>
      </div>

      <div class="create-form-row">
        <el-upload
          ref="upload"
          drag
          :auto-upload="false"
          action="https://jsonplaceholder.typicode.com/posts/"
          :on-change="uploadImageHandler"
        >
          <i class="el-icon-upload" />
          <div class="el-upload__text">
            Перетащите файл сюда <em>или загрузите</em>
          </div>
          <div slot="tip" class="el-upload__tip">
            jpg/png файлы с размером не более 500 Кб
          </div>
        </el-upload>
      </div>

      <el-dialog
        title="Предпросмотр текста"
        :visible.sync="previewDialog"
      >
        <div :key="controls.text">
          <vue-markdown :source="controls.text" />
        </div>
      </el-dialog>

      <el-form-item>
        <el-button
          type="primary"
          native-type="submit"
          :loading="loading"
        >
          Создать
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'AdminCreate',
  layout: 'admin',
  middleware: ['admin-auth'],
  head: {
    title: `Создать новый пост | ${process.env.appName}`
  },
  data () {
    return {
      image: null,
      previewDialog: false,
      loading: false,
      controls: {
        title: '',
        text: ''
      },
      rules: {
        title: [
          {
            required: true,
            message: 'Поле заголовка не может быть пустым',
            trigger: 'blur'
          }
        ],
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
  methods: {
    uploadImageHandler (file) {
      this.image = file.raw
    },
    onSubmit () {
      this.$refs.form.validate(async (valid) => {
        if (valid && this.image) {
          this.loading = true

          const formData = {
            title: this.controls.title,
            text: this.controls.text,
            image: this.image
          }

          try {
            await this.$store.dispatch('posts/create', formData)
            this.controls.title = ''
            this.controls.text = ''
            this.image = null
            this.$refs.upload.clearFiles()
            this.$message.success('Пост успешно создан!')
          } catch (e) {} finally {
            this.loading = false
          }
        } else {
          this.$message.warning('Форма не валидна!')
        }
      })
    }
  }
}
</script>

<style scope lang="scss">
  .create-form {
    max-width: 600px;

    &-title {
      margin: 0 0 20px;
    }

    &-row {
      margin-bottom: 20px;
    }
  }
</style>
