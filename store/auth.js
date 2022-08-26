import Cookie from 'cookie'
import jsCookies from 'js-cookie'
import jwtDecode from 'jwt-decode'

export const state = () => ({
  token: null
})

export const mutations = {
  setToken (state, token) {
    state.token = token
  },
  clearToken (state) {
    state.token = null
  }
}

export const actions = {
  async login ({ commit, dispatch }, data) {
    try {
      const { token } = await this.$axios.$post('/api/auth/admin/login', data)
      dispatch('setToken', token)
    } catch (e) {
      commit('setError', e, { root: true })
      throw e
    }
  },
  setToken ({ commit }, token) {
    this.$axios.setToken(token, 'Bearer')
    commit('setToken', token)
    jsCookies.set('jwt-token', token)
  },
  logout ({ commit }) {
    this.$axios.setToken(false)
    commit('clearToken')
    jsCookies.remove('jwt-token')
  },
  async createUser ({ commit }, data) {
    try {
      await this.$axios.$post('/api/auth/admin/create', data)
    } catch (e) {
      console.error(e)
      throw e
    }
  },
  autoLogin ({ dispatch }) {
    const cookieStr = process.browser
      ? document.cookies
      : this.app.context.req.headers.cookie

    const cookies = Cookie.parse(cookieStr || '') || {}
    const token = cookies['jwt-token']

    if (isJwtValid(token)) {
      dispatch('setToken', token)
    } else {
      dispatch('logout')
    }
  }
}

export const getters = {
  isAuthenticated: state => !!state.token,
  token: state => state.token
}

function isJwtValid (token) {
  if (!token) {
    return false
  }

  const jwtData = jwtDecode(token) || {}
  const expires = jwtData.exp || 0

  return (new Date().getTime() / 1000) < expires
}
