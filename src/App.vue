<template>
  <div class="bg-indigo-900 p-6">
    <chat-history :messages="messages"></chat-history>
  </div>
</template>

<script>
import ChatHistory from "./components/ChatHistory.vue";

export default {
  name: "App",
  components: {
    ChatHistory,
  },
  data: () => ({
    messages: [
      {
        from: "Other",
        message: "is me",
        isMe: false,
      },
      {
        from: "You",
        message: "is me",
        isMe: true,
      },
    ],
  }),
};
</script>
