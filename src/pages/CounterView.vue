<template>
  <q-page padding>
    <h3>View 1</h3>
    <h6>view id: {{ viewId }}, parent view id: {{ parentViewId }}</h6>
    <h4>counter: {{ counter }} <q-btn @click="counter++">increase</q-btn></h4>

  </q-page>
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { onActivate, onDeactivate, useMultiView } from 'src/../vue-multi-view'
import { useQuasar } from 'quasar'

const props = defineProps({
  start: { type: Number, default: 0 }
})
const counter = ref(props.start)

const { viewId, parentViewId } = useMultiView({
  title: computed(() => `view 1: ${counter.value}`)
})

const $q = useQuasar()
onActivate(() => {
  $q.notify('counter activated')
})
onDeactivate(() => {
  $q.notify('counter deactivated')
})
onMounted(() => {
  $q.notify('counter mounted')
})
onUnmounted(() => {
  $q.notify('counter unmounted')
})

</script>
