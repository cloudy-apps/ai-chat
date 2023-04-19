<template>
  <div class="flex flex-col h-screen bg-gray-100">
    <header class="bg-indigo-900 text-white text-2xl font-bold p-4">Jarvis</header>
    <main class="flex flex-col flex-grow p-4 overflow-y-auto" @remove="removeAt($event)">
      <MessageCard v-for="(message, index) in history" :key="index" :id="index" :message="message" />
    </main>
    <NewMessage @send="ask($event)" :pending="pending" />
  </div>
</template>

<script lang="ts">
import { defineComponent, watch } from 'vue';
import { useChat } from './composables/chat.js';

import MessageCard from './components/MessageCard.vue';
import NewMessage from './components/NewMessage.vue';

export default defineComponent({
  components: { MessageCard, NewMessage },

  setup() {
    const { history, pending, ask, removeAt } = useChat();

    function focusLast() {
      setTimeout(() => document.querySelector('main')?.lastElementChild?.scrollIntoView(), 1000);
    }

    watch(history, focusLast);

    return { history, pending, ask, removeAt };
  },
});
</script>
