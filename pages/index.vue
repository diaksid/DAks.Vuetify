<template lang="pug">
  v-container(grid-list-xl)
    header
      daks-logo(height="72")
      h1 {{header}}
    v-layout(
    row
    wrap
    )
      v-flex(
      xs12
      md6
      column
      )
        v-card
          v-img.preload(
          :src="images[0].src"
          :lazy-src="images[0].lazy"
          :aspect-ratio="`${$vuetify.breakpoint.xsOnly ? 2 : 16 / 5}`"
          )
          link(
          itemprop="image"
          :href="images[0].src"
          )
          link(
          itemprop="thumbnail"
          :href="images[0].lazy"
          )
          v-card-title(primary-title)
            h2.display-2.mb-3 Техническая поддержка
            p Поддержка работоспособности и эффективности програмного окружения сайтов.
      v-flex(
      xs12
      md6
      column
      )
        v-card
          v-img.preload(
          :src="images[1].src"
          :lazy-src="images[1].lazy"
          :aspect-ratio="`${$vuetify.breakpoint.xsOnly ? 2 : 16 / 5}`"
          )
          link(
          itemprop="image"
          :href="images[1].src"
          )
          link(
          itemprop="thumbnail"
          :href="images[1].lazy"
          )
          v-card-title(primary-title)
            h2.display-2.mb-3 Разработка и модернизация
            p Разработка уникальных програмных компонентов, установка сторонних шаблонов и модулей.
</template>


<script>
  import DaksLogo from '~/components/DaksLogo'

  export default {
    components: {
      DaksLogo
    },

    head () {
      return {
        title: this.title
      }
    },

    meta: {
      keywords: 'поддержка сайта',
      description: 'Поддержка работоспособности сайтов, устранение неполадок.'
    },

    data () {
      return {
        title: 'Поддержка сайта',
        header: 'Поддержка работоспособности сайтов, устранение неполадок.',
        images: [
          {
            lazy: require('assets/images/bg/thumbs/00.jpg'),
            src: require('assets/images/bg/00.jpg')
          },
          {
            lazy: require('assets/images/bg/thumbs/01.jpg'),
            src: require('assets/images/bg/01.jpg')
          }
        ]
      }
    }
  }
</script>

<style lang="stylus" scoped>
  h1
    display: inline
    margin: 0
    font: 0 / 0 a
    color: transparent

  .v-card
    height: 100%
</style>
