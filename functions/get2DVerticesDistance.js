export default function get2DVerticesDistance(obj1, obj2) {
    const x = obj2.x - obj1.x
    const y = obj2.y - obj1.y
    const distance = x ** 2 + y ** 2
    return Math.sqrt(distance)
}