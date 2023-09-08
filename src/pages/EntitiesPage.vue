<template>
  <q-page padding>
    <h3 style>Page 2</h3>

    <q-btn @click="openNewEntity" label="Create entity"></q-btn>

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
