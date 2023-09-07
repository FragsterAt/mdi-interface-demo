import { boot } from 'quasar/wrappers'
import { createMdiInterface, activateView } from 'vue-multiview'

const views = {
  counter: {
    meta: { icon: 'calculate' },
    component: () => import('pages/CounterView.vue')
  },
  image: {
    title: 'Image view',
    component: () => import('pages/ImageView.vue')
  },
  entity: () => import('pages/EntityView.vue')
}

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async ({ app, router }) => {
  app.use(createMdiInterface, {
    views
  })
  router.beforeEach((to, from) => {
    activateView(undefined, true)
  })
})
