<template>
  <div class="flex flex-col h-screen bg-gray-100">
    <header class="bg-indigo-900 text-white text-2xl font-bold p-4">Help</header>
    <main class="flex flex-col flex-grow p-4 overflow-y-auto">
      <MessageCard
        v-for="(message, index) in history"
        :key="index"
        :message="message"
      />
    </main>
    <NewMessage @send="ask($event)" :pending="pending" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useChat } from './composables/chat.js';

import MessageCard from './MessageCard.vue';
import NewMessage from './components/NewMessage.vue';

export default defineComponent({
  components: { ChatHistory, NewMessage },
 
  setup() {
    const { history, pending, ask } = useChat();

    return { history, pending, ask };
  },
});
</script>
