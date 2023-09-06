import { boot } from 'quasar/wrappers'
import { createMdiInterface, activateView, ZERO_VIEW_ID } from 'src/vue-mdi-interface'

const views = {
  counter: () => import('pages/CounterView.vue'),
  image: () => import('pages/ImageView.vue'),
  entity: () => import('pages/EntityView.vue')
}

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async ({ app, router }) => {
  app.use(createMdiInterface, {
    views
  })
  router.beforeEach((to, from) => {
    activateView(ZERO_VIEW_ID)
  })
})
