module.exports = function renderGroup(type, array, call) {
    return array.forEach((obj, i) => {
        if (call) call(obj, i);
        render(obj)[type]();
    });
};