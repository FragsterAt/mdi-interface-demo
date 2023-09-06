import { Dialog } from 'quasar'

export async function confirmDialog (options, { ok = true, cancel = false, dismiss = false } = {}) {
  return new Promise(resolve => {
    Dialog.create(options)
      .onOk(() => resolve(ok))
      .onCancel(() => resolve(cancel))
      .onDismiss(() => resolve(dismiss))
  })
}
