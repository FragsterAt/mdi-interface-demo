<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>
          Quasar App
        </q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
      <mdi-view-panel></mdi-view-panel>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header>
          Essential Links
        </q-item-label>

        <EssentialLink v-for="link in essentialLinks" :key="link.title" v-bind="link" />
        <q-item>{{ view }}</q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <mdi-view :show-style="{ display: 'block' }">
        <router-view />
      </mdi-view>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue'
import MdiViewPanel from 'components/layout/MdiViewPanel.vue'
import EssentialLink from 'components/EssentialLink.vue'
import { useMdiInterface } from 'src/vue-mdi-interface'

const view = useMdiInterface()

const essentialLinks = [
  {
    title: 'Index',
    caption: 'index page',
    icon: 'school',
    to: { name: 'index' }
  },
  {
    title: 'Second',
    caption: 'second page',
    icon: 'chat',
    to: { name: 'second' }
  },
  {
    title: 'Entities',
    caption: 'entities list',
    icon: 'view_timeline',
    to: { name: 'entities' }
  }
]

const leftDrawerOpen = ref(false)

function toggleLeftDrawer () {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
</script>
