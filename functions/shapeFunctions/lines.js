function setLeastVector(pointsToLaid, least) {
    pointsToLaid.forEach(({x, y}) => {
        if (x < least.x) least.x = x
        if (y < least.y) least.y = y
    })
}

function laidVector(pointsToLaid, least) {
    pointsToLaid.forEach(vector => {
        vector.x -= least.x
        vector.y -= least.y
    })
}

function getLaidPoints(points) {
    const pointsToLaid = JSON.parse(JSON.stringify(points))
    const least = {
        x: Infinity,
        y: Infinity
    }

    setLeastVector(pointsToLaid, least)

    laidVector(pointsToLaid, least)

    return pointsToLaid
}

function getRotation(rotation) {
    return rotation / 180 * Math.PI
}

function getLaidVectorSize(vector) {
    const laidVectorSize = {x: 0, y: 0}
    vector.laidGroup.forEach(({x, y}) => {
        if (x > laidVectorSize.x) laidVectorSize.x = x
        if (y > laidVectorSize.y) laidVectorSize.y = y
    })
    return laidVectorSize
}

function getMidCoord(vector, key) {
    return vector.size[key] / 2 + (vector[key] || 0)
}

export default function lines() {
    // vector {w = 1, c = '#000', group = [{x,y}], x, y}
    const IsRotationNumber = () => !isNaN(this.vector.rot)
    const sizeExists = () => this.vector.size
    const laidGroupExists = () => this.vector.laidGroup
    const chosen = {
        group: this.vector.laidGroup || this.vector.group,
        x: (this.vector.x || 0),
        y: (this.vector.y || 0),
        scale: this.vector.scale || 1
    }
                
    this.ctx.beginPath()
    this.ctx.save()
    if (IsRotationNumber() && !sizeExists() && !laidGroupExists()) {
        this.vector.laidGroup = getLaidPoints(this.vector.group)
        this.vector.size = getLaidVectorSize(this.vector)
    }
    if (sizeExists()) {
        this.ctx.translate(
            getMidCoord(this.vector, 'x'),
            getMidCoord(this.vector, 'y')
        )
        this.ctx.rotate(getRotation(this.vector.rot))
        this.ctx.translate(
            -getMidCoord(this.vector, 'x'),
            -getMidCoord(this.vector, 'y')
        )
    }
    if (chosen.group && chosen.group[0]) {
        this.ctx.moveTo(
            (chosen.group[0].x * chosen.scale) + chosen.x,
            (chosen.group[0].y * chosen.scale) + chosen.y,
        )
        chosen.group.forEach((dot, i) => {
            if (i) this.ctx.lineTo(
                (dot.x * chosen.scale) + chosen.x,
                (dot.y * chosen.scale) + chosen.y,
            )
        })
    }
    this.ctx.lineWidth = this.vector.w
    this.ctx.strokeStyle = this.vector.c
    this.ctx.stroke()
    this.ctx.restore()
}
