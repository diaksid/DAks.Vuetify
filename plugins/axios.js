export default function ({ $axios, store }) {
  $axios.setHeader('X-Requested-With', 'XMLHttpRequest')

  /*
  $axios.onError(err => {
    store.commit('notify/set', ['error', err.message || err])
  })
  */

  $axios.onRequestError(err => {
    store.commit('notify/set', ['error', `[axios req] ${err.message}`])
  })

  $axios.onResponseError(err => {
    store.commit('notify/set', ['error', `[axios res] ${err.message}`])
  })
}
