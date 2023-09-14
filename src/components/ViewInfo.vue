<template>
  <div class="row q-my-md">
    <div class="bg-grey-2 q-pa-sm rounded-borders">View name: {{ name }}</div>
    <div class="bg-grey-2 q-pa-sm q-ml-md rounded-borders">
      view id: {{ viewId }}</div>
    <div><q-btn @click=" closeView(viewId)" round flat icon="close" title="close self" dense /></div>
    <template v-if="parentViewId">
      <div class="bg-grey-2 q-pa-sm q-ml-md rounded-borders">parent view id: {{ parentViewId }}</div>
      <div>
        <q-btn @click=" closeView(parentViewId)" round flat icon="close" title="close parent" dense />
      </div>
    </template>
    <div v-if="uniqueKey" class="bg-grey-2 q-pa-sm q-ml-md rounded-borders">uniqueKey: {{ uniqueKey }}</div>
  </div>
</template>

<script setup>
import { useQuasar } from 'quasar'
import { onActivate, onDeactivate, useMultiView, closeView } from 'src/../vue-multi-view'
import { onMounted, onUnmounted, toRefs } from 'vue'
const $q = useQuasar()

const { name, viewId, parentViewId, uniqueKey } = toRefs(useMultiView())

onActivate(() => {
  $q.notify(`View '${name.value}' with id ${viewId.value} activated`)
})
onDeactivate(() => {
  $q.notify(`View '${name.value}' with id  ${viewId.value} deactivated`)
})
onMounted(() => {
  $q.notify(`View '${name.value}' with id  ${viewId.value} mounted`)
})
onUnmounted(() => {
  $q.notify(`View '${name.value}' with id  ${viewId.value} unmounted`)
})
</script>
