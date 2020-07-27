function getRotation(rotation) {
    return rotation / 180 * Math.PI
}

function getLaidVectorSize(vector) {
    const laidVectorSize = {x: 0, y: 0}
    if (!vector.laidGroup) vector.laidGroup = vector.group
    vector.laidGroup.forEach(({x, y}) => {
        if (x > laidVectorSize.x) laidVectorSize.x = x
        if (y > laidVectorSize.y) laidVectorSize.y = y
    })
    return laidVectorSize
}

function getMidCoord(vector, key) {
    return vector.size[key] / 2 + (vector[key] || 0)
}

export default function render(vector) {
    return {
        lines: () => {
            // vector {w = 1, c = '#000', group = [{x,y}], x, y}
            this.ctx.beginPath()
            this.ctx.save()
            if (vector.rot && !vector.size) {
                vector.size = getLaidVectorSize(vector)
            }
            this.ctx.translate(
                getMidCoord(vector, 'x'),
                getMidCoord(vector, 'y')
            )
            this.ctx.rotate(getRotation(vector.rot))
            this.ctx.translate(
                -getMidCoord(vector, 'x'),
                -getMidCoord(vector, 'y')
            )
            if (vector.group && vector.group[0]) {
                this.ctx.moveTo(
                    vector.group[0].x + (vector.x || 0),
                    vector.group[0].y + (vector.y || 0)
                )
                vector.group.forEach((dot, i) => {
                    if (i) this.ctx.lineTo(
                        dot.x + (vector.x || 0),
                        dot.y + (vector.y || 0)
                    )
                })
            }
            this.ctx.lineWidth = vector.w
            this.ctx.strokeStyle = vector.c
            this.ctx.stroke()
            this.ctx.restore()
        },
        rect: () => {
            this.ctx.beginPath()
            this.ctx.save()
            this.ctx.translate(vector.x + vector.w / 2, vector.y + vector.h / 2)
            this.ctx.rotate(getRotation(vector.rot))
            this.ctx.fillStyle = vector.c
            this.ctx.fillRect(-vector.w / 2, -vector.h / 2, vector.w, vector.h)
            this.ctx.restore()
        },
        arc: () => {
            this.ctx.beginPath()
            this.ctx.fillStyle = vector.c
            this.ctx.arc(vector.x, vector.y, vector.r, 0, Math.PI * 2)
            this.ctx.fill()
        },
        img: () => {
            this.ctx.save()
            this.ctx.translate(vector.x + vector.w / 2, vector.y + vector.h / 2)
            this.ctx.rotate(getRotation(vector.rot))
            if (vector.img.complete) {
                this.ctx.drawImage(vector.img, -vector.w / 2, -vector.h / 2, vector.w, vector.h)
            } else {
                this.ctx.fillRect(-vector.w / 2, -vector.h / 2, vector.w, vector.h)
            }
            this.ctx.fillStyle = vector.c
            this.ctx.restore()
        },
        txt: () => {
            this.ctx.beginPath()
            this.ctx.fillStyle = vector.c
            this.ctx.font = vector.font
            this.ctx.fillText(vector.txt, vector.x, vector.y)
        }
    }
}