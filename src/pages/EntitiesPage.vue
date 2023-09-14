<template>
  <q-page padding>
    <div class="text-h3">Entities</div>

    <div class="q-my-md">
      <q-btn @click="openNewEntity" label="Create entity"></q-btn>
    </div>

    <q-table :rows="data" @row-click="openEntity">

    </q-table>
  </q-page>
</template>

<script setup>
import { openView } from 'src/../vue-multi-view'
import { useEntitiesStore } from 'stores/entities'
import { storeToRefs } from 'pinia'

const entitiesStore = useEntitiesStore()
const { data } = storeToRefs(entitiesStore)

function openNewEntity () {
  openView('entity')
}

function openEntity (e, row) {
  openView('entity', { id: row.id }, row.id)
}
</script>
