export function deg2rad (deg) {
    return deg * Math.PI / 180
}

export function createDrawSmallCircle({ctx, x, y, radius}) {
    function drawSmallCircle({length, degree}) {
        ctx.fillStyle = '#fff'
        ctx.beginPath()
        ctx.arc(x + Math.cos(deg2rad(degree)) * length, y + Math.sin(deg2rad(degree)) * length, radius, 0, 2 * Math.PI)
        ctx.fill()
    }

    return drawSmallCircle
} 

export function createDrawBorder({ctx, lineWidth, x, y, radius}) {
    ctx.lineWidth = lineWidth

    function drawBorder({beginDegree, endDegree, color}) {
        ctx.beginPath()
        ctx.arc(x, y, radius, deg2rad(beginDegree), deg2rad(endDegree))
        ctx.strokeStyle = color
        ctx.stroke()
    }

    return drawBorder
}