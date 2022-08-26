export const actions = {
  async fetchAdminPosts ({ commit }) {
    try {
      return await this.$axios.$get('/api/post/admin/')
    } catch (e) {
      commit('setError', e, { root: true })
      throw e
    }
  },
  async fetchPosts ({ commit }) {
    try {
      console.log(this.$axios)
      return await this.$axios.$get('/api/post/')
    } catch (e) {
      commit('setError', e, { root: true })
      throw e
    }
  },
  async removeAdmin ({ commit }, id) {
    try {
      await this.$axios.$delete(`/api/post/admin/${id}`)
    } catch (e) {
      commit('setError', e, { root: true })
      throw e
    }
  },
  async fetchAdminPostById ({ commit }, id) {
    try {
      return await this.$axios.$get(`/api/post/admin/${id}`)
    } catch (e) {
      commit('setError', e, { root: true })
      throw e
    }
  },
  async fetchPostById ({ commit }, id) {
    try {
      return await this.$axios.$get(`/api/post/${id}`)
    } catch (e) {
      commit('setError', e, { root: true })
      throw e
    }
  },
  async updateAdminPost ({ commit }, { id, text }) {
    try {
      await this.$axios.$put(`/api/post/admin/${id}`, { text })
    } catch (e) {
      commit('setError', e, { root: true })
      throw e
    }
  },
  async create ({ commit }, { title, text, image }) {
    try {
      const fd = new FormData()
      fd.append('title', title)
      fd.append('text', text)
      fd.append('image', image, image.name)

      return await this.$axios.$post('/api/post/admin', fd)
    } catch (e) {
      commit('setError', e, { root: true })
      throw e
    }
  },
  async addViews ({ commit }, { _id, views }) {
    try {
      await this.$axios.$put(`/api/post/add/views/${_id}`, { views })
    } catch (e) {
      commit('setError', e, { root: true })
      throw e
    }
  },
  async analytics ({ commit }) {
    try {
      return await this.$axios.$get('/api/post/admin/get/analytics')
    } catch (e) {
      commit('setError', e, { root: true })
      throw e
    }
  }
}
