import { Reactive, provide, inject, toRaw, ref, onBeforeUpdate, Ref } from 'vue'

export interface ModalFormContext {
  elements: Ref<Record<string, HTMLElement>>
  reset(): void
  isFilled(): boolean
  camposNaoPreenchidos: Ref<string[]>
  getFunctionModalRef(index: string): (el: HTMLElement | null) => void
}

const ModalFromSymbol = Symbol('ModalFormContext')

export function useModalForm<T extends Record<string, unknown>>(data: Reactive<T>) {
  const state = data
  const initialCopy = structuredClone(toRaw(data) as T)

  // refs para partes do modal
  const elements = ref<Record<string, HTMLElement>>({})

  const camposNaoPreenchidos = ref<string[]>([])

  function getFunctionModalRef(id: string) {
    return (el: HTMLElement | null) => {
      if (el) elements.value[id] = el
    }
  }

  function reset() {
    Object.assign(state, initialCopy)
  }

  const isFilled = () => {
    camposNaoPreenchidos.value = []
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

  provide<ModalFormContext>(ModalFromSymbol, {
    elements,
    reset,
    isFilled,
    camposNaoPreenchidos,
    getFunctionModalRef,
  })

  return { elements, isFilled, reset, camposNaoPreenchidos, getFunctionModalRef }
}

export function useModalFormContext() {
  const context = inject<ModalFormContext>(ModalFromSymbol)
  if (!context) throw new Error('useModalFormContext() must be used inside Form')
  return context
}
