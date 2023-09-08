<template>
  <q-page padding>
    <h3>Page 1</h3>
    <q-btn @click="open1">Open counter with start 1</q-btn>
    <q-btn @click="open1Unique">Open counter with unique key and start 2</q-btn>
    <q-btn @click="open2">Open image</q-btn>
  </q-page>
</template>

<script setup>
import { openView, getUniqueKey } from 'src/../vue-multi-view'

function open1 () {
  openView('counter', { start: 1 })
}
function open1Unique () {
  openView('counter', { start: 2 }, getUniqueKey())
}
function open2 () {
  openView('image')
}
</script>
