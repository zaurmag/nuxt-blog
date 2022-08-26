export default function ({ store, redirect }) {
  const isAuth = store.getters['auth/isAuthenticated']

  if (!isAuth) {
    redirect('/admin/login?message=login')
  }
}
