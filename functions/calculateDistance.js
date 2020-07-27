export default function calculateDistance(obj1, obj2) {
    const x = obj2.x - obj1.x
    const y = obj2.y - obj1.y
    const distance = x ** 2 + y ** 2 // eslint-disable-line
    return distance
}