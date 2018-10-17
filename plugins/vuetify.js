import Vue from 'vue'
import {
  Vuetify,
  VApp,
  VBtn,
  VCard,
  VCheckbox,
  VDialog,
  VDivider,
  VFooter,
  VForm,
  VGrid,
  VHover,
  VIcon,
  VImg,
  VInput,
  VList,
  VNavigationDrawer,
  VProgressCircular,
  VResponsive,
  VSnackbar,
  VSpeedDial,
  VTextField,
  VTextarea,
  VTooltip
} from 'vuetify'
import {
  VFabTransition
} from 'vuetify/es5/components/transitions'
import {
  Ripple,
  Scroll
} from 'vuetify/es5/directives'
// import colors from 'vuetify/es5/util/colors'

const themeCache = require('lru-cache')({
  max: 10,
  maxAge: 1000 * 60 * 60 // 1 hour
})

Vue.use(Vuetify, {
  components: {
    VApp,
    VBtn,
    VCard,
    VCheckbox,
    VDialog,
    VDivider,
    VFabTransition,
    VFooter,
    VForm,
    VGrid,
    VHover,
    VIcon,
    VImg,
    VInput,
    VList,
    VNavigationDrawer,
    VProgressCircular,
    VResponsive,
    VSnackbar,
    VSpeedDial,
    VTextField,
    VTextarea,
    VTooltip
  },
  directives: {
    Ripple,
    Scroll
  },
  /*
  theme: {
    primary: '#121212', // a color that is not in the material colors palette
    accent: colors.grey.darken3,
    secondary: colors.amber.darken3,
    info: colors.teal.lighten1,
    warning: colors.amber.base,
    error: colors.deepOrange.accent4,
    success: colors.green.accent3
  },
  */
  options: {
    themeCache,
    minifyTheme: css => process.env.NODE_ENV === 'production' ? css.replace(/[\s|\r\n|\r|\n]/g, '') : css
  }
})
