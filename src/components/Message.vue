<template>
  <div
    class="rounded-lg shadow-md p-4 text-gray-800 mb-4"
    :class="(message.isMe && 'bg-white') || 'ml-10 bg-blue-100'"
  >
    <div class="flex items-center space-x-4">
      <div class="shrink-0">
        <div
          class="h-12 w-12 rounded-full bg-gray-100 border border-slate-300"
        ></div>
      </div>
      <div>
        <h1 class="text-md font-bold mb-2">{{ message.from }}</h1>
        <p class="text-base">{{ message.message }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Message",
  props: {
    message: {
      type: Object,
      required: false,
      default: () => ({}),
    },
  },
});
</script>
