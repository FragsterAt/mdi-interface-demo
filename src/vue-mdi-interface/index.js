import { ref, defineComponent, h, cloneVNode, watch, nextTick, unref, toRef } from 'vue'

export let ZERO_VIEW_ID = 0

export const viewList = ref([])
export const currentView = ref(ZERO_VIEW_ID)
let nextId = 0
let hookIndex
let nextUniqueKey = 0
const possibleViews = {}

export function getUniqueKey () {
  return ++nextUniqueKey
}

function viewById (id) {
  return viewList.value.find(({ viewId }) => viewId === id)
}

watch(currentView, (newId, oldId) => {
  const { onDeactivate } = viewById(oldId) ?? {}
  onDeactivate?.()
  const { onActivate } = viewById(newId) ?? {}
  onActivate?.()
})

let viewStack = []

export function onActivate (fn, viewId) {
  if (hookIndex !== undefined) {
    viewList.value[hookIndex].onActivate = fn
  } else if (viewId) {
    const view = viewById(viewId)
    if (!view) return
    view.onActivate = fn
  }
}
export function onDeactivate (fn, viewId) {
  if (hookIndex !== undefined) {
    viewList.value[hookIndex].onDeactivate = fn
  } else if (viewId) {
    const view = viewById(viewId)
    if (!view) return
    view.onActivate = fn
  }
}
export function useMdiInterface ({ title, uniqueKey, onActivate, onDeactivate, meta = {} } = {}) {
  const res = { currentView }

  if (hookIndex !== undefined) {
    const view = viewList.value[hookIndex]
    view.title = title ?? view.title
    view.onActivate = onActivate
    view.onDeactivate = onDeactivate
    view.uniqueKey = uniqueKey ?? view.uniqueKey

    Object.assign(view.meta, meta)
    const { viewId, parentViewId } = view
    Object.assign(res, { viewId, parentViewId, uniqueKey: view.uniqueKey })
  }
  return res
}

export async function openView (name, props, uniqueKey, meta = {}, { parentViewId, inBackground = false } = {}) {
  if (!possibleViews[name]) throw new Error(`Wrong view '${name}', available names are: ${Object.keys(possibleViews)}`)
  const importedModule = await possibleViews[name]()
  const component = importedModule.default

  let view = viewList.value.find(v =>
    v.name === name && unref(v.uniqueKey) === unref(uniqueKey) && v.parentViewId === parentViewId
  )

  console.log(viewList.value.map(v => v.uniqueKey))

  if (view) {
    if (!inBackground) {
      viewStack = viewStack.filter(i => i !== view.viewId)
    }
    view.props = props
    view.meta = toRef(meta)
  } else {
    view = { component, title: name, name, meta, props: toRef(props), uniqueKey: toRef(uniqueKey), parentViewId, viewId: ++nextId, onActivate: undefined, onDeactivate: undefined }
    viewList.value.push(view)
    hookIndex = viewList.value.length - 1
    nextTick().then(() => { hookIndex = undefined })
  }
  if (!inBackground) {
    currentView.value = view.viewId
    viewStack.unshift(currentView.value)
  }
  return view.viewId
}

export function activateView (viewId = ZERO_VIEW_ID) {
  if (viewId !== ZERO_VIEW_ID && viewById(viewId)) {
    currentView.value = viewId
  } else {
    currentView.value = ZERO_VIEW_ID
  }
}

export function closeView (viewId) {
  const viewIndex = viewList.value.findIndex(v => v.viewId === viewId)
  if (viewIndex === -1) return
  viewList.value.filter(({ parentViewId }) => parentViewId === viewId).forEach(({ viewId }) => closeView(viewId))

  viewStack = viewStack.filter(i => i !== viewId)
  if (currentView.value === viewId) {
    currentView.value = viewStack[0] ?? ZERO_VIEW_ID
  }
  viewList.value.splice(viewIndex, 1)
}

export function closeDescendantViews (viewId) {
  viewList.value.filter(({ parentViewId }) => parentViewId === viewId).forEach(({ viewId }) => closeView(viewId))
}

export function closeAllViews () {
  viewList.value = []
  viewStack = []
  currentView.value = ZERO_VIEW_ID
}

const MdiViewComponent = defineComponent({
  name: 'MdiView',
  props: {
    group: String,
    hideStyle: { type: Object, default: () => ({ display: 'none' }) },
    showStyle: { type: Object }
  },
  setup (props, { slots }) {
    return () => {
      const defaultVNodes = slots.default().map(vNode => ({ vNode, show: currentView.value === ZERO_VIEW_ID }))
      const vNodes = [...defaultVNodes, ...viewList.value.map(({ component, props, viewId }) => ({ vNode: h(component, { ...props, key: viewId }), show: currentView.value === viewId }))]
      return vNodes.map(({ vNode, show }) =>
        !show ? cloneVNode(vNode, { style: props.hideStyle }) : props.showStyle ? cloneVNode(vNode, { style: props.showStyle }) : vNode
      )
    }
  }
})

export const createMdiInterface = {
  install (app, { zeroId = 0, views } = {}) {
    app.component('MdiView', MdiViewComponent)
    ZERO_VIEW_ID = zeroId
    currentView.value = zeroId
    Object.assign(possibleViews, views)
  }
}
