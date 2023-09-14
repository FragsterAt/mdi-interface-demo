<template>
  <q-page padding>
    <div class="text-h3">Counter</div>
    <view-info></view-info>

    <h5>counter: {{ counter }} <q-btn @click="counter++">increase</q-btn></h5>

  </q-page>
</template>

<script setup>
import { ref, watchEffect, computed } from 'vue'
import { useMultiView } from 'src/../vue-multi-view'
import ViewInfo from 'src/components/ViewInfo.vue'

const props = defineProps({
  start: { type: Number, default: 0 }
})
const counter = ref(0)
watchEffect(() => {
  counter.value = props.start
})

useMultiView({
  title: computed(() => `Counter = ${counter.value}`)
})

</script>
