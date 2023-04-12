<template>
  <div>
    <h1 class="mx-4">Chat</h1>
    <Message
      v-for="(message, index) in messages"
      :key="index"
      :message="message"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Message from "./Message.vue";

export default defineComponent({
  name: "ChatHistory",
  components: {
    Message,
  },
  props: {
    messages: {
      type: Array,
      required: false,
      default: () => [],
    },
  },
});
</script>
