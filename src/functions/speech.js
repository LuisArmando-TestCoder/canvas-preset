export default function speech({
    voiceName = 'Google UK English Male',
    rate = 0.85,
    pitch = 0.75,
    lang = 'en-US'
}) {
    /* Use example:
     *
     * speech({}).listen(transcript => Result.innerText = transcript)
     *
     */
    const recognition = new (window.speechRecognition || window.webkitSpeechRecognition)()
    recognition.continuous = true
    recognition.interimResult = false
    recognition.lang = lang
    /* Use example:
     *
     * speech({}).talk('Hi, I am Alfred')
     *
     */
    const synth = window.speechSynthesis
    let voices = synth.getVoices()
    let onEnd

    // chrome
    synth.onvoiceschanged = () => voices = synth.getVoices()

    return {
        listen(callback) {
            if (!recognition.isRecognizing) {
                recognition.start()
                recognition.onresult = (event) => {
                    const transcript = event.results[event.resultIndex][0].transcript
                    callback(transcript, event)
                }
                recognition.onspeechstart = () => recognition.isRecognizing = true
                recognition.onspeechend = () => recognition.isRecognizing = false
            }
            return {
                    stopAt(time) {
                        window.setTimeout(recognition.stop, time)
                    },
            }
        },
        talk(text) {
            if (!synth.speaking) {
                const utterance = new SpeechSynthesisUtterance(text)
                utterance.voice = voices.find(voice => voiceName === voice.name)
                utterance.rate = rate
                utterance.pitch = pitch
                if (onEnd) utterance.onend = onEnd
                synth.speak(utterance)
            }
        },
        voices: () => voices,
        isSpeaking: () => synth.speaking,
        onEnd: callback => onEnd = callback // gets redefined each time it is called
    }
}