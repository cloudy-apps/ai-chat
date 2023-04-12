export interface Message {
  role: string;
  content: string
}

export class ChatService {
  async ask(question: Message, history: Message[] = []) {
    const messages = history.concat(question);
    const options = { method: 'post', mode: 'cors', body: JSON.stringify({ messages }) };

    return fetch('https://chat.homebots.io/chat', options as any).then((x) => x.json());
  }
}
