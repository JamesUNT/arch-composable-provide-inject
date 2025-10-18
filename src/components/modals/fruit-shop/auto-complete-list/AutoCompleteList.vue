<script setup>
import { useFruitShopConsumer } from '../../../../composables/useFruitShopProvider'

const { filtered, isOpen, select, listRef } = useFruitShopConsumer()
</script>

<template>
  <ul v-if="isOpen" :ref="listRef" class="absolute bg-white border w-full mt-1 rounded shadow">
    <li
      v-for="item in filtered"
      :key="item"
      @click="select(item)"
      class="p-2 hover:bg-gray-200 cursor-pointer"
    >
      {{ item }}
    </li>
  </ul>
</template>
