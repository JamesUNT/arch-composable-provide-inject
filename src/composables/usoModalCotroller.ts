import { Ref, ref, onBeforeUpdate, provide, inject } from 'vue'

export interface ModalContext {
  isOpen: Ref<boolean>
  open(): void
  close(): void
  getFunctionRef(index: string): (el: HTMLElement | null) => void
}

const ModalSymbol = Symbol('ModalContext')

export function useModalController(): ModalContext {
  const isOpen = ref(false)

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

  function open() {
    isOpen.value = true
  }

  function close() {
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
