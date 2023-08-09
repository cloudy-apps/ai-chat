import { ref } from "vue";

const SpeechRecognition = (window as any).webkitSpeechRecognition;
const enableAudio = ref(false);
const output = ref("");
const inProgress = ref(false);
let recognition: any;

function getRecognition() {
  if (!SpeechRecognition) {
    return null;
  }

  if (recognition) {
    return recognition;
  }

  recognition = new SpeechRecognition();
  recognition.lang = "en-US";
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  recognition.onresult = function (event: any) {
    inProgress.value = false;
    output.value = event.results[0][0].transcript;
  };
}

export function useSpeech() {
  function isAudioSupported() {
    return window.speechSynthesis && SpeechRecognition;
  }

  function toggleAudio() {
    if (isAudioSupported()) {
      enableAudio.value = !enableAudio.value;
    }
  }

  function start() {
    getRecognition()?.start();
    inProgress.value = true;
  }

  function stop() {
    inProgress.value = false;
    getRecognition()?.stop();
  }

  function abort() {
    inProgress.value = false;
    getRecognition()?.abort();
  }

  function speak(text) {
    if (enableAudio.value) {
      const div = document.createElement("div");
      div.innerHTML = text;
      const cleanText = String(div.textContent);
      speechSynthesis.speak(new SpeechSynthesisUtterance(cleanText));
    }
  }

  function isAudioEnabled() {
    return enableAudio.value;
  }

  return {
    start,
    stop,
    abort,
    speak,
    toggleAudio,
    isAudioEnabled,
    isAudioSupported,
    inProgress,
    output,
  };
}
