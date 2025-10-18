<script setup>
import { useFruitShopConsumer } from '../../../../composables/useFruitShopProvider'

const { query, onInput, inputRef } = useFruitShopConsumer()
</script>

<template>
  <input
    :value="query"
    @input="onInput"
    :ref="inputRef"
    class="border p-2 rounded w-full"
    placeholder="Type something..."
  />
</template>
