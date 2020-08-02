function getLaidPoints(points) {
    const pointsToLaid = JSON.parse(JSON.stringify(points));
    const least = {
        x: Infinity,
        y: Infinity
    };

    pointsToLaid.forEach(({x, y}) => {
        if (x < least.x) least.x = x;
        if (y < least.y) least.y = y;
    });

    pointsToLaid.forEach(vector => {
        vector.x -= least.x;
        vector.y -= least.y;
    });

    return pointsToLaid;
}

function getRotation(rotation) {
    return rotation / 180 * Math.PI
}

function getLaidVectorSize(vector) {
    const laidVectorSize = {x: 0, y: 0}
    if (!vector.laidGroup) vector.laidGroup = getLaidPoints(vector.group)
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
    this.ctx.beginPath()
    this.ctx.save()
    if (!isNaN(this.vector.rot) && !this.vector.size) {
        this.vector.size = getLaidVectorSize(this.vector)
    }
    this.ctx.translate(
        getMidCoord(this.vector, 'x'),
        getMidCoord(this.vector, 'y')
    )
    this.ctx.rotate(getRotation(this.vector.rot))
    this.ctx.translate(
        -getMidCoord(this.vector, 'x'),
        -getMidCoord(this.vector, 'y')
    )
    if (this.vector.group && this.vector.group[0]) {
        this.ctx.moveTo(
            this.vector.group[0].x + (this.vector.x || 0),
            this.vector.group[0].y + (this.vector.y || 0)
        )
        this.vector.group.forEach((dot, i) => {
            if (i) this.ctx.lineTo(
                dot.x + (this.vector.x || 0),
                dot.y + (this.vector.y || 0)
            )
        })
    }
    this.ctx.lineWidth = this.vector.w
    this.ctx.strokeStyle = this.vector.c
    this.ctx.stroke()
    this.ctx.restore()
}
