<template>
  <q-page padding>
    <h3>View 1</h3>
    <h6>view id: {{ viewId }}, parent view id: {{ parentViewId }}</h6>
    <h4>counter: {{ counter }} <q-btn @click="counter++">increase</q-btn></h4>

  </q-page>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useMdiInterface } from 'src/vue-mdi-interface'

const props = defineProps({
  start: { type: Number, default: 0 }
})
const counter = ref(props.start)

const { viewId, parentViewId } = useMdiInterface({
  title: computed(() => `view 1: ${counter.value}`)
})

</script>
