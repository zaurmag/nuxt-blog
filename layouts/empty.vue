<template>
  <div class="empty-layout-wrapper">
    <el-card
      shadow="always"
      class="empty-layout-card"
    >
      <nuxt />
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'EmptyLayout',
  computed: {
    error () {
      return this.$store.getters.error
    }
  },
  watch: {
    error (value) {
      this.$message.error(value.response.data.message)
    }
  }
}
</script>

<style scoped lang="scss">
.empty-layout {
  &-card {
    margin: 50px auto 0;
    max-width: 450px;
    width: 100%;
  }

  &-wrapper {
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
