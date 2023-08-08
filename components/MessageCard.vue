<template>
  <div
    :class="[
      isDivider && 'h-1 shadow border border-gray-300',
      isMe &&
        'rounded shadow-md py-6 px-4 text-gray-800 relative bg-green-100 md:ml-12',
      isAssistant &&
        'rounded shadow-md py-6 px-4 text-gray-800 relative bg-white',
    ]"
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
      <div v-if="!htmlMessage" class="text-sm">
        {{ message.content }}
      </div>
      <div v-else v-html="htmlMessage" class="text-sm html-message"></div>
    </template>
  </div>
</template>

<script setup>
import { onMounted, computed, ref } from "vue";
import toHTML from "https://markdown.jsfn.run/index.mjs";

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

const htmlMessage = ref("");
const isMe = computed(() => props.message.role === "user");
const isDivider = computed(() => props.message.role === "divider");
const isAssistant = computed(() => props.message.role === "assistant");

function removeMessage() {
  emit("remove");
}

async function renderMessage() {
  if (htmlMessage.value) {
    htmlMessage.value = "";
    return;
  }

  htmlMessage.value = await toHTML(props.message.content);
}

function isRichContent() {
  content.includes("```") || content.includes("`") || content.includes('https://')
}

onMounted(() => {
  const content = props.message?.content || "";
  if (isRichContent(content)) {
    renderMessage();
  }
});
</script>

<style>
.html-message pre {
  background-color:  #eee;
  padding: 0.5rem 1rem;
  margin: 0.75rem -1rem;
  overflow-x: scroll;
}
</style>
