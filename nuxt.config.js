/* eslint no-template-curly-in-string: "off" */

require('./config')
const config = require('config')

const isWin = /^win/i.test(process.platform)

const nuxt = {
  mode: 'spa', // 'universal',

  env: {
    RECAPTCHA: config.get('recaptcha')
  },

  head: {
    titleTemplate: '%s · DAks Pro',
    link: [
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons'
      }
    ]
  },

  loading: {
    color: '#3b8070'
  },

  css: [
    '~/assets/stylesheets/app.styl'
  ],

  plugins: [
    '@/plugins/polyfills',
    '@/plugins/axios',
    '@/plugins/vue-lazyload',
    '@/plugins/vuetify'
  ],

  modules: [
    '@nuxtjs/auth',
    '@nuxtjs/axios',
    '@nuxtjs/pwa'
  ],

  axios: {
    https: !isWin,
    host: isWin ? 'localhost' : config.get('domain'),
    port: isWin ? 3000 : 443,
    prefix: '/api/v1',
    credentials: true,
    debug: false
  },

  auth: {
    strategies: {
      local: {
        endpoints: {
          login: {
            url: '/auth/login',
            method: 'post',
            propertyName: 'token'
          },
          logout: {
            url: '/auth/logout',
            method: 'post'
          },
          user: {
            url: '/auth/user',
            method: 'get',
            propertyName: 'user'
          }
        },
        tokenRequired: true,
        tokenType: 'bearer'
      }
    }
  },

  icon: {
    iconSrc: 'static/images/icon.png'
  },

  meta: {
    lang: 'ru',
    name: 'DAks Pro',
    description: 'DAks Pro development',
    ogHost: !isWin && config.get('domain')
  },

  manifest: {
    lang: 'ru',
    name: 'DAks Pro',
    short_name: 'DAkS',
    description: 'DAkS Pro development'
  },

  build: {
    transpile: [/^vuetify/],
    babel: {
      plugins: [
        ['transform-imports', {
          'vuetify': {
            'transform': 'vuetify/es5/components/${member}',
            'preventFullImport': true
          }
        }]
      ]
    },
    extractCSS: true,
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },

  serverMiddleware: [
    '~/api/'
  ]
}

if (config.has('yandex.metrika')) {
  nuxt.modules.push(['@nuxtjs/yandex-metrika', {
    id: config.get('yandex.metrika'),
    webvisor: true,
    clickmap: true,
    trackLinks: true,
    accurateTrackBounce: true,
    useCDN: false
  }])
}

if (config.has('oneSignal')) {
  nuxt.modules.push('@nuxtjs/onesignal')
  nuxt.oneSignal = {
    init: {
      appId: config.get('oneSignal'),
      allowLocalhostAsSecureOrigin: true,
      welcomeNotification: {
        disable: false
      }
    },
    cdn: true
  }
}

module.exports = nuxt
