<template>
  <div
    class="rounded-lg shadow-md p-4 text-gray-800 mb-4 relative"
    :class="(isAssistant && 'bg-blue-100 ml-12') || 'bg-white'"
  >
    <div class="flex absolute top-0 right-0 mr-2 mt-1">
      <button class=" focus:outline-none" @click="renderMessage">
        <span class="material-icons text-blue-500 focus:text-blue-600">visibility</span>
      </button>
      <button class=" focus:outline-none" @click="removeMessage">
        <span class="material-icons text-gray-500 focus:text-gray-600">close</span>
      </button>
    </div>
    <h1 class="font-bold mb-2">{{ isAssistant ? 'Jarvis' : 'Me' }}</h1>
    <div v-if="!htmlMessage">{{ message.content }}</div>
    <div v-else v-html="htmlMessage" class="whitespace-pre-wrap"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    message: {
      type: Object,
      required: false,
      default: () => ({ role: "", content: "" }),
    },
  },
  data: () => ({ htmlMessage: '' }),
  computed: {
    isMe() {
      return this.message.role === "user";
    },
    isAssistant() {
      return this.message.role === "assistant";
    },
  },
  methods: {
    removeMessage() {
      this.$emit("remove");
    },
    renderMessage() {
      if (this.htmlMessage) {
        this.htmlMessage = '';
        return;
      }

      fetch('https://markdown.jsfn.run/', {
        mode: 'cors',
        method: 'post',
        body: this.message.content
      })
        .then(x => x.text())
        .then(html => this.htmlMessage = html);
    }
  },
});
</script>
