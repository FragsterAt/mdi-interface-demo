import { defineStore } from 'pinia'

function getBlankEntity () {
  return {
    id: undefined,
    field: ''
  }
}
let nextId = 0
export const useEntitiesStore = defineStore('entities', {
  state: () => ({
    data: []
  }),

  actions: {
    getBlankEntity,
    create () {
      return getBlankEntity()
    },
    loadEntity (entityId) {
      const entity = this.data.find(({ id }) => id === entityId)
      if (!entity) throw new Error('not found')
      return entity
    },
    saveEntity (entity) {
      const data = {}
      Object.assign(data, entity)
      let i = -1
      if (!data.id) {
        data.id = ++nextId
      } else {
        i = this.data.findIndex(({ id }) => id === entity.id)
      }
      if (i !== -1) {
        this.data[i] = data
      } else {
        this.data.push(data)
      }
      return data
    }

  }
})
