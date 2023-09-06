<template>
  <q-page padding>
    <h3>View 2</h3>
    <h6>view id: {{ viewId }}, parent view id: {{ parentViewId }}</h6>
    <q-btn @click="openCounter">Open child counter</q-btn>
    <div class="q-my-md"><img alt="Quasar logo" src="~assets/quasar-logo-vertical.svg"
        style="width: 200px; height: 200px"></div>
  </q-page>
</template>

<script setup>
import { openView, useMdiInterface } from 'src/vue-mdi-interface'

const { viewId, parentViewId } = useMdiInterface()
function openCounter () {
  openView('counter', undefined, undefined, { parentViewId: viewId })
}
</script>
