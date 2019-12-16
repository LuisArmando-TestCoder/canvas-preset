module.exports = function setFullScreen({
    element,
    trigger,
    callback
}) {
    // setFullScreen(btn, 'click');
    const {
        documentElement: doc
    } = document;
    const rfs = doc.requestFullScreen ||
        doc.webkitRequestFullScreen ||
        doc.mozRequestFullScreen ||
        doc.msRequestFullScreen;
    const ifs = () => document.isFullScreen ||
        document.webkitIsFullScreen ||
        document.mozIsFullScreen;
    element.addEventListener('click', () => {
        if (!ifs()) rfs.call(doc);
        else document.exitFullscreen();
        if (callback) callback(ifs());
    });
};