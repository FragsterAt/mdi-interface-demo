<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>
          Vue-multi-view demo
        </q-toolbar-title>

      </q-toolbar>
      <mdi-view-panel></mdi-view-panel>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item>
          <q-item-section>
            <q-item-label>
              Links for vue-router
            </q-item-label>
            <q-item-label caption>
              changes default view
            </q-item-label>
          </q-item-section>
        </q-item>

        <EssentialLink v-for="link in essentialLinks" :key="link.title" v-bind="link" />
        <q-item>currentView: {{ currentView }}</q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <multi-view :show-style="{ display: 'block' }">
        <router-view />
      </multi-view>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue'
import MdiViewPanel from 'components/layout/MdiViewPanel.vue'
import EssentialLink from 'components/EssentialLink.vue'
import { currentView } from 'src/../vue-multi-view'

const essentialLinks = [
  {
    title: 'Views',
    caption: 'open views with buttons',
    icon: 'school',
    to: { name: 'index' }
  },
  {
    title: 'Entities',
    caption: 'shows work with "backend" with changing view unique key',
    icon: 'view_timeline',
    to: { name: 'entities' }
  }
]

const leftDrawerOpen = ref(false)

function toggleLeftDrawer () {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
</script>
