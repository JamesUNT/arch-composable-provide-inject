<template>
  <provider-wrapper :items="['Apple', 'Banana', 'Orange', 'Grape']">
    <autocomplete-input />
    <autocomplete-list />
  </provider-wrapper>
</template>

<script setup>
import ProviderWrapper from './ProviderWrapper.vue'
import AutocompleteInput from '../../components/modals/fruit-shop/auto-complete-input/AutoCompleteInput.vue'
import AutocompleteList from '../../components/modals/fruit-shop/auto-complete-list/AutoCompleteList.vue'
</script>
