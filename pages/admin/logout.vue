<template>
  <div>logout</div>
</template>

<script>
export default {
  name: 'AdminLogout',
  layout: 'admin',
  middleware: ['admin-auth'],
  beforeCreate () {
    this.$store.dispatch('auth/logout')
    this.$router.push('/admin/login?message=logout')
  }
}
</script>
