<template>
  <div class="flex flex-col h-screen">
    <header class="bg-indigo-900 text-white text-2xl font-bold p-4">Help</header>
    <main class="flex flex-col flex-grow bg-gray-100 p-4 overflow-y-auto">
      <ChatHistory :messages="history" />
    </main>
    <NewMessage @send="ask($event)" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useChat } from './composables/chat.js';

import ChatHistory from './components/ChatHistory.vue';
import NewMessage from './components/NewMessage.vue';

export default defineComponent({
  components: { ChatHistory, NewMessage },
 
  setup() {
    const { history, ask } = useChat();

    return { history, ask };
  },
});
</script>
