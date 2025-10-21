import { Ref, ref, reactive, onBeforeUpdate, provide, inject } from 'vue'

export interface ModalContext {
  isOpen: Ref<boolean>
  open(event: Event): void
  close(event: Event): void
  getFunctionRef(index: string): (el: HTMLElement | null) => void
}

const ModalSymbol = Symbol('ModalContext')

export function useModalController(): ModalContext {
  const isOpen = ref(true)

  // refs para partes do modal
  const elements = ref<Record<string, HTMLElement>>({})

  function getFunctionRef(id: string) {
    return (el: HTMLElement) => {
      if (el) elements.value[id] = el
    }
  }

  onBeforeUpdate(() => {
    elements.value = {}
  })

  function open(event: Event) {
    event.preventDefault()
    isOpen.value = true
  }

  function close(event: Event) {
    event.preventDefault()
    let camposNaoPreenchidos = []
    Object.keys(elements.value).forEach((id) => {
      const element = elements.value[id]
      if (
        element instanceof HTMLInputElement ||
        element instanceof HTMLSelectElement ||
        element instanceof HTMLTextAreaElement
      ) {
        element
        if (element.value === '') {
          camposNaoPreenchidos.push(element.title || id)
          return
        }
      }
    })

    if (camposNaoPreenchidos.length !== 0) {
      alert(
        `Existem alterações não preenchidas no campo: ${camposNaoPreenchidos.map((campos) => ` \n${campos}`)}`,
      )
      return
    }
    isOpen.value = false
  }

  provide(ModalSymbol, {
    isOpen,
    open,
    close,
    getFunctionRef,
  })

  return {
    isOpen,
    open,
    close,
    getFunctionRef,
  }
}

export function useModalContext() {
  const context = inject<ModalContext>(ModalSymbol)
  if (!context) throw new Error('useModalContext() must be used inside Modal')
  return context
}
