export default function getDistanceBetween({
    x: x1,
    y: y1
}) {
    return {
        and({
            x: x2,
            y: y2
        }) {
            const [leg1, leg2] = [
                x1 - x2,
                y1 - y2
            ]
            return {
                value: Math.sqrt(Math.abs(leg1 ** 2) + Math.abs(leg2 ** 2)),
                leg1,
                leg2
            }
        }
    }
}