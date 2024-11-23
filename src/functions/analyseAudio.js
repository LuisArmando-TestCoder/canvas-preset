function getAverage(array) {
    return array.reduce((a, b) => a + b) / array.length
}

function getFrequencies() {
    this.audioArray = new Uint8Array(this.analyser.frequencyBinCount)
    this.analyser.getByteFrequencyData(this.audioArray)
    this.audioArray.average = getAverage(this.audioArray)

    return this.audioArray
}

function getAmplitudes() {
    this.audioArray = new Uint8Array(this.analyser.frequencyBinCount)
    this.analyser.getByteTimeDomainData(this.audioArray)
    this.audioArray.average = getAverage(this.audioArray)

    return this.audioArray
}

export default function analyseAudio(audio) {
    const ctx = new AudioContext()
    const analyser = ctx.createAnalyser()
    const source = ctx.createMediaElementSource(audio)
    let audioArray
    source.connect(analyser)
    analyser.connect(ctx.destination)

    const analyzerBind = {analyser, audioArray}

    return {
        getFrequencies: getFrequencies.bind(analyzerBind),
        getAmplitudes: getAmplitudes.bind(analyzerBind),
        analyser,
        source,
        audioContext: ctx
    }
}