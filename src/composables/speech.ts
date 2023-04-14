import { ref } from 'vue';

export function useSpeech() {
    const recognition = new webkitSpeechRecognition();
    const output = ref('');

    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = function(event) {
        text.value = event.results[0][0].transcript;
    };

    function start() {
        recognition.start();
    }

    return { start, output };
}