const upperFirst = (word) => word.split('').map((l, i) => !i ? l.toUpperCase() : l).join('');

module.exports = upperFirst;