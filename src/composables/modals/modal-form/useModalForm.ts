import { reactive } from 'vue'

export interface FormData {
  name: string
  email: string
  gender: string
  country: string
}

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

  return { state, reset }
}
