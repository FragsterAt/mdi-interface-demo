import { boot } from 'quasar/wrappers'
import { createMdiInterface, activateView, ZERO_VIEW_ID } from 'vue-mdi-interface'

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async ({ app, router }) => {
  app.use(createMdiInterface)
  router.beforeEach((to, from) => {
    activateView(ZERO_VIEW_ID)
  })
})
