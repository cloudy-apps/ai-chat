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

export class ChatService {
  history = ref(localStorage.history ? JSON.parse(localStorage.history) : prompt());

  async fetch(question: Message, history?: Message[]) {
    const messages = (history || unref(this.history)).concat(question);
    const options = { 
      method: 'post',
      mode: 'cors',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ messages }),
    };

    return fetch('https://chat.homebots.io/chat', options as any).then((x) => x.json());
  }

  async ask(message: string) {
    const history = unref(this.history);
    const newMessage = { role: 'user', content: message };
    history.push(newMessage);
      
    const response = await this.ask(message);
    history.push(response);
    localStorage.history = JSON.stringify(history);
  }
}
