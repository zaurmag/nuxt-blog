<template>
  <el-menu
    router
    :default-active="$route.path"
    class="admin-sidebar-menu"
  >
    <el-menu-item index="/admin">
      <i class="el-icon-s-data" />
      <span>Аналитика</span>
    </el-menu-item>

    <el-menu-item index="/admin/create">
      <i class="el-icon-edit-outline" />
      <span>Создать</span>
    </el-menu-item>

    <el-menu-item index="/admin/list">
      <i class="el-icon-tickets" />
      <span>Список</span>
    </el-menu-item>

    <el-menu-item index="/admin/users">
      <i class="el-icon-user" />
      <span>Пользователи</span>
    </el-menu-item>

    <el-menu-item index="/admin/logout">
      <i class="el-icon-back" />
      <span>Выйти</span>
    </el-menu-item>
  </el-menu>
</template>

<script>
export default {
  name: 'AdminSidebar'
}
</script>

<style scoped lang="scss">
  .admin-sidebar-menu {
    height: 100%;
  }
</style>
