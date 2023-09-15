<template>
  <q-page padding>
    <div class="text-h3">Open views with buttons </div>
    <div class="text-h6 q-my-md">Counter (simple view):</div>
    <div class="row q-gutter-x-md q-my-md">
      <q-btn @click="openCounter1">Open counter with start 1</q-btn>
      <q-btn @click="openCounter2">Open counter with start 2</q-btn>
      <q-btn @click="openCounterFixed">Open counter with fixed unique key</q-btn>
      <q-btn @click="openCounterUnique">Open counter with new unique key</q-btn>
    </div>
    <div class="text-h6 q-my-md">Image (it can open child view):</div>
    <div class="row q-gutter-x-md q-my-md">
      <q-btn @click="openImage">Open image</q-btn>
      <q-btn @click="openImageFixed">Open image with fixed unique key</q-btn>
      <q-btn @click="openImageUnique">Open image with new unique key</q-btn>
    </div>
  </q-page>
</template>

<script setup>
import { openView, getUniqueKey } from 'src/../vue-multi-view'

function openCounter1 () {
  openView('counter', { start: 1 })
}
function openCounter2 () {
  openView('counter', { start: 2 })
}
function openCounterFixed () {
  openView('counter', undefined, 'fixed key')
}
function openCounterUnique () {
  openView('counter', undefined, getUniqueKey())
}
function openImage () {
  openView('image')
}
function openImageFixed () {
  openView('image', undefined, 'fixed key')
}
function openImageUnique () {
  openView('image', undefined, getUniqueKey())
}
</script>
