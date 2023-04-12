<template>
  <div class="bg-indigo-900 p-6">
    <chat-history :messages="messages" />
    <div class="flex">
      <textarea v-model="message"></textarea>
      <button class="shrink-0" @click="onSubmit()">GO</button>
    </div>
  </div>
</template>

<script lang="ts">
import ChatHistory from './components/ChatHistory.vue';
import { Message } from './components/Message.vue';
import { ref, unref } from 'vue';
import { defineComponent } from 'vue';

class ChatService {
  async ask(question: Message, history: Message[] = []) {
    const questions = history.concat(question);
    const options = { method: 'post', mode: 'cors', body: String(questions) };
    return fetch('https://chat.homebots.io/chat', options as any).then((x) => x.json());
  }
}

export default defineComponent({
  name: 'App',
  setup() {
    const chat = new ChatService();
    const message = ref('');
    const messages = ref([
      {
        role: 'assistant',
        content: 'Hi! Ask me anything :)',
      },
    ]);

    async function onSubmit() {
      const response = await ask(unref(message));
      unref(messages).push(response);
      message.value = '';
    }

    async function ask(message: string): Promise<Message> {
      const history = unref(messages);
      const question = { role: 'user', content: message };

      return await chat.ask(question, history);
    }

    return { message, messages, onSubmit };
  },
});
</script>
