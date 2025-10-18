// composables/useFruitShopProvider.js
import { ref, computed, provide, inject, onUnmounted } from 'vue'

const FruitShopKey = Symbol('FruitShop')

export function useFruitShopProvider(items) {
  const query = ref<string>('')
  const isOpen = ref<boolean>(false)
  const inputEl = ref<HTMLElement>(null)
  const listEl = ref<HTMLElement>(null)

  const filtered = computed(() =>
    items.value.filter((i) => i.toLowerCase().includes(query.value.toLowerCase())),
  )

  function onInput(e: Event) {
    const target = e.target as HTMLInputElement
    query.value = target.value
    isOpen.value = true
  }

  function select(item) {
    query.value = item
    isOpen.value = false
  }

  // function ref → recebe referência do input e lista
  function inputRef(el) {
    inputEl.value = el
  }

  function listRef(el) {
    listEl.value = el
  }

  function focusInput() {
    inputEl.value?.focus()
  }

  provide(FruitShopKey, {
    query,
    isOpen,
    filtered,
    onInput,
    select,
    inputRef,
    listRef,
    focusInput,
    inputEl,
    listEl,
  })

  // Limpar as referências ao desmontar o componente é necessário para evitar vazamentos de memória e comportamentos inesperados.
  onUnmounted(() => {
    inputEl.value = null
    listEl.value = null
  })
}

export function useFruitShopConsumer() {
  const ctx = inject(FruitShopKey)
  if (!ctx) throw new Error('FruitShop context not found!')
  return ctx
}
