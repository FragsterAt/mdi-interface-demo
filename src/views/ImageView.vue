<template>
  <q-page padding>
    <div class="text-h3">Image</div>
    <view-info></view-info>
    <div class="q-gutter-x-md q-my-md">
      <q-btn @click="openChildCounter">Open child counter</q-btn>
      <q-btn @click="openChildImage">Open child image</q-btn>
      <q-btn @click="openSiblingCounter" v-if="parentViewId">Open sibling counter</q-btn>
      <q-btn @click="openSiblingImage" v-if="parentViewId">Open sibling image</q-btn>
    </div>
    <div class="q-my-lg"><img alt="Quasar logo" src="~assets/quasar-logo-vertical.svg"
        style="width: 200px; height: 200px"></div>
  </q-page>
</template>

<script setup>
import { openView, useMultiView, getUniqueKey } from 'src/../vue-multi-view'
import ViewInfo from 'src/components/ViewInfo.vue'

const { viewId, parentViewId } = useMultiView()
function openChildCounter () {
  openView('counter', undefined, undefined, { parentViewId: viewId })
}
function openSiblingCounter () {
  openView('counter', undefined, undefined, { parentViewId })
}
function openChildImage () {
  openView('image', undefined, undefined, { parentViewId: viewId })
}
function openSiblingImage () {
  openView('image', undefined, getUniqueKey(), { parentViewId })
}
</script>
