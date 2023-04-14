import { ref } from 'vue';

const SpeechRecognition = (window as any).webkitSpeechRecognition;

export function useSpeech() {
    const recognition = new SpeechRecognition();
    const output = ref('');

    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = function(event: any) {
        output.value = event.results[0][0].transcript;
    };

    function start() {
        recognition.start();
    }

    return { start, output };
}