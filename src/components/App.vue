<template>
  <div v-if="auth" class="relative h-screen">
    <div
      v-if="selectBots"
      class="absolute z-2 inset-2 bg-gray-100 w-screen h-screen p-4 flex flex-col rounded-lg shadow"
    >
      <h2>Select a bot</h2>
      <div class="overflow-y-scroll flex-grow">
        <a
          href="#"
          class="block rounded shadow py-2 px-4"
          v-for="bot in bots"
          :key="bot.name"
          @click="setBot(bot.name)"
          >{{ bot.name }}</a
        >
      </div>
    </div>

    <div class="flex flex-col h-screen bg-gray-100">
      <header
        class="bg-indigo-900 text-white text-2xl font-bold p-4 flex items-center"
      >
        <h1 class="w-full">{{ bot }}</h1>
        <button
          @click="selectBots = !selectBots"
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
import { useChat } from "../composables/chat";
import Welcome from "./Welcome.vue";
import NewMessage from "./NewMessage.vue";
import MessageHistory from "./MessageHistory.vue";
import { ref } from "vue";

const { history, pending, bot, ask, setBot, removeAt } = useChat();
const selectBots = ref(false);
</script>
