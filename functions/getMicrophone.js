export default onStreaming => {
    navigator.mediaDevices.getUserMedia({audio: true, video: false}).then(stream => {
        const options = {mimeType: 'video/webm;codecs=vp9'};
        const mediaRecorder = new MediaRecorder(stream, options);

        mediaRecorder.addEventListener('dataavailable', onStreaming);

        mediaRecorder.start();
    });
}