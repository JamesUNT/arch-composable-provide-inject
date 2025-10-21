<template>
  <form
    v-if="isOpen"
    class="form-section"
    id="form"
    title="Formulário"
    :ref="getFunctionRef('form')"
  >
    <div class="form-group">
      <label for="name">Nome:</label>
      <input
        id="name"
        title="Nome"
        :ref="getFunctionRef('name')"
        v-model="state.name"
        type="text"
      />
    </div>

    <div class="form-group">
      <label for="email">Email:</label>
      <input
        id="email"
        title="E-mail"
        :ref="getFunctionRef('email')"
        v-model="state.email"
        type="text"
      />
    </div>

    <div class="form-group">
      <label for="gender">Gênero:</label>
      <select id="gender" title="Gênero" :ref="getFunctionRef('gender')" v-model="state.gender">
        <option value="">Selecione</option>
        <option value="male">Masculino</option>
        <option value="female">Feminino</option>
        <option value="other">Outro</option>
      </select>
    </div>

    <div class="form-group">
      <label for="country">País:</label>
      <select id="country" title="País" :ref="getFunctionRef('country')" v-model="state.country">
        <option value="">Selecione</option>
        <option value="br">Brasil</option>
        <option value="us">Estados Unidos</option>
        <option value="fr">França</option>
      </select>
    </div>

    <footer>
      <button @click="auditar">Auditar no Console & limpar</button>
    </footer>
  </form>
  <button @click="open">Abrir</button>
  <button @click="close">Fechar</button>
  <input type="text" name="teste" id="teste" v-model="state.name" />
</template>

<script setup lang="ts">
// TODO: Fragmentar esse form em um componente e testar se o state de useFormModal funciona com v-model e os métodos do mesmo com emits
import { reactive } from 'vue'
import { useModalController } from '../../composables/usoModalCotroller'
import { useFormModal } from '../../composables/modals/modal-form/useModalForm'

const estado = reactive({
  name: 'Thiago',
  email: 'thiago@gmail.com',
  gender: '',
  country: '',
})

const { isOpen, close, open, getFunctionRef } = useModalController()
const { state, reset } = useFormModal(estado)

function auditar() {
  event.preventDefault()
  console.log(state)
  reset()
}
</script>

<style scoped>
.form-section {
  padding: 10px;
  background: #f5f5f5;
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.form-group {
  display: flex;
  flex-direction: column;
}
</style>
