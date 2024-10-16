<!-- src/App.vue -->
<template>
  <div class="flex flex-col h-screen bg-chat-bg text-primary-text">
    <!-- Área de Mensagens -->
    <main class="flex-1 overflow-y-auto p-6">
      <ChatMessage
        v-for="(message, index) in messages"
        :key="index"
        :message="message"
      />
    </main>

    <!-- Campo de Entrada de Mensagens -->
    <footer class="p-4 bg-input-bg border-t border-gray-600">
      <form @submit.prevent="sendMessage" class="flex items-center">
        <input
          v-model="newMessage"
          type="text"
          placeholder="Digite sua mensagem..."
          class="flex-1 bg-transparent border-none px-4 py-2 text-primary-text placeholder-secondary-text focus:outline-none"
        />
        <button
          type="submit"
          class="ml-4 text-primary-text hover:text-secondary-text"
          :disabled="!newMessage.trim()"
        >
          <PaperAirplaneIcon class="h-6 w-6 transform rotate-90" />
        </button>
      </form>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick, onMounted, onBeforeUnmount } from 'vue'
import socket from './services/socket.ts'
import ChatMessage from './components/ChatMessage.vue'
import { PaperAirplaneIcon } from '@heroicons/vue/24/solid'

// Interface da Mensagem
interface Message {
  id: string
  sender: 'you' | 'assistant'
  text: string
  pristine: boolean
}

// Estados Reativos
const messages = ref<Message[]>([])
const newMessage = ref('')
const currentMessage = ref<Message | null>(null)

// Função para Gerar IDs Únicos
import { v4 as uuidv4 } from 'uuid'
function generateId(): string {
  return uuidv4()
}

// Mensagem de Boas-Vindas
const welcomeMessage: Message = {
  id: generateId(),
  sender: 'assistant',
  text: 'Este assistente de inteligência artificial foi desenvolvido para auxiliar o eleitor a encontrar respostas dentro das propostas dos candidatos enviadas ao TSE. As informações apresentadas são obtidas exclusivamente dessas propostas, garantindo neutralidade e ausência de vieses.',
  pristine: false,
}

// Lifecycle Hooks
onMounted(() => {
  // Adicionar a mensagem de boas-vindas
  messages.value.push(welcomeMessage)

  // Configurar o socket para ouvir mensagens
  socket.on('message', onMessageReceived)
})

onBeforeUnmount(() => {
  socket.off('message', onMessageReceived)
})

// Função para Enviar Mensagem
function sendMessage() {
  if (newMessage.value.trim()) {
    socket.emit('generate', { message: newMessage.value })
    messages.value.push({
      id: generateId(),
      sender: 'you',
      text: newMessage.value,
      pristine: true,
    })
    currentMessage.value = {
      id: generateId(),
      sender: 'assistant',
      text: 'Gerando...',
      pristine: true,
    }
    messages.value.push(currentMessage.value)
    newMessage.value = ''

    // Auto-scroll para a última mensagem
    nextTick(() => {
      const chatWindow = document.querySelector('main')
      if (chatWindow) {
        chatWindow.scrollTop = chatWindow.scrollHeight
      }
    })
  }
}

// Função para Receber Mensagens
function onMessageReceived(message: string) {
  if (currentMessage.value) {
    if (currentMessage.value.pristine) {
      currentMessage.value.text = ''
      currentMessage.value.pristine = false
    }
    currentMessage.value.text += message

    // Auto-scroll para a última mensagem
    nextTick(() => {
      const chatWindow = document.querySelector('main')
      if (chatWindow) {
        chatWindow.scrollTop = chatWindow.scrollHeight
      }
    })
  }
}
</script>

<style>
/* Estilos personalizados (se necessário) */
</style>