<template>
  <div
    :class="[
      isDivider && 'h-1 shadow mb-4 border border-gray-300',
      isAssistant &&
        'rounded-lg shadow-md py-6 px-4 text-gray-800 mb-4 relative bg-green-100 ml-12',
      isMe &&
        'rounded-lg shadow-md py-6 px-4 text-gray-800 mb-4 relative bg-white',
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

<script>
import { onMounted, ref } from "vue";
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

const htmlMessage = ref("");
const isMe = computed(() => props.message.role === "user");
const isDivider = computed(() => props.message.role === "divider");
const isAssistant = computed(() => props.message.role === "assistant");

function removeMessage() {
  this.$emit("remove");
}

async function renderMessage() {
  if (htmlMessage.value) {
    htmlMessage.value = "";
    return;
  }

  htmlMessage.value = await toHTML(this.message.content);
}

onMounted(() => {
  if (props.message.includes("```")) {
    renderMessage();
  }
});
</script>
