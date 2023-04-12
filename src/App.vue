<template>
  <div class="bg-indigo-900 p-6">
    <chat-history :messages="messages"></chat-history>
  </div>
</template>

<script lang="ts">
import ChatHistory from './components/ChatHistory.vue';

export class ChatService {
  async ask(question: string) {
    if (!question) {
      throw new Error('');
    }

    const options = { method: 'post', mode: 'cors', body: String(question) };
    return fetch('https://chat.homebots.io/chat', options as any).then((x) =>
      x.json()
    );
  }
}

export default {
  name: 'App',
  components: {
    ChatHistory,
  },
  created() {
    this.chat = new ChatService();
  },
  mounted() {},
  data: () => ({
    messages: [
      {
        role: 'assistant',
        content: 'Hi! Ask me anything :)',
      },
    ],
  }),
  methods: {
    async ask(message) {
      const response = await this.chat.ask(this.messages);
      this.messages.push(response);
    },
  },
};
</script>
