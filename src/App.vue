<template>
  <div class="flex flex-col h-screen">
    <header class="bg-indigo-900 text-white text-2xl font-bold p-4">Help</header>
    <main
      class="flex flex-col flex-grow bg-gray-100 p-4"
    >
      <div
        class="flex-grow overflow-y-auto mb-4"
      >
        <ChatHistory :messages="messages" />
      </div>
      <NewMessage @send="onSubmit($event)" />
    </main>
  </div>
</template>

<script lang="ts">
import { ChatService, Message } from './services/chat-service.js';

import ChatHistory from './components/ChatHistory.vue';
import NewMessage from './components/NewMessage.vue';
import { defineComponent, ref, unref } from 'vue';

export default defineComponent({
  components: { ChatHistory, NewMessage },
  setup() {
    const chat = new ChatService();
    const messages = ref([
      {
        role: 'assistant',
        content: 'Hi! Ask me anything :)',
      },
    ]);

    async function onSubmit(message: string) {
      const response = await ask(message);
      unref(messages).push(response);
    }

    async function ask(message: string): Promise<Message> {
      const history = unref(messages);
      const question = { role: 'user', content: message };

      return await chat.ask(question, history);
    }

    return { messages, onSubmit };
  },
});
</script>
