export default function analyseAudio(audio) {
    const ctx = new AudioContext();
    const analyser = ctx.createAnalyser();
    const source = ctx.createMediaElementSource(audio);
    let audioArray;
    source.connect(analyser);
    analyser.connect(context.destination);

    function getAverage(array) {
        return array.reduce((a, b) => a + b) / array.length;
    }

    function getFrequency() {
        audioArray = new Uint8Array(analyser.frequencyBinCount);
        analyser.getByteFrequencyData(audioArray);
        return {
            array: audioArray,
            average: getAverage(audioArray),
        };
    }

    function getAmplitude() {
        audioArray = new Uint8Array(analyser.frequencyBinCount);
        analyser.getByteTimeDomainData(audioArray);
        return {
            array: audioArray,
            average: getAverage(audioArray),
        };
    }
    return {
        getFrequency,
        getAmplitude,
    };
};