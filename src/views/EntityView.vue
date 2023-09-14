<template>
  <q-page padding>
    <div class="text-h3">Entity: {{ title }}</div>
    <view-info></view-info>
    {{ uniqueKey }}
    <div class="q-my-md">
      <q-input v-model="entity.field" label="field"></q-input>
    </div>
    <div class="row q-gutter-md">
      <q-btn @click="save" label="Save"></q-btn>
      <q-btn @click="saveAndClose" label="Save and close"></q-btn>
    </div>
  </q-page>
</template>

<script setup>
import { useMultiView, closeView, onBeforeClose, onDeactivate } from 'src/../vue-multi-view'
import ViewInfo from 'src/components/ViewInfo.vue'
import { useEntitiesStore } from 'stores/entities'
import { computed, nextTick, ref, watch } from 'vue'
import { confirmDialog } from 'src/services/support'
import { useQuasar } from 'quasar'

const props = defineProps({
  id: Number
})

const entityStore = useEntitiesStore()
const entity = ref(entityStore.getBlankEntity())

const modified = ref(false)
const oldField = ref('')

if (props.id) {
  entity.value = entityStore.loadEntity(props.id)
  oldField.value = entity.value.field
}

watch(entity, () => { modified.value = true }, { deep: true })

const title = computed(() => {
  const parts = []
  parts.push(entity.value.id ? oldField.value : '<new>')
  if (modified.value) parts.push('*')
  return parts.join(' ')
})

const uniqueKey = computed(() => props.id ?? entity.value.id)
const { viewId } = useMultiView({
  title,
  uniqueKey,
  meta: {
    icon: 'description'
  }
})

function save () {
  entity.value = entityStore.saveEntity(entity.value)
  oldField.value = entity.value.field
  nextTick().then(() => { modified.value = false })
}

function saveAndClose () {
  entity.value = entityStore.saveEntity(entity.value)
  modified.value = false
  closeView(viewId)
}

onBeforeClose(async () => {
  return !modified.value || await confirmDialog({ message: 'Entity is modified, continue?', cancel: true })
})

const $q = useQuasar()
onDeactivate(() =>
  !modified.value || $q.notify('Dont forget to save entity')
)

</script>
