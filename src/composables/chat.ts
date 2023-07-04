import { ref, watch, unref } from "vue";

export interface Message {
  role: string;
  content: string;
}

function prompt(): Message[] {
  return [
    {
      role: "assistant",
      content: "Hi! Ask me anything :)",
    },
  ];
}

export function useChat() {
  const bot = ref(localStorage.name);
  const pending = ref(false);

  const history = ref(
    (localStorage.history
      ? JSON.parse(localStorage.history)
      : prompt()) as Message[]
  );

  async function fetchResults() {
    const messages = unref(history);
    const payload: any = {
      bot: bot.value,
      messages,
    };

    const dividerIndex = messages.findIndex((m) => m.role === "divider");

    if (dividerIndex !== -1) {
      payload.messages = messages.slice(dividerIndex + 1);
    }

    if (localStorage.model) {
      payload.model = localStorage.model;
    }

    const options = {
      method: "post",
      mode: "cors",
      credentials: "include",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
    };

    const chat = await fetch("https://chat.homebots.io/chat", options as any);
    return await chat.json();
  }

  function saveHistory(list: Message[]) {
    localStorage.history = JSON.stringify(list);
  }

  function append(message: Message) {
    const newHistory = (history.value = unref(history).concat(message));
    saveHistory(newHistory);
  }

  function removeAt(index: number) {
    const list = unref(history);

    if (list[index]) {
      const newHistory = history.value.filter((m) => m !== list[index]);
      history.value = newHistory;
      saveHistory(newHistory);
    }
  }

  function addDivider() {
    const newHistory = unref(history).filter((m) => m.role !== "divider");
    newHistory.push({ role: "divider", content: "" });

    history.value = newHistory;
    saveHistory(newHistory);
  }

  function resetChat() {
    history.value = [];
    saveHistory([]);
  }

  function setBot(name: string) {
    bot.value = name;
  }

  watch(
    () => bot.value,
    (value) => {
      localStorage.name = value;
      resetChat();
    }
  );

  async function ask(message: string) {
    if (!message.trim() || unref(pending)) return;

    const m = message.trim().toLowerCase();
    if (m === "add divider") {
      addDivider();
      return;
    }

    if (m === "reset") {
      resetChat();
      return;
    }

    const newMessage = { role: "user", content: message };
    append(newMessage);

    pending.value = true;
    const response = await fetchResults();
    append(response);
    pending.value = false;
  }

  return { history, bot, pending, ask, removeAt, setBot };
}
