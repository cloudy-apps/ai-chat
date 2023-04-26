<template>
  <div
    :class="[
      isDivider && 'h-1 shadow mb-4 border border-gray-300',
      isAssistant && 'rounded-lg shadow-md py-6 px-4 text-gray-800 mb-4 relative bg-blue-100 ml-12',
      isMe && 'rounded-lg shadow-md py-6 px-4 text-gray-800 mb-4 relative bg-white'
    ]"
  >
    <template v-if="!isDivider">
      <div class="flex absolute top-0 right-0 mr-2 mt-2 text-gray-500">
        <button class="focus:outline-none" @click="renderMessage">
          <span class="material-icons focus:text-gray-600">visibility</span>
        </button>
        <button
          v-if="removable"
          class="focus:outline-none"
          @click="removeMessage"
        >
          <span class="material-icons focus:text-gray-600">close</span>
        </button>
      </div>
      <div v-if="!htmlMessage" class="text-sm">{{ message.content }}</div>
      <div v-else v-html="htmlMessage" class="whitespace-pre-wrap"></div>
    </template>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from "vue";

  export default defineComponent({
    props: {
      removable: {
        type: Boolean,
        default: true,
      },
      message: {
        type: Object,
        required: false,
        default: () => ({ role: "", content: "" }),
      },
    },
    data: () => ({ htmlMessage: "" }),
    computed: {
      isMe() {
        return this.message.role === "user";
      },
      isDivider() {
        return this.message.role === "divider";
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
          this.htmlMessage = "";
          return;
        }

        fetch("https://markdown.jsfn.run/", {
          mode: "cors",
          method: "post",
          body: this.message.content,
        })
          .then((x) => x.text())
          .then((html) => (this.htmlMessage = html));
      },
    },
  });
</script>
