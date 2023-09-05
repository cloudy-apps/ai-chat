<template>
  <form
    class="flex items-center p-4 gap-2 border-t border-green-800 bg-semi-white"
    @submit.prevent="sendMessage()"
  >
    <textarea
      v-model="message"
      v-if="!isAudioEnabled()"
      class="flex-grow resize-none rounded p-2 focus:ring-2 focus:ring-blue-600 focus:border-transparent"
      placeholder="Type in your question..."
      :rows="inputRows"
      @keydown="onKeyDown"
    ></textarea>

    <button
      :disabled="pending"
      v-if="!isAudioEnabled()"
      type="submit"
      class="bg-primary text-white leading-4 font-bold p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
    >
      <span class="material-icons" :class="pending && 'animate-spin'">{{
        pending ? "refresh" : "send"
      }}</span>
    </button>
    <button
      :disabled="pending"
      v-if="isAudioEnabled()"
      class="bg-primary text-white leading-4 font-bold p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 mx-auto"
      @click="inProgress ? stop() : start()"
    >
      <span class="material-icons" :class="[inProgress && 'animate-pulse']">{{
        inProgress ? "record_voice_over" : "mic"
      }}</span>
    </button>
    <button
      v-if="inProgress"
      class="bg-semi-white text-gray-800 leading-4 font-bold p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 mx-auto"
      @click="abort()"
    >
      <span class="material-icons">clear</span>
    </button>
  </form>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { useSpeech } from "../composables/speech";

defineProps({
  pending: { type: Boolean, default: false },
});

const emit = defineEmits(["send"]);

const message = ref("");
const { isAudioEnabled } = useSpeech();
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

function onKeyDown(event: KeyboardEvent) {
  if (event.code === "Enter" && (event.ctrlKey || event.metaKey)) {
    event.preventDefault();
    sendMessage();
  }
}

watch(output, (value) => {
  message.value = value;
  sendMessage();
});
</script>
