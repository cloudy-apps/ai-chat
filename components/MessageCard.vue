<template>
  <div
    :class="[
      isDivider && 'h-1 shadow border border-gray-300',
      isMe &&
        'rounded shadow-md py-6 px-4 text-gray-800 relative bg-green-100 md:ml-12',
      isAssistant &&
        'rounded shadow-md py-6 px-4 text-gray-800 relative bg-white',
    ]"
    @click="onMessageClick"
  >
    <template v-if="!isDivider">
      <div class="absolute top-0 right-0 mr-1 mt-1 text-gray-400">
        <button
          v-if="removable"
          class="focus:outline-none focus:text-gray-600/"
          @click="removeMessage"
        >
          <span class="material-icons">close</span>
        </button>
      </div>
      <div v-html="message.html || message.content" class="text-sm html-message"></div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = defineProps({
  removable: {
    type: Boolean,
    default: true,
  },
  message: {
    type: Object,
    required: false,
    default: () => ({ role: "", content: "" }),
  },
});

const emit = defineEmits(["remove"]);

const isMe = computed(() => props.message.role === "user");
const isDivider = computed(() => props.message.role === "divider");
const isAssistant = computed(() => props.message.role === "assistant");

function removeMessage() {
  emit("remove");
}

function onMessageClick(event: MouseEvent) {
  const src = event.target as any;
  if (src.nodeName === "A") {
    const href = (src as HTMLAnchorElement).href?.toString() ?? "";
    if (href.startsWith("http:") || href.startsWith("https:")) {
      event.preventDefault();
      window.open(href, "_blank");
    }
  }
}
</script>

<style>
.html-message pre {
  background-color:  #eee;
  padding: 0.5rem 1rem;
  margin: 0.75rem -1rem;
  overflow-x: scroll;
}
.html-message a[href] {
  color:  #2196F3;
  text-decoration: underline;
}
</style>
