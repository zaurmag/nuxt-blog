<template>
  <div class="error-page">
    <div class="error-page-body">
      <h1 class="error-page-title">
        Ошибка 404!
      </h1>
      <router-link class="el-link el-link--primary" to="/">
        Вернуться на главную
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ErrorLayout'
}
</script>

<style lang="sass" scoped>
.error-page
  &-body
    padding-top: 100px
    max-width: 600px
    margin: 0 auto
    text-align: center

  &-title
    font-weight: 500
    font-size: 60px
    color: crimson
    margin: 0 0 30px
</style>
