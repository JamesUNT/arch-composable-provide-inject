<script setup>
import { useFruitShopProvider } from '../../composables/useFruitShopProvider'
import { ref } from 'vue'

const props = defineProps({
  items: {
    type: Array,
    required: true,
  },
})

// Cria e fornece o contexto para os filhos
useFruitShopProvider(ref(props.items))
</script>

<template>
  <div class="relative">
    <slot />
  </div>
</template>
