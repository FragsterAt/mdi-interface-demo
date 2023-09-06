<template>
  <q-page padding>
    <h3>View 2</h3>
    <h6>view id: {{ viewId }}, parent view id: {{ parentViewId }}, unique key: {{ uniqueKey }} </h6>
    <q-input v-model="entity.field" label="field"></q-input>
    <q-btn @click="save" label="Save"></q-btn>

    <pre>{{ entity }}</pre>
  </q-page>
</template>

<script setup>
import { useMdiInterface } from 'src/vue-mdi-interface'
import { useEntitiesStore } from 'stores/entities'
import { computed, nextTick, ref, watch } from 'vue'

const props = defineProps({
  id: Number
})

const entityStore = useEntitiesStore()
const entity = ref(entityStore.getBlankEntity())
if (props.id) {
  entity.value = entityStore.loadEntity(props.id)
}

const modified = ref(false)
const oldField = ref('')
watch(entity, () => { modified.value = true }, { deep: true })

const title = computed(() => {
  const parts = []
  parts.push(entity.value.id ? oldField.value.title : '<new>')
  if (modified.value) parts.push('*')
  return parts.join(' ')
})

const uniqueKey = computed(() => props.id ?? entity.value.id)
const { viewId, parentViewId } = useMdiInterface({
  title
})

function save () {
  entity.value = entityStore.saveEntity(entity.value)
  oldField.value = entity.value.field
  nextTick().then(() => { modified.value = false })
}

</script>
