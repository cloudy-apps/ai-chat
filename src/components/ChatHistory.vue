<template>
  <message-card
    v-for="(message, index) in messages"
    :key="index"
    :message="message"
  />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import type { Message } from "../composables/chat.js";
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
