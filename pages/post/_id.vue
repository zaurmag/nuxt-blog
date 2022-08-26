<template>
  <article class="post">
    <div class="post-back">
      <nuxt-link to="/" class="el-button el-button--default el-button--mini is-round">
        <i class="el-icon-back" />
        На главную
      </nuxt-link>
    </div>
    <header class="post-header">
      <h1 class="post-title">
        {{ post.title }}
      </h1>
      <div class="post-info">
        <small class="post-info-item">
          <i class="el-icon-time" />
          {{ post.date | date }}
        </small>
        <small class="post-info-item">
          <i class="el-icon-view" />
          {{ post.views }}
        </small>
      </div>

      <div class="post-image">
        <img
          :src="post.imageUrl"
          :alt="post.title"
          class="post-image"
        >
      </div>
    </header>

    <main class="post-body">
      <vue-markdown :source="post.text" />
    </main>

    <footer class="post-footer">
      <aside class="comments">
        <h2 class="comments-title">
          Комментарии ({{ post.comments.length }})
        </h2>

        <!-- Form -->
        <app-comments-form
          v-if="canAddComment"
          :post-id="post._id"
          @created="submitComment"
        />

        <div v-if="post.comments.length" class="comments-list">
          <app-comment
            v-for="comment in post.comments"
            :key="comment._id"
            :comment="comment"
          />
        </div>
        <p v-else class="text-center">
          Нет комментариев
        </p>
      </aside>
    </footer>
  </article>
</template>

<script>
import AppComment from '~/components/main/AppComment'
import AppCommentsForm from '~/components/main/AppCommentsForm'

export default {
  name: 'AppPostView',
  head () {
    return {
      title: `${this.post.title} | ${process.env.appName}`
    }
  },
  components: {
    AppComment,
    AppCommentsForm
  },
  validate ({ params }) {
    return Boolean(params.id)
  },
  async asyncData ({ store, params }) {
    const post = await store.dispatch('posts/fetchPostById', params.id)
    await store.dispatch('posts/addViews', post)

    return { post, views: ++post.views }
  },
  data () {
    return {
      canAddComment: true
    }
  },
  methods: {
    submitComment (comment) {
      this.post.comments.unshift(comment)
      this.canAddComment = false
    }
  }
}
</script>

<style lang="scss" scoped>
.post {
  max-width: 600px;
  margin: 0 auto;

  &-back {
    margin-bottom: 20px;
  }

  &-header {
    margin-bottom: 25px;
  }

  &-title {
    margin-bottom: 20px;
    font-size: 24px;
  }

  &-info {
    color: #666;
    margin-bottom: 15px;
    display: flex;
    align-items: center;

    &-item {
      &:not(:last-child) {
        margin-right: 20px;
      }
    }
  }

  &-image {
    max-width: 100%;
    height: auto;
  }

  &-body {
    p {
      font-size: 16px;
      line-height: 1.5;
      color: #555;

      &:not(:last-child) {
        margin-bottom: 25px;
      }
    }
  }

  &-footer {
    margin-top: 20px;
  }
}

.comments {
  margin-top: 40px;

  &-title {
    margin: 0 0 25px;
    font-weight: 500;
    font-size: 24px;
  }
}
</style>
