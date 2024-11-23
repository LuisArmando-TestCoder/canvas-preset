export default function setFullScreen({
    element,
    triggerBy = 'click',
    callback,
    wrapper
}) {

    const {
        documentElement: doc
    } = document

    const wrapperElement = (wrapper || doc)

    const rfs = wrapperElement.requestFullScreen ||
        wrapperElement.webkitRequestFullScreen ||
        wrapperElement.mozRequestFullScreen ||
        wrapperElement.msRequestFullScreen

    const ifs = () => document.isFullScreen ||
        document.webkitIsFullScreen ||
        document.mozIsFullScreen

    element.addEventListener(triggerBy, (e) => {
        if (!ifs()) rfs.call(wrapperElement)
        else document.exitFullscreen()
        if (callback) callback(ifs(), e)
    })
}