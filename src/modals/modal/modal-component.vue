<template>
  <form-component v-if="isOpen" titulo="Formulário renderless">
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
        :ref="getFunctionModalRef('email')"
        v-model="state.email"
        type="text"
      />
    </div>

    <div class="form-group">
      <label for="gender">Gênero:</label>
      <select
        id="gender"
        title="Gênero"
        :ref="getFunctionModalRef('gender')"
        v-model="state.gender"
      >
        <option value="">Selecione</option>
        <option value="male">Masculino</option>
        <option value="female">Feminino</option>
        <option value="other">Outro</option>
      </select>
    </div>

    <div class="form-group">
      <label for="country">País:</label>
      <select
        id="country"
        title="País"
        :ref="getFunctionModalRef('country')"
        v-model="state.country"
      >
        <option value="">Selecione</option>
        <option value="br">Brasil</option>
        <option value="us">Estados Unidos</option>
        <option value="fr">França</option>
      </select>
    </div>
    <footer>
      <button @click="realizarRequisicao">Salvar & limpar</button>
    </footer>
  </form-component>
  <button @click="open">Abrir</button>
  <button @click="fecharModal">Fechar</button>
  <input type="text" name="teste" id="teste" v-model="estado.name" />
</template>

<script setup lang="ts">
import { onMounted, reactive } from 'vue'
import { FormData } from './modal-model'
import { useModalController } from '../../composables/usoModalCotroller'
import { useModalForm } from '../../composables/useForm'
import formComponent from '@/components/form/form-component.vue'

const estado = reactive<FormData>({
  name: 'Thiago',
  email: 'thiago@gmail.com',
  gender: '',
  country: '',
})

const { isOpen, close, open, getFunctionRef } = useModalController()
const { state, camposNaoPreenchidos, reset, isFilled, getFunctionModalRef } = useModalForm(estado)

function realizarRequisicao(event) {
  event.preventDefault()
  alert(
    `formulário enviado com sucesso! Form: ${Object.keys(state).map((key) => `\n${key} : ${state[key]}`)}`,
  )
  reset()
}

function fecharModal() {
  console.log(estado)
  isFilled()
    ? close()
    : alert(
        `Ainda há campos a serem preenchidos: ${camposNaoPreenchidos.value.map((el) => `\n ${el}`)}`,
      )
}

onMounted(() => {
  open()
})
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
