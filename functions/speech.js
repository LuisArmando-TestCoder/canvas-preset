module.exports = function speech({
    voiceName = 'Google UK English Male',
    rate = 0.85,
    pitch = 0.75
}) {
    /* Use example:
     *
     * speech({}).talk('Hi, I am Alfred');;
     *
     */
    const synth = window.speechSynthesis;
    let voices = synth.getVoices();
    let onEnd;

    // chrome
    synth.onvoiceschanged = () => voices = synth.getVoices();

    return {
        talk(text) {
            if (!synth.speaking) {
                const utterance = new SpeechSynthesisUtterance(text);
                utterance.voice = voices.find(voice => voiceName === voice.name);
                utterance.rate = rate;
                utterance.pitch = pitch;
                if (onEnd) utterance.onend = onEnd;
                synth.speak(utterance);
            }
        },
        voices: () => voices,
        isSpeaking: () => synth.speaking,
        onEnd: callback => onEnd = callback // gets redefined each time it is called
    }
}