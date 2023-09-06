<template>
  <q-page padding>
    <h3 style>Page 2</h3>
    <q-btn @click="open1Fixed">Open counter with fixed ID</q-btn>
    <q-btn @click="open1">Open counter</q-btn>
    <q-btn @click="open2">Open image with unique key</q-btn>
  </q-page>
</template>

<script setup>
import { openView, getUniqueKey } from 'src/vue-mdi-interface'

function open1 () {
  openView('counter', undefined)
}
function open1Fixed () {
  openView('counter', undefined, 'aaa')
}
function open2 () {
  openView('image', undefined, getUniqueKey())
}
</script>
