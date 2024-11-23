const upperFirst = (word) => word.split('').map((l, i) => !i ? l.toUpperCase() : l).join('')

export default upperFirst