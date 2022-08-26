<template>
  <el-card class="comment">
    <header class="header comment-header">
      <h3 class="comment-person-title">
        {{ comment.name }}
      </h3>

      <div class="comment-date">
        <i class="el-icon-time" />
        {{ new Date().toLocaleString() }}
      </div>
    </header>

    <div class="comment-body">
      {{ comment.text }}
    </div>
  </el-card>
</template>

<script>
export default {
  name: 'AppComment',
  props: {
    comment: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
  .comment {
    &-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 12px;
      margin-bottom: 20px;
    }

    &-title {
      margin: 0;
      font-weight: 500;
    }

    &-body {
      font-size: 14px;
      line-height: 1.5;
    }

    &:not(:last-child) {
      margin-bottom: 25px;
    }
  }
</style>
