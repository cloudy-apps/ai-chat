<template>
  <div class="flex flex-col h-screen">
    <header class="bg-indigo-900 text-white text-2xl font-bold p-4">Help</header>
    <main class="flex flex-col flex-grow bg-gray-100 p-4 overflow-y-auto">
      <ChatHistory :messages="history" />
    </main>
    <NewMessage @send="onSubmit($event)" />
  </div>
</template>

<script lang="ts">
import { ChatService } from './services/chat-service.js';

import ChatHistory from './components/ChatHistory.vue';
import NewMessage from './components/NewMessage.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  components: { ChatHistory, NewMessage },
  setup() {
    const chat = new ChatService();
    const { history } = chat;

    function onSubmit(message: string) {
      chat.ask(message);
    }

    return { onSubmit, history };
  },
});
</script>
