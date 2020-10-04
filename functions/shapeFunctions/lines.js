import getRotation from '../../utils/getRotation.js'

export default function lines(groupTemporalVectorCallback) {
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
    placeLine.call(
        {
            ...this,
            groupTemporalVectorCallback
        },
        sizeExists,
        chosen
    )
    fillShape.call(this)
    paintStroke.call(this)
    this.ctx.restore()
}

function fillShape() {
    if (this.vector.fill || this.temporal.fill) {
        this.ctx.fillStyle = this.temporal.fill || this.vector.fill
        this.ctx.fill()
    }
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
    const IsRotationNumber = () => !isNaN(this.temporal.rotation || this.vector.rotation)
    const laidGroupExists = () => this.vector.laidGroup
    if (IsRotationNumber() && !sizeExists() && !laidGroupExists()) {
        this.vector.laidGroup = getLaidPoints(this.temporal.group || this.vector.group)
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
            this.temporal.rotation || this.vector.rotation
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
    const chosenFirst = this.groupTemporalVectorCallback &&
        this.groupTemporalVectorCallback(chosen.group[0], 0) ||
        chosen.group[0]
    setVectorInLine.call(
        {...this, chosen},
        chosenFirst,
        'moveTo'
    )
}

function setCompleteLine(chosen) {
    [...(this.temporal.group || chosen.group)].splice(1)
    .forEach((dot, i) => {
        const chosenDot = this.groupTemporalVectorCallback &&
            this.groupTemporalVectorCallback(dot, i + 1) || dot
        setVectorInLine.call(
            {...this, chosen},
            chosenDot,
            'lineTo'
        )
    })
}

function setVectorInLine(chosenDot, methodName) {
    this.ctx[methodName](
        (
            chosenDot.x *
            (this.temporal.scale || this.chosen.scale)
        ) +
        (this.temporal.x || this.chosen.x),
        (
            chosenDot.y *
            (this.temporal.scale || this.chosen.scale)
        ) +
        (this.temporal.y || this.chosen.y),
    )
}

function paintStroke() {
    const canPaintStroke = this.temporal.thickness ||
        this.vector.thickness &&
        this.temporal.color ||
        this.vector.color
    if (canPaintStroke) {
        this.ctx.lineWidth = this.temporal.thickness || this.vector.thickness
        this.ctx.strokeStyle = this.temporal.color || this.vector.color
        this.ctx.stroke()
    }
}
