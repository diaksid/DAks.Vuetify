<template lang="pug">
  v-container
    v-layout(
    row
    wrap
    )
      v-flex.mb-5(
      xs12
      tag="header"
      )
        h1.display-4 {{title}}
</template>


<script>
  import VueToNuxtLogo from '~/components/VueToNuxtLogo'

  export default {
    components: {
      VueToNuxtLogo
    },

    head () {
      return {
        title: this.title,
      }
    },

    meta: {
      keywords: 'поддержка сайта',
      description: 'Разработка сайтов, усовершенствования и модернизация'
    },

    data () {
      return {
        title: 'Разработка сайтов'
      }
    }
  }
</script>
