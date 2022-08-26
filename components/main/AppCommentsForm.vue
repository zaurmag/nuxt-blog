<template>
  <el-form
    ref="form"
    :model="commentForm"
    class="comment-form"
    :rules="rules"
    @submit.native.prevent="onSubmit"
  >
    <el-form-item label="Имя" prop="name">
      <el-input v-model="commentForm.name" />
    </el-form-item>

    <el-form-item label="Текст комментария" prop="text">
      <el-input
        v-model="commentForm.text"
        type="textarea"
        :rows="8"
      />
    </el-form-item>

    <el-form-item>
      <el-button
        type="primary"
        native-type="submit"
        :loading="loading"
      >
        Добавить комментарий
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'AppCommentsForm',
  props: {
    postId: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      loading: false,
      commentForm: {
        name: '',
        text: ''
      },
      rules: {
        name: [
          {
            required: true,
            message: 'Введите ваше имя',
            trigger: 'blur'
          }
        ],
        text: [
          {
            required: true,
            message: 'Введите текст комментария',
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
            name: this.commentForm.name,
            text: this.commentForm.text,
            postId: this.postId
          }

          try {
            const newComment = await this.$store.dispatch('comment/create', formData)
            console.log(newComment)
            this.$emit('created', newComment)
            this.$message.success('Комментарий успешно добавлен!')
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
  .comment-form {
    margin-bottom: 50px;
  }
</style>
