<template lang="pug">
  .ProAuth
    pro-auth-user

    v-btn(
    v-if="!$auth.loggedIn"
    fab
    @click.stop="$store.commit('modal/toggleLogin')"
    ): v-icon person

    pro-auth-login
</template>


<script>
  import ProAuthLogin from './ProAuthLogin'
  import ProAuthUser from './ProAuthUser'

  export default {
    components: {
      ProAuthLogin,
      ProAuthUser
    }
  }
</script>


<style lang="stylus" scoped>
  @require '~vuetify/src/stylus/settings/_variables.styl'

  .ProAuth
    position: fixed
    top: $grid-gutters.lg
    right: $grid-gutters.lg
    opacity: .8
    &:hover
      opacity: 1
</style>
