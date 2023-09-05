<template>
  <q-tabs v-model="currentView" align="left" inline-label>
    <q-tab :name="ZERO_VIEW_ID" icon="home" label="Router" @click="activateView()" />
    <q-tab :name="view.id" icon="home" :label="view.title" v-for="view in viewList" :key="view.id"
      @click="activateView(view.id)" />
  </q-tabs>
</template>

<script setup>
import { viewList, currentView, activateView, ZERO_VIEW_ID } from 'vue-mdi-interface'
</script>
