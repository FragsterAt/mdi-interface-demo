import { ref, defineComponent, h, cloneVNode, nextTick, unref, toRef, computed } from 'vue'

export let ZERO_VIEW_ID = 0

export const viewList = ref([])
const _currentView = ref(ZERO_VIEW_ID)
export const currentView = computed({
  get: () => _currentView.value,
  set: async (viewId) => {
    if (_currentView.value === viewId) return
    if (_currentView.value !== ZERO_VIEW_ID) {
      const { hooks: { onDeactivate = () => true } } = viewById(_currentView.value) ?? {}
      if (await onDeactivate(viewId, _currentView.value) === false) return
    }

    if (viewId !== ZERO_VIEW_ID) {
      const view = viewById(viewId)
      if (!view) {
        _currentView.value = ZERO_VIEW_ID
        return
      }

      const { hooks: { onActivate = () => true } } = view
      if (await onActivate(_currentView.value, viewId) === false) return
    }
    _currentView.value = viewId
  }
})
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

let viewStack = []

export function onActivate (fn, viewId) {
  if (hookIndex !== undefined) {
    viewList.value[hookIndex].hooks.onActivate = fn
  } else if (viewId) {
    const view = viewById(viewId)
    if (!view) return
    view.hooks.onActivate = fn
  }
}
export function onDeactivate (fn, viewId) {
  if (hookIndex !== undefined) {
    viewList.value[hookIndex].hooks.onDeactivate = fn
  } else if (viewId) {
    const view = viewById(viewId)
    if (!view) return
    view.hooks.onDeactivate = fn
  }
}
export function onBeforeClose (fn, viewId) {
  if (hookIndex !== undefined) {
    viewList.value[hookIndex].hooks.onBeforeClose = fn
  } else if (viewId) {
    const view = viewById(viewId)
    if (!view) return
    view.hooks.onBeforeClose = fn
  }
}

export function useMdiInterface ({ title, uniqueKey, onActivate, onDeactivate, onBeforeClose, meta = {} } = {}) {
  const res = { currentView }

  if (hookIndex !== undefined) {
    const view = viewList.value[hookIndex]
    view.title = title ?? view.title
    view.hooks.onActivate = onActivate
    view.hooks.onDeactivate = onDeactivate
    view.hooks.onBeforeClose = onBeforeClose
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
    view = {
      component,
      title: name,
      name,
      meta,
      props: toRef(props),
      uniqueKey: toRef(uniqueKey),
      parentViewId,
      viewId: ++nextId,
      hooks: {
        onActivate: undefined, onDeactivate: undefined, onBeforeClose: undefined
      }
    }
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

export async function activateView (viewId = ZERO_VIEW_ID, force = false) {
  currentView.value = viewId
  if (force && currentView.value !== viewId && viewList.value.some(v => v.viewId === viewId)) {
    _currentView.value = viewId
  }
}

export async function closeView (viewId) {
  const viewIndex = viewList.value.findIndex(v => v.viewId === viewId)
  if (viewIndex === -1) return

  const view = viewList.value[viewIndex]
  const { hooks: { onBeforeClose = () => true } } = view
  const res = await onBeforeClose()
  if (res === false) {
    return
  }

  viewList.value.filter(({ parentViewId }) => parentViewId === viewId).forEach(({ viewId }) => closeView(viewId))

  viewStack = viewStack.filter(i => i !== viewId)
  if (_currentView.value === viewId) {
    _currentView.value = viewStack[0] ?? ZERO_VIEW_ID
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
