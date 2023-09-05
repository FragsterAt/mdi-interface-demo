<template>
  <q-page padding>
    <h1>Page 1</h1>
    <q-btn @click="open1">Open counter with start 1</q-btn>
    <q-btn @click="open1Unique">Open counter with unique key and start 2</q-btn>
    <q-btn @click="open2">Open image</q-btn>
  </q-page>
</template>

<script setup>
import { openView, getUniqueKey } from 'vue-mdi-interface'

function open1 () {
  openView(() => import('./CounterView.vue'), { start: 1 })
}
function open1Unique () {
  openView(() => import('./CounterView.vue'), { start: 2 }, getUniqueKey())
}
function open2 () {
  openView(() => import('./ImageView.vue'))
}
</script>
