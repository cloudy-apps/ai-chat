<template>
  <div class="flex items-center p-4 bg-white rounded-t-lg mx-4 shadow-md border border-slate-300">
    <textarea
      v-model="message"
      @keydown.enter.prevent="sendMessage"
      class="flex-grow mr-4 resize-none border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-600 focus:border-transparent"
      placeholder="Type your message"
      rows="1"
    ></textarea>
    <button
      @click="sendMessage"
      :disabled="pending"
      :class="pending && 'animate-pulse'"
      class="bg-blue-600 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
    >Send</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  props: {
    pending: { type: Boolean, default: false },
  },
  emits: ['send'],
  setup(_, ctx) {
    const message = ref('');

    function sendMessage() {
      const content = message.value.trim();

      if (content) {
        ctx.emit('send', content);
        message.value = '';
      }
    }

    return { message, sendMessage };
  },
});
</script>
