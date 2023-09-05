<template>
  <q-page padding>
    <h1>Page 2</h1>
    <q-btn @click="open1Fixed">Open counter with fixed ID</q-btn>
    <q-btn @click="open1">Open counter</q-btn>
    <q-btn @click="open2">Open image with unique key</q-btn>
  </q-page>
</template>

<script setup>
import { openView, getUniqueKey } from 'src/vue-mdi-interface'

function open1 () {
  openView(() => import('./CounterView.vue'), undefined)
}
function open1Fixed () {
  openView(() => import('./CounterView.vue'), undefined, 'aaa')
}
function open2 () {
  openView(() => import('./ImageView.vue'), getUniqueKey())
}
</script>
