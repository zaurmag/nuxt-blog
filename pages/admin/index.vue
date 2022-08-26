<template>
  <div>
    <h1>Аналитика постов</h1>
    <admin-analytic
      title="Комментарии"
      :labels="comments.labels"
      :data="comments.data"
    />

    <admin-analytic
      title="Просмотры"
      :labels="views.labels"
      :data="views.data"
    />
  </div>
</template>

<script>
import AdminAnalytic from '~/components/admin/AdminAnalytic'

export default {
  name: 'IndexAdmin',
  layout: 'admin',
  middleware: ['admin-auth'],
  components: { AdminAnalytic },
  head: {
    title: `Аналитика постов | ${process.env.appName}`
  },
  async asyncData ({ store }) {
    const { comments, views } = await store.dispatch('posts/analytics')

    return { comments, views }
  }
}
</script>
