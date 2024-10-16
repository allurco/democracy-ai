<!-- src/components/ChatMessage.vue -->
<template>
    <div class="flex mb-4" :class="{ 'justify-end': isUser }">
      <div
        :class="[
          'inline-block',
          'rounded-lg px-4 py-2 whitespace-pre-wrap break-words',
          isUser ? 'bg-message-user text-primary-text' : 'bg-message-assistant text-primary-text',
          'max-w-[90%] sm:max-w-[80%] md:max-w-[70%] lg:max-w-[60%]',
        ]"
      >
        <div v-if="isAssistant" v-html="sanitizedHtml"></div>
        <div v-else>{{ message.text }}</div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { computed } from 'vue'
  import { defineProps } from 'vue'
  import MarkdownIt from 'markdown-it'
  import DOMPurify from 'dompurify'
  
  interface Message {
    id: string
    sender: 'you' | 'assistant'
    text: string
    pristine: boolean
  }
  
  const props = defineProps<{ message: Message }>()
  
  const isUser = props.message.sender === 'you'
  const isAssistant = props.message.sender === 'assistant'
  
  // Initialize MarkdownIt
  const md = new MarkdownIt({
    linkify: true,
  })
  
  const sanitizedHtml = computed(() => {
    if (isAssistant) {
      const html = md.render(props.message.text)
      return DOMPurify.sanitize(html)
    }
    return ''
  })
  </script>