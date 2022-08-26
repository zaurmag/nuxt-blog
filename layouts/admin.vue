<template>
  <el-container class="admin-container">
    <el-aside class="admin-sidebar">
      <admin-sidebar />
    </el-aside>
    <el-main>
      <nuxt />
    </el-main>
  </el-container>
</template>

<script>
import AdminSidebar from '~/components/admin/AdminSidebar'

export default {
  name: 'AdminLayout',
  computed: {
    error () {
      return this.$store.getters.error
    }
  },
  watch: {
    error (value) {
      this.$message.error(value.response.data.message)
    }
  },
  components: {
    AdminSidebar
  }
}
</script>

<style lang="scss" scoped>
  .admin {
    &-container {
      height: 100vh;
    }
  }
</style>
