<template>
  <form
    class="flex items-center p-4 gap-2 border-t border-green-800 bg-semi-white"
    @submit.prevent="sendMessage()"
  >
    <textarea
      v-model="message"
      class="flex-grow resize-none rounded p-2 focus:ring-2 focus:ring-blue-600 focus:border-transparent"
      placeholder="Type your message"
      :rows="inputRows"
    ></textarea>

    <button
      :disabled="pending"
      v-if="!enableAudio"
      type="submit"
      class="bg-primary text-white leading-4 font-bold p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
    >
      <span class="material-icons" :class="pending && 'animate-spin'">{{
        pending ? "refresh" : "send"
      }}</span>
    </button>
    <button
      :disabled="pending"
      v-if="enableAudio"
      class="bg-primary text-white leading-4 font-bold p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      @click="inProgress ? stop() : start()"
    >
      <span class="material-icons" :class="[inProgress && 'animate-pulse']">{{
        inProgress ? "record_voice_over" : "mic"
      }}</span>
    </button>
    <button
      v-if="inProgress"
      class="bg-gray-200 text-gray-800 leading-4 font-bold p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      @click="abort()"
    >
      <span class="material-icons">clear</span>
    </button>
  </form>
</template>

<script setup>
import { computed, ref, watch } from "vue";
import { useSpeech } from "../composables/speech";
import { useChat, useSpeech } from "../composables/chat";

defineProps({
  pending: { type: Boolean, default: false },
});

const emit = defineEmits(["send"]);

const message = ref("");
const { enableAudio } = useChat();
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

<style>
.bg-semi-white {
  background-color: rgba(255, 255, 255, 0.1);
}
</style>
