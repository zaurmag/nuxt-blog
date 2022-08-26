<template>
  <el-table
    :data="data"
    style="width: 100%;"
  >
    <el-table-column label="Дата" width="200">
      <template slot-scope="{ row: { date } }">
        <i class="el-icon-time" />
        <span style="margin-left: 10px;">{{ date | date('date') }}</span>
      </template>
    </el-table-column>
    <el-table-column label="Наименование" width="500">
      <template slot-scope="{ row: { title } }">
        <p>{{ title }}</p>
      </template>
    </el-table-column>
    <el-table-column label="Комментарии" width="180">
      <template slot-scope="{ row: { comments } }">
        <i class="el-icon-chat-line-square" />
        <span style="margin-left: 10px;">{{ comments.length }}</span>
      </template>
    </el-table-column>
    <el-table-column label="Просмотры" width="180">
      <template slot-scope="{ row: { views } }">
        <i class="el-icon-view" />
        <span style="margin-left: 10px;">{{ views }}</span>
      </template>
    </el-table-column>
    <el-table-column label="Действия">
      <template slot-scope="{ row: { _id } }">
        <el-tooltip effect="dark" content="Открыть пост" placement="top">
          <el-button
            circle
            icon="el-icon-edit"
            type="primary"
            @click="open(_id)"
          />
        </el-tooltip>

        <el-tooltip class="item" effect="dark" content="Удалить пост" placement="top">
          <el-button
            circle
            icon="el-icon-delete"
            type="danger"
            @click="remove(_id)"
          />
        </el-tooltip>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  name: 'AdminList',
  layout: 'admin',
  middleware: ['admin-auth'],
  head: {
    title: `Список постов | ${process.env.appName}`
  },
  async asyncData ({ store }) {
    const data = await store.dispatch('posts/fetchAdminPosts')

    return { data }
  },
  methods: {
    open (id) {
      this.$router.push(`/admin/post/${id}`)
    },
    async remove (id) {
      try {
        await this.$confirm('Вы уверены?', 'Warning', {
          confirmButtonText: 'Да',
          cancelButtonText: 'Отменить',
          type: 'warning'
        })
        await this.$store.dispatch('posts/removeAdmin', id)
        this.data = this.data.filter(p => p._id !== id)
        this.$message.success('Пост успешно удален!')
      } catch (e) {}
    }
  }
}
</script>
