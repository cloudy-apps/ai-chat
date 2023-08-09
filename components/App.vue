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
          :class="item.name === bot && 'font-bold bg-primary text-white'"
          v-for="item in bots"
          :key="item.name"
          @click="onSelectBot(item.name)"
          >{{ item.name }}</a
        >
      </div>
    </div>

    <div class="flex flex-col h-screen">
      <header
        class="text-white text-2xl font-bold p-4 flex items-center shadow"
      >
        <button @click="selectBot = true" class="flex-grow">
          {{ bot || ">> Select a bot <<" }}
        </button>
        <button @click="enableAudio = !enableAudio">
          <span class="material-icons">{{
            enableAudio ? "volume_up" : "volume_off"
          }}</span>
        </button>
      </header>
      <main
        class="flex flex-col flex-grow p-4 overflow-y-auto container mx-auto"
      >
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
import { ref, onMounted } from "vue";
import { useChat } from "../composables/chat";
import { useAuth } from "../composables/auth";
import { useEnv } from "../composables/env";
import NewMessage from "./NewMessage.vue";
import MessageHistory from "./MessageHistory.vue";

const props = defineProps({ env: { type: Object } });
const { set } = useEnv();
onMounted(() => set(props.env));
const { authenticated } = useAuth();
const { history, pending, enableAudio, bot, bots, ask, setBot, removeAt } =
  useChat();
const selectBot = ref(false);

function onSelectBot(name) {
  setBot(name);
  selectBot.value = false;
}
</script>
