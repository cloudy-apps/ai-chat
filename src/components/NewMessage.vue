<template>
  <form class="flex items-center p-4 bg-white rounded-t-lg mx-4 shadow-md border border-slate-300" @submit.prevent="sendMessage">
    <textarea
      v-model="message"
      class="flex-grow mr-4 resize-none border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-600 focus:border-transparent"
      placeholder="Type your message"
      rows="1"
    ></textarea>
    
    <button
      :disabled="pending"
      :class="pending && 'animate-pulse bg-slate-400' || 'bg-blue-600'"
      type="submit"
      class="leading-4 text-white font-bold py-2 px-4 rounded-l focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
    ><span class="material-icons">send</span></button>
    <button 
      @click="speechToText"
      class="leading-4 text-white font-bold py-2 px-4 rounded-r focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      :class="inProgress && 'animate-pulse bg-red-500' || 'bg-blue-500'"
      :disabled="pending"><span class="material-icons">mic</span></button>
  </form>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import { useSpeech } from '../composables/speech.js';

export default defineComponent({
  props: {
    pending: { type: Boolean, default: false },
  },

  emits: ['send'],
  
  setup(_, ctx) {
    const message = ref('');
    const { output, inProgress, start: speechToText } = useSpeech();

    watch(output, (value) => message.value = value);

    function sendMessage() {
      const content = message.value.trim();

      if (content) {
        ctx.emit('send', content);
        message.value = '';
      }
    }

    return { message, sendMessage, inProgress, speechToText };
  },
});
</script>
