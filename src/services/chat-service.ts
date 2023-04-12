export class ChatService {
  async ask(question: string) {
    if (!question) {
      throw new Error('');
    }

    const options = { method: 'post', mode: 'cors', body: String(question) };
    return fetch('https://chat.homebots.io/chat', options as any).then((x) =>
      x.json()
    );
  }
}
