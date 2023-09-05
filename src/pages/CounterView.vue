<template>
  <q-page padding>
    <h1>View 1</h1>
    <h3>counter: {{ counter }}</h3>
    <q-btn @click="counter++">increase</q-btn>
  </q-page>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useMdiInterface } from 'src/vue-mdi-interface'

const props = defineProps({
  start: { type: Number, default: 0 }
})
const counter = ref(props.start)

useMdiInterface({
  title: computed(() => `view 1: ${counter.value}`)
})

</script>
