<template>
  <div
    class="rounded-lg shadow-md px-4 py-2 text-gray-800 mb-4 relative"
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

    <div class="flex items-top space-x-4">
      <div class="shrink-0">
        <div
          class="text-indigo-900 font-bold w-12 h-12 rounded-full flex items-center justify-center bg-gray-100 border border-gray-300"
        >
          {{ isAssistant ? 'AI' : 'ME' }}
        </div>
      </div>
      <div>
        <h1 class="text-md font-bold mb-2">
          {{ isAssistant ? 'Jarvis' : 'Me' }}
        </h1>
        <div v-if="!htmlMessage" class="text-base whitespace-pre-wrap">{{ message.content }}</div>
        <div v-else v-html="htmlMessage" class="text-base whitespace-pre-wrap"></div>
      </div>
    </div>
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
      id: {
        type: Number,
        default: -1,
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
