<template>
  <el-card
    v-if="post"
    shadow="hover"
    :body-style="{padding: 0}"
    class="post"
  >
    <header slot="header" class="post-header">
      <h3>{{ post.title }}</h3>
      <small>
        <i class="el-icon-time" />
        {{ post.date | date }}
      </small>
    </header>

    <div class="post-body">
      <img
        :src="post.imageUrl"
        :alt="post.title"
        class="post-image"
      >
    </div>

    <footer class="post-footer">
      <el-button round @click="openPost(post._id)">
        Открыть
      </el-button>
      <span>
        <i class="el-icon-message" />
        {{ post.comments.length }}
      </span>
    </footer>
  </el-card>
</template>

<script>
export default {
  name: 'AppPost',
  props: {
    post: {
      type: Object,
      required: true
    }
  },
  methods: {
    openPost (id) {
      this.$router.push(`/post/${id}`)
    }
  }
}
</script>

<style lang="scss" scoped>
  .post {
    &-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    &-image {
      max-width: 100%;
      height: auto;
      display: block;
    }

    &-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 18px 20px;
    }

    &:not(:last-child) {
      margin-bottom: 20px;
    }
  }
</style>
