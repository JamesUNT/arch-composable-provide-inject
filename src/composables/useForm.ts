import { Reactive, reactive, provide, inject, toRaw, ref, onBeforeUpdate, Ref } from 'vue'

export interface ModalFormContext<T extends Record<string, string>> {
  state: Reactive<T>
  reset(): void
  isFilled(): boolean
  camposNaoPreenchidos: Ref<string[]>
  getFunctionModalRef(index: string): (el: HTMLElement | null) => void
}

const ModalFromSymbol = Symbol('ModalFormContext')

export function useModalForm<T extends Record<string, string>>(initial: Reactive<T>) {
  // const state = reactive<T>(toRaw(initial) as T) // Reativo na mudança do initial
  const state = reactive<T>(structuredClone(toRaw(initial) as T))
  const initialCopy = structuredClone(toRaw(initial) as T)

  // refs para partes do modal
  const elements = ref<Record<string, HTMLElement>>({})

  const camposNaoPreenchidos = ref<string[]>([])

  function getFunctionModalRef(id: string) {
    return (el: HTMLElement) => {
      if (el) elements.value[id] = el
    }
  }

  function reset() {
    Object.assign(state, initialCopy)
  }

  const isFilled = () => {
    Object.keys(elements.value).forEach((id) => {
      const el = elements.value[id]

      if (
        el instanceof HTMLInputElement ||
        el instanceof HTMLSelectElement ||
        el instanceof HTMLTextAreaElement
      ) {
        if (el.value == '') {
          camposNaoPreenchidos.value.push(el.title || id)
        }
      }
    })
    return camposNaoPreenchidos.value.length === 0
  }

  onBeforeUpdate(() => {
    elements.value = {}
    camposNaoPreenchidos.value = []
  })

  provide<ModalFormContext<T>>(ModalFromSymbol, {
    state,
    reset,
    isFilled,
    camposNaoPreenchidos,
    getFunctionModalRef,
  })

  return { state, isFilled, reset, camposNaoPreenchidos, getFunctionModalRef }
}

export function useModalFormContext<T extends Record<string, string>>() {
  const context = inject<ModalFormContext<T>>(ModalFromSymbol)
  if (!context) throw new Error('useModalFormContext() must be used inside Form')
  return context
}
