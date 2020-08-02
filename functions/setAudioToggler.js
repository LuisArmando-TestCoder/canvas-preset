export default function setAudioToggle({
    toggler = window,
    triggerBy = 'click',
    audio,
    src
}, callback) {
    const chosenAudio = audio || new Audio()
    chosenAudio.crossOrigin = 'anonymous'
    chosenAudio.src = src
    chosenAudio.addEventListener('canplay', () => {
        toggler.addEventListener(triggerBy, () => {
            if (callback) callback(chosenAudio)
            if (chosenAudio.paused) return chosenAudio.play()
            chosenAudio.pause()
        })
    })
}