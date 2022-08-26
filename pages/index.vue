<template>
  <el-row type="flex" justify="center">
    <el-col :xs="24" :sm="18" :md="12" :lg="10">
      <app-post
        v-for="post in posts"
        :key="post._id"
        :post="post"
      />
    </el-col>
  </el-row>
</template>

<script>
import AppPost from '~/components/main/AppPost'

export default {
  name: 'IndexPage',
  head: {
    title: `Тестовый сайт на Nuxt.js | ${process.env.appName}`
  },
  async asyncData ({ store }) {
    const posts = await store.dispatch('posts/fetchPosts')

    return { posts }
  },
  components: {
    AppPost
  }
}
</script>
