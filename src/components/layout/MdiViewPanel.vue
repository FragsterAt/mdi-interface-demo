<template>
  <q-tabs v-model="currentView" align="left" inline-label>
    <q-tab :name="ZERO_VIEW_ID" icon="home" label="Router" />
    <q-tab :name="view.viewId" :icon="view.meta.icon" v-for="view in viewList" :key="view.viewId">{{
          view.title }} <q-btn round flat @click.stop="closeView(view.viewId)" icon="delete" dense></q-btn></q-tab>
  </q-tabs>
</template>

<script setup>
import { viewList, currentView, closeView, ZERO_VIEW_ID } from 'vue-multiview'

</script>
