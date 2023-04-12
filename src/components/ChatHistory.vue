<template>
  <div>
    <message-card
      v-for="(message, index) in messages"
      :key="index"
      :message="message"
    />
  </div>
</template>

<script lang="ts">
import type { Message } from "../services/chat-service.js";
import { defineComponent } from "vue";
import MessageCard from "./Message.vue";

export default defineComponent({
  components: {
    MessageCard,
  },
  props: {
    messages: {
      type: Array<Message>,
      required: false,
      default: () => [],
    },
  },
});
</script>
