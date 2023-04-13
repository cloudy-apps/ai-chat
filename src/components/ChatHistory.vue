<template>
  <message-card
    v-for="(message, index) in messages"
    :key="index"
    :message="message"
  />
</template>

<script lang="ts">
import type { Message } from "../services/chat-service.js";
import { defineComponent } from "vue";
import MessageCard from "./MessageCard.vue";

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
