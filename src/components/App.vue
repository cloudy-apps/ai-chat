<template>
  <Transition name="fade">
    <Welcome v-if="!aiName || settingsOpen" />
  </Transition>
  <Transition>
    <div v-else class="flex flex-col h-screen bg-gray-100">
      <header
        class="bg-indigo-900 text-white text-2xl font-bold p-4 flex items-center"
      >
        <h1 class="w-full">{{ aiName }}</h1>
        <button
          @click="settingsOpen = !settingsOpen"
          class="text-indigo-900 font-bold w-10 h-10 rounded-full flex items-center justify-center bg-gray-100 border border-gray-300 overflow-hidden"
        >
          <img src="/icon-72.png" alt="" />
        </button>
      </header>
      <main class="flex flex-col flex-grow p-4 overflow-y-auto">
        <MessageHistory
          :history="history"
          :pending="pending"
          @remove="removeAt($event)"
        />
      </main>
      <NewMessage @send="ask($event)" :pending="pending" />
    </div>
  </Transition>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useChat } from "../composables/chat.js";

import Welcome from "./Welcome.vue";
import NewMessage from "./NewMessage.vue";
import MessageHistory from "./MessageHistory.vue";

export default defineComponent({});
</script>
<script setup>
import { ref } from "vue";

const { history, pending, ask, aiName, removeAt } = useChat();
const settingsOpen = ref(false);
</script>
<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
