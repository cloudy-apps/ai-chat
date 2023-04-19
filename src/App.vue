<template>
  <div class="flex flex-col h-screen bg-gray-100">
    <header class="bg-indigo-900 text-white text-2xl font-bold p-4 flex items-center"> 
      <span class="w-full">Jarvis</span>
      <div class="text-indigo-900 font-bold w-10 h-10 rounded-full flex items-center justify-center bg-gray-100 border border-gray-300 overflow-hidden">
        <img src="/icon-72.png" alt="" />
      </div>
    </header>
    <main class="flex flex-col flex-grow p-4 overflow-y-auto">
      <MessageCard
        v-for="(message, index) in history"
        :key="index"
        :message="message"
        @remove="removeAt(index)"
      />
      <MessageCard
        v-if="pending"
        :id="-1"
        :message="{ role: 'assistant', content: '...' }"
        class="animate-pulse"
      />
    </main>
    <NewMessage @send="ask($event)" :pending="pending" />
  </div>
</template>

<script lang="ts">
  import { defineComponent, watch } from "vue";
  import { useChat } from "./composables/chat.js";

  import MessageCard from "./components/MessageCard.vue";
  import NewMessage from "./components/NewMessage.vue";

  export default defineComponent({
    components: { MessageCard, NewMessage },

    setup() {
      const { history, pending, ask, removeAt } = useChat();

      function focusLast() {
        const container = document.querySelector("main");
        if (!container) {
          return;
        }

        setTimeout(
          () =>
            container.scrollTo({
              top: container.scrollHeight,
              behavior: "smooth",
            }),
          400
        );
      }

      watch(history, focusLast);

      return { history, pending, ask, removeAt };
    },
  });
</script>
