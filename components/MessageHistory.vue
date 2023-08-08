<template>
  <div class="flex flex-col gap-2">
    <MessageCard
      v-for="(message, index) in props.history"
      :key="index"
      :message="message"
      @remove="$emit('remove', index)"
    />
    <MessageCard
      v-if="props.pending"
      :id="-1"
      :removable="false"
      :message="{ role: 'assistant', content: '...' }"
      class="animate-pulse"
    />
  </div>
</template>
<script>
import { defineComponent } from "vue";
import { useFocusLast } from "../composables/focus-last";
import MessageCard from "./MessageCard.vue";

export default defineComponent({
  emits: ["remove"],
});
</script>

<script setup>
import { onMounted, watch } from "vue";

const props = defineProps({
  history: { type: Array, default: () => [] },
  pending: { type: Boolean, default: false },
});

const { focusLast } = useFocusLast();

watch(props.history, focusLast);
onMounted(focusLast);
</script>
