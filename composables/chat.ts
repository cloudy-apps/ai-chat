import { ref, watch, unref, onMounted } from "vue";
import { useEnv } from "./env";
import { useSpeech } from "./speech";
import toHTML from "https://markdown.jsfn.run/index.mjs";

const cors: RequestInit = {
  mode: "cors",
  credentials: "include",
};

export interface Message {
  role: string;
  content: string;
  html?: string;
}

function prompt(): Message[] {
  return [
    {
      role: "assistant",
      content: "Hi! Ask me anything :)",
    },
  ];
}

const pending = ref(false);

export function useChat() {
  const { getEnv } = useEnv();
  const { speak } = useSpeech();
  const bot = ref(localStorage.name);
  const bots = ref([]);

  const history = ref(
    (localStorage.history
      ? JSON.parse(localStorage.history)
      : prompt()) as Message[]
  );

  async function fetchBots() {
    const response = await fetch(new URL("/bots", getEnv("BOT_API")), cors);
    bots.value = await response.json();
  }

  async function fetchResults(): Promise<Message> {
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

    const options: RequestInit = {
      ...cors,
      method: "post",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
    };

    const chat = await fetch(new URL("/chat", getEnv("BOT_API")), options);
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
    localStorage.name = name;
  }

  onMounted(fetchBots);

  async function ask(message: string) {
    if (!message.trim() || unref(pending)) return;

    const m = message.trim().toLowerCase();
    if (m === "add divider" || m === "new topic") {
      addDivider();
      return;
    }

    if (m === "reset" || m === "new chat") {
      resetChat();
      return;
    }

    const newMessage = { role: "user", content: message, html: "" };
    if (isRichContent(message)) {
      newMessage.html = await toHTML(message);
    }

    append(newMessage);

    pending.value = true;
    const response = await fetchResults();
    const responseText = response.content;

    if (isRichContent(responseText)) {
      response.html = await toHTML(responseText);
    }

    append(response);
    pending.value = false;

    speak(responseText);
  }

  function isRichContent(content) {
    return (
      content.includes("```") ||
      content.includes("`") ||
      content.includes("https://")
    );
  }

  return { history, bot, bots, pending, ask, removeAt, setBot };
}
