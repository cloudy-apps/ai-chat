<template>
  <div
    class="rounded-lg shadow-md px-4 py-2 text-gray-800 mb-4"
    :class="(isAssistant && 'bg-blue-100') || 'bg-white'"
  >
    <div class="flex items-center space-x-4">
      <div class="shrink-0">
        <div
  class="text-indigo-900 font-bold w-12 h-12 rounded-full flex items-center justify-center bg-gray-100 border border-slate-300"
>{{ isAssistant ? 'AI' : 'ME' }}</div>

      </div>
      <div>
        <h1 class="text-md font-bold mb-2">{{ isAssistant ? 'Jarvis' : 'Me' }}</h1>
        <p class="text-base">{{ message.content }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    message: {
      type: Object,
      required: false,
      default: () => ({ role: '', content: '' }),
    },
  },
  computed: {
    isMe() {
      return this.message.role === 'user';
    },
    isAssistant() {
      return this.message.role === 'assistant';
    }
  }
});
</script>
