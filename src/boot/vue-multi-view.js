import { boot } from 'quasar/wrappers'
import { createMultiView, activateView } from 'src/../vue-multi-view'

const views = {
  counter: {
    meta: { icon: 'calculate' },
    component: () => import('../views/CounterView.vue')
  },
  image: {
    title: 'Image view',
    component: () => import('../views/ImageView.vue')
  },
  entity: () => import('../views/EntityView.vue')
}

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async ({ app, router }) => {
  app.use(createMultiView, {
    views
  })
  router.beforeEach((to, from) => {
    activateView(undefined, true)
  })
})
