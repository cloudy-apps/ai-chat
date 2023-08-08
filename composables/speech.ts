import { ref } from "vue";

const SpeechRecognition = (window as any).webkitSpeechRecognition;

export function useSpeech() {
  const recognition = new SpeechRecognition();
  const output = ref("");
  const inProgress = ref(false);

  recognition.lang = "en-US";
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  recognition.onresult = function (event: any) {
    inProgress.value = false;
    output.value = event.results[0][0].transcript;
  };

  function start() {
    recognition.start();
    inProgress.value = true;
  }

  function stop() {
    inProgress.value = false;
    recognition.stop();
  }

  function abort() {
    inProgress.value = false;
    recognition.abort();
  }

  return { start, stop, abort, inProgress, output };
}
