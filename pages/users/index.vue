<template lang="pug">
  v-container
    v-layout(row)
      header
        h1.display-4.mb-3 {{title}}
        ul(v-model="ajax")
          li(
          v-for="(item, i) in ajax"
          :key="i"
          ) {{item.name}}
</template>


<script>
  import VueToNuxtLogo from '~/components/VueToNuxtLogo'

  export default {
    components: {
      VueToNuxtLogo
    },

    head () {
      return {
        title: this.title
      }
    },

    async asyncData ({$axios}) {
      return {
        ajax: await $axios.$get('/users')
      }
    },

    data () {
      return {
        title: 'Пользователи'
      }
    }
  }
</script>
