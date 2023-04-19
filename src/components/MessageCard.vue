<template>
  <div
    class="rounded-lg shadow-md px-4 py-2 text-gray-800 mb-4 relative"
    :class="(isAssistant && 'bg-blue-100 ml-12') || 'bg-white'"
  >
    <button
      class="absolute top-0 right-0 mr-2 mt-1 focus:outline-none"
      @click="removeMessage"
    >
      <i class="material-icons text-gray-500 focus:text-gray-600">close</i>
    </button>
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
        <div class="text-base whitespace-pre-wrap">{{ message.content }}</div>
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
        this.$emit("remove", this.id);
      },
    },
  });
</script>
