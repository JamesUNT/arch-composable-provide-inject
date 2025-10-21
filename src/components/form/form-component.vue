<template>
  <form v-if="isOpen" class="form-section" id="form" :ref="getFunctionRef('form')">
    <h2>{{ titulo }}</h2>
    <slot></slot>
  </form>
</template>

<script setup>
import { useModalContext } from '../../composables/usoModalCotroller'

defineProps({
  titulo: {
    type: String,
    required: true,
  },
})

const { isOpen, getFunctionRef } = useModalContext()
</script>
