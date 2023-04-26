<template>
  <div
    class="absolute z-2 bg-gray-100 h-screen w-screen flex items-center justify-center"
  >
    <div class="text-center">
      <h1 class="text-2xl font-bold mb-6">Hello!</h1>
      <input
        type="text"
        class="mr-4 border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-600 focus:border-transparent"
        v-model="name"
        placeholder="What's my name?"
      />
      <button
        @click="save()"
        class="bg-gray-200 text-gray-700 px-4 py-2 rounded shadow flex items-center justify-center"
      >
        Continue
      </button>
    </div>
  </div>
</template>

<script lang="ts">
export default defineComponent({});
</script>

<script setup>
import { ref, unref } from "vue";
import { useChat } from "../composables/chat.js";

const name = ref("");
const { aiName } = useChat();

function save() {
  aiName.value = unref(name);
}
</script>
