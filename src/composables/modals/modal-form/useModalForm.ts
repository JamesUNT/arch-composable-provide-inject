import { Reactive, reactive, provide, inject, toRaw } from 'vue'

export interface ModalFormContext<T extends Record<string, unknown>> {
  state: Reactive<T>
  reset(): void
}

const ModalFromSymbol = Symbol('ModalFormContext')

export function useFormModal<T extends Record<string, unknown>>(initial: Reactive<T>) {
  // const state = reactive((initial) as T) // Reativo na mudança do initial
  const state = reactive(structuredClone(toRaw(initial) as T))
  const initialCopy = structuredClone(toRaw(initial) as T)

  function reset() {
    Object.assign(state, initialCopy)
  }

  provide<ModalFormContext<T>>(ModalFromSymbol, {
    state,
    reset,
  })

  return { state, reset }
}

export function useModalContext<T extends Record<string, unknown>>() {
  const context = inject<ModalFormContext<T>>(ModalFromSymbol)
  if (!context) throw new Error('useModalFormContext() must be used inside Form')
  return context
}
