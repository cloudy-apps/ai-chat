<template>
  <div v-if="authenticated" class="relative h-screen">
    <div
      v-if="selectBot"
      class="absolute z-10 inset-2 mx-8 my-4 bg-gray-100 p-4 flex flex-col rounded-lg shadow-2xl border border-gray-200"
    >
      <h2 class="text-md font-bold mb-4 ml-4">Select a bot</h2>
      <div
        class="overflow-y-scroll flex-grow rounded-lg border border-gray-200"
      >
        <a
          href="#"
          class="block py-2 px-4 shadow-sm"
          :class="item.name === bot && 'font-bold bg-blue-400 text-white'"
          v-for="item in bots"
          :key="item.name"
          @click="onSelectBot(item.name)"
          >{{ item.name }}</a
        >
      </div>
    </div>

    <div class="flex flex-col h-screen bg-gray-100">
      <header
        class="bg-indigo-900 text-white text-2xl font-bold p-4 flex items-center"
      >
        <h1 class="w-full">{{ bot }}</h1>
        <button
          @click="selectBot = true"
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
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useChat } from "../composables/chat";
import { useAuth } from "../composables/auth";
import Welcome from "./Welcome.vue";
import NewMessage from "./NewMessage.vue";
import MessageHistory from "./MessageHistory.vue";

const { authenticated } = useAuth();
const { history, pending, bot, bots, ask, setBot, removeAt } = useChat();
const selectBot = ref(false);

function onSelectBot(name) {
  setBot(name);
  selectBot.value = false;
}
</script>
