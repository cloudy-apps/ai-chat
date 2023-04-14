import { ref, unref } from 'vue';

export interface Message {
  role: string;
  content: string
}

const prompt = () => [
  {
    role: 'assistant',
    content: 'Hi! Ask me anything :)',
  },
];


export function useChat() {
  const history = ref(localStorage.history ? JSON.parse(localStorage.history) : prompt());
  const pending = ref(false);

  async function fetchResults() {
    const messages = unref(history);
    const payload = { messages };

    if (localStorage.model) {
      payload.model = localStorage.model;
    }

    const options = {
      method: 'post',
      mode: 'cors',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(payload),
    };

    return fetch('https://chat.homebots.io/chat', options as any).then((x) => x.json());
  }

  function append(message: Message) {
    const newHistory = history.value = unref(history).concat(message);
    localStorage.history = JSON.stringify(newHistory);
  }

  async function ask(message: string) {
    if (!message.trim() || unref(pending)) return;

    const newMessage = { role: 'user', content: message };
    append(newMessage);
    
    pending.value = true;
    const response = await fetchResults();
    append(response);
    pending.value = false;
  }

  return { history, pending, ask };
}