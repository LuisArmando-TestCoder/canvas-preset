import getRotation from '../../utils/getRotation.js'

export default function lines() {
    // vector {w = 1, c = '#000', group = [{x,y}], x, y}
    const chosen = {
        group: this.vector.laidGroup || this.vector.group,
        x: (this.vector.x || 0),
        y: (this.vector.y || 0),
        scale: this.vector.scale || 1
    }
    const sizeExists = () => this.vector.size
    setLaidShape.call(this, sizeExists)
    this.ctx.beginPath()
    this.ctx.save()
    placeLine.call(this, sizeExists, chosen)
    paintStroke.call(this)
    this.ctx.restore()
}

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

function getLaidVectorSize(vector) {
    const laidVectorSize = {x: 0, y: 0}
    vector.laidGroup.forEach(({x, y}) => {
        if (x > laidVectorSize.x) laidVectorSize.x = x
        if (y > laidVectorSize.y) laidVectorSize.y = y
    })
    return laidVectorSize
}

function setLaidShape(sizeExists) {
    const IsRotationNumber = () => !isNaN(this.vector.rot)
    const laidGroupExists = () => this.vector.laidGroup
    if (IsRotationNumber() && !sizeExists() && !laidGroupExists()) {
        this.vector.laidGroup = getLaidPoints(this.vector.group)
        this.vector.size = getLaidVectorSize(this.vector)
    }
}

function placeLine(sizeExists, chosen) {
    if (sizeExists()) {
        offsetShapeForRotation.call(this, chosen)
        rotateShape.call(this)
        repositionShapeToOriginalPosition.call(this, chosen)
    }
    if (chosen.group && chosen.group[0]) {
        setFirstLineVector.call(this, chosen)
        setCompleteLine.call(this, chosen)
    }
}

function repositionShapeToOriginalPosition(chosen) {
    this.ctx.translate(
        -(this.temporal.x || chosen.x) -
        (
            this.temporal.size && this.temporal.size.x ||
            this.vector.size.x
        ) / 2 *
        (this.temporal.scale || chosen.scale),
        -(this.temporal.y || chosen.y) -
        (
            this.temporal.size && this.temporal.size.y ||
            this.vector.size.y
        ) / 2 *
        (this.temporal.scale || chosen.scale)
    )
}

function rotateShape() {
    this.ctx.rotate(
        getRotation(
            this.temporal.rot || this.vector.rot
        )
    )
}

function offsetShapeForRotation(chosen) {
    this.ctx.translate(
        (this.temporal.x || chosen.x),
        (this.temporal.y || chosen.y)
    )
}

function setFirstLineVector(chosen) {
    this.ctx.moveTo(
        (
            chosen.group[0].x *
            (this.temporal.scale || chosen.scale)
        ) +
        (this.temporal.x || chosen.x),
        (
            chosen.group[0].y *
            (this.temporal.scale || chosen.scale)
        ) +
        (this.temporal.y || chosen.y),
    )
}

function setCompleteLine(chosen) {
    (this.temporal.group || chosen.group)
    .forEach((dot, i) => {
        if (i) this.ctx.lineTo(
            (
                dot.x *
                (this.temporal.scale || chosen.scale)
            ) +
            (this.temporal.x || chosen.x),
            (
                dot.y *
                (this.temporal.scale || chosen.scale)
            ) +
            (this.temporal.y || chosen.y),
        )
    })
}

function paintStroke() {
    this.ctx.lineWidth = this.temporal.w || this.vector.w
    this.ctx.strokeStyle = this.temporal.c || this.vector.c
    this.ctx.stroke()
}
