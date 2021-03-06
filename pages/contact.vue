<template lang="pug">
  v-container
    v-layout(
    row
    wrap
    )
      v-flex(
      xs12
      md6
      )
        h1.display-4.mb-3 {{title}}
        v-form(
        ref="form"
        v-model="valid"
        :lazy-validation="true"
        )
          v-text-field(
          label="E-mail"
          append-icon="mail_outline"
          v-model="email"
          :rules="emailRules"
          required
          )
          v-text-field.mb-4(
          label="Тема"
          append-icon="bookmark_border"
          v-model="subject"
          :rules="subjectRules"
          :counter="64"
          )
          v-textarea(
          auto-grow
          outline
          label="Сообщение"
          v-model="message"
          :rules="messageRules"
          :counter="256"
          required
          )
          v-checkbox.mb-2(
          ref="checkbox"
          v-model="checkbox"
          :rules="[v => !!v || 'Необходимо согласие для продолжения!']"
          label="Согласие на предоставление персональной информации"
          required
          )
          v-layout(
          row
          wrap
          )
            v-btn.mb-4(
            @click="submit"
            :loading="waiting"
            :disabled="!valid"
            ) Отправить
            v-btn.mb-4.mr-auto(@click="clear") Очистить
            v-input.g-recaptcha-wrapper(
            ref="recaptcha"
            v-model="recaptcha"
            :rules="[v => !!v || 'Необходимо подтвеждение для продолжения!']"
            )
              .g-recaptcha(
              data-callback="reCallback"
              data-expired-callback="reExpired"
              :data-theme="$store.state.themeDark ? 'dark' : 'light'"
              :data-size="$vuetify.breakpoint.smAndDown ? 'compact' : 'normal'"
              :data-sitekey="reSitekey"
              )

      v-flex(
      xs12
      md6
      )
        v-hover
          v-card(
          slot-scope="{hover}"
          :class="`ymap-wrapper elevation-${hover ? 9 : 3}`"
          )
            v-layout(
            align-center
            justify-center
            )
              v-progress-circular(
              indeterminate
              color="#ff6700"
              :size="100"
              :width="5"
              )
            yandex-map(
            v-if="showMap"
            map-type="map"
            :zoom="$vuetify.breakpoint.smAndDown ? 14 : 16"
            :coords="[55.741236, 37.416706]"
            )
              ymap-marker(
              marker-id="0"
              marker-type="placemark"
              cluster-name="1"
              :coords="[55.741236, 37.416706]"
              :hint-content="tooltip"
              :balloon="balloon"
              :icon="icon"
              )

    //script(
      src="https://www.google.com/recaptcha/api.js?hl=ru",
      async=true
      )
</template>


<script>
  import { yandexMap, ymapMarker } from 'vue-yandex-maps'

  const emailMask = /[a-z0-9][a-z0-9\-_.]+@([a-z]|[a-z0-9]?[a-z0-9\-]+[a-z0-9])\.[a-z0-9]{2,10}(?:\.[a-z]{2,10})?/i

  export default {
    components: {
      yandexMap,
      ymapMarker
    },

    head () {
      return {
        title: this.title,
        script: [
          { src: 'https://www.google.com/recaptcha/api.js?hl=ru', defer: true, body: true }
        ]
      }
    },

    mounted () {
      window.reCallback = this.reCallback
      window.reExpired = this.reExpired
      this.showMap = true
    },

    computed: {
      loading () {
        return this.waiting
      }
    },

    methods: {
      reCallback (token) {
        this.recaptcha = token
      },
      reExpired () {
        grecaptcha.reset()
        this.recaptcha = false
      },
      clear () {
        this.$refs.form.reset()
      },
      async submit () {
        if (this.waiting = this.$refs.form.validate()) {
          await this.$axios.put('/contact', {
            recaptcha: this.recaptcha,
            email: this.email.toLowerCase(),
            subject: this.subject,
            message: this.message
          })
            .then(msg => {
              if (msg.status === 200) {
                this.$store.commit('notify/set', ['success', msg.data.message])
              } else {
                this.$store.commit('notify/set', ['info', msg.data.message])
              }
              this.reExpired()
              this.waiting = false
            })
            .catch(() => this.waiting = false)
        }
      }
    },

    data () {
      return {
        valid: false,
        waiting: false,
        email: this.$auth.loggedIn ? this.$auth.user.email : '',
        emailRules: [
          v => !!v || 'E-mail требуется для продолжения!',
          v => emailMask.test(v) || 'E-mail должен быть корректным!'
        ],
        subject: '',
        subjectRules: [
          v => (v ? v.length >= 3 : true) || 'Тема должна быть длиннее 3 символов!',
          v => (v ? v.length <= 64 : true) || 'Тема не должна быть длиннее 64 символов!'
        ],
        message: '',
        messageRules: [
          v => !!v || 'Сообщение требуется для продолжения!',
          v => (v && v.length >= 3) || 'Сообщение должно быть длиннее 3 символов!',
          v => (v && v.length <= 256) || 'Сообщение не должно быть длиннее 256 символов!'
        ],
        checkbox: false,
        recaptcha: false,
        reSitekey: process.env.RECAPTCHA.key,
        tooltip: 'Аксёнов Д. В.',
        balloon: {
          header: 'Аксёнов Д. В.',
          body: null,
          footer: 'индивидуальный предпрениматель'
        },
        icon: {
          color: 'green',
          glyph: 'star'
        },
        showMap: false,
        title: 'Контакты'
      }
    }
  }
</script>


<style lang="stylus" scoped>
  @require '~vuetify/src/stylus/settings/_variables.styl'

  .v-form
    width: 90%
    margin: 0 auto 1rem

  .mr-auto
    margin-right: auto

  .g-recaptcha-wrapper
    flex-grow: 0
    margin: 5px 0 0 7px

  .ymap-wrapper
    overflow: hidden
    margin: $button-height + 2 * $grid-gutters.lg 0 1rem
    height: 50vmin
    > .layout
      position: absolute
      top: 0
      left: 0
      width: 100%
      height: 100%

  .ymap-container
    height: 100%

  @media $display-breakpoints.sm-and-down
    .ymap-wrapper
      margin-top: 0
      min-height: 35vmax
</style>
