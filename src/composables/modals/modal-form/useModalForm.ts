import { reactive, provide, inject } from 'vue'

export interface FormData {
  name: string
  email: string
  gender: string
  country: string
}

export interface ModalFormContext {
  state: FormData
  reset(): void
}

const ModalFromSymbol = Symbol('ModalFormContext')

// TODO: Fazer o state ser genérico (definido pelo pai)

export function useFormModal() {
  const state = reactive({
    name: '',
    email: '',
    gender: '',
    country: '',
  })

  function reset() {
    state.name = ''
    state.email = ''
    state.gender = ''
    state.country = ''
  }

  provide(ModalFromSymbol, {
    state,
    reset,
  })

  return { state, reset }
}

export function useModalContext() {
  const context = inject<ModalFormContext>(ModalFromSymbol)
  if (!context) throw new Error('useModalFormContext() must be used inside Form')
  return context
}
