<template>
  <MessageCard
    v-for="(message, index) in history"
    :key="index"
    :message="message"
    @remove="$emit('remove', index)"
  />
  <MessageCard
    v-if="pending"
    :id="-1"
    :removable="false"
    :message="{ role: 'assistant', content: '...' }"
    class="animate-pulse"
  />
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { useFocusLast } from "../composables/focus-last.js";

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
