<template>
  <form class="flex items-center p-4" @submit.prevent="sendMessage">
    <textarea
      v-model="message"
      class="flex-grow mr-4 resize-none rounded-lg p-2 focus:ring-2 focus:ring-blue-600 focus:border-transparent"
      placeholder="Type your message"
      :rows="inputRows"
    ></textarea>

    <button
      :disabled="pending"
      type="submit"
      class="bg-primary leading-4 text-white font-bold py-2 px-4 rounded-l focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
    >
      <span class="material-icons" :class="pending && 'animate-spin'">{{
        pending ? "refresh" : "send"
      }}</span>
    </button>
    <button
      :disabled="pending"
      class="bg-primary leading-4 text-white font-bold py-2 px-4 rounded-r focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      @click="inProgress ? stop() : start()"
    >
      <span class="material-icons" :class="[inProgress && 'animate-pulse']">{{
        inProgress ? "graphic_eq" : "mic"
      }}</span>
    </button>
    <button
      v-if="inProgress"
      class="bg-gray-200 leading-4 text-gray-800 font-bold py-2 px-4 rounded-r focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      @click="abort()"
    >
      <span class="material-icons">clear</span>
    </button>
  </form>
</template>

<script setup>
import { computed, ref, watch } from "vue";
import { useSpeech } from "../composables/speech";

defineProps({
  pending: { type: Boolean, default: false },
});

const emit = defineEmits(["send"]);

const message = ref("");
const { output, inProgress, start, stop, abort } = useSpeech();

const inputRows = computed(() => {
  const lines = message.value.split("\n").length;
  return lines > 1 ? Math.min(10, lines + 1) : 1;
});

function sendMessage() {
  const content = message.value.trim();

  if (content) {
    emit("send", content);
    message.value = "";
  }
}

watch(output, (value) => {
  message.value = value;
  sendMessage();
});
</script>
