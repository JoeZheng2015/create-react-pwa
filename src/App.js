import './App.css'
import React, { Component } from 'react'

const settings = {
    x: 187.5,
    y: 324,
    innerRadius: 108,
    outerRadius: 116.5,
    outerBorder: 4,
    breathInColor: '#3478dd',
    holdColor: '#8c7d76',
    breathOutColor: '#793beb',
    beginDegree: -90,
    smallCircleRadius: 5,
    duration: 10000,
}

class App extends Component {
    render() {
        const {width, height} = window.screen

        return (
            <canvas
                className="Canvas"
                ref={this.canvasDidMount}
                width={width}
                height={height}
                />
        )
    }

    canvasDidMount = (canvas) => {
        this.canvas = canvas
        const ctx = this.ctx = canvas.getContext('2d')
        this.start = performance.now()
        window.requestAnimationFrame(this.draw)
    }

    draw = (timestamp) => {
        const {canvas, ctx, start} = this
        const {x, y, innerRadius, outerRadius, outerBorder, breathInColor, breathOutColor, holdColor, beginDegree, smallCircleRadius, duration} = settings
        const hypotenuse = outerRadius + outerBorder - smallCircleRadius

        ctx.clearRect(0, 0, canvas.width, canvas.height)

        const gradient = ctx.createLinearGradient(
            x + innerRadius / Math.SQRT2,
            y - innerRadius / Math.SQRT2,
            x - innerRadius / Math.SQRT2,
            y + innerRadius / Math.SQRT2
        )

        gradient.addColorStop(0, '#86b4ea')
        gradient.addColorStop(1, '#7a4ee8')
        ctx.arc(x, y, innerRadius, 0, 2 * Math.PI)
        ctx.fillStyle = gradient
        ctx.fill()

        const drawBorder = createDrawBorder({ctx, lineWidth: outerBorder, x, y, radius: outerRadius})
        drawBorder({beginDegree, endDegree: beginDegree + 360 * 0.4, color: breathInColor})
        drawBorder({beginDegree: beginDegree + 360 * 0.4, endDegree: beginDegree + 360 * 0.6, color: holdColor})
        drawBorder({beginDegree: beginDegree + 360 * 0.6, endDegree: beginDegree + 360 * 1, color: breathOutColor})


        drawSmallCircle({ctx, x, y, hypotenuse, degree: beginDegree})
        drawSmallCircle({ctx, x, y, hypotenuse, degree: beginDegree + 360 * 0.4})
        drawSmallCircle({ctx, x, y, hypotenuse, degree: beginDegree + 360 * 0.6})

        drawSmallCircle({ctx, x, y, hypotenuse, degree: beginDegree + 360 * timestamp / duration})


        function drawSmallCircle({ctx, x, y, hypotenuse, degree}) {
            ctx.fillStyle = '#fff'
            ctx.beginPath()
            ctx.arc(x + Math.cos(deg2Rad(degree)) * hypotenuse, y + Math.sin(deg2Rad(degree)) * hypotenuse, smallCircleRadius, 0, 2 * Math.PI)
            ctx.fill()
        }   

        function createDrawBorder({ctx, lineWidth, x, y, radius}) {
            ctx.lineWidth = outerBorder

            function drawBorder({beginDegree, endDegree, color}) {
                ctx.beginPath()
                ctx.arc(x, y, radius, deg2Rad(beginDegree), deg2Rad(endDegree))
                ctx.strokeStyle = color
                ctx.stroke()
            }

            return drawBorder
        }

        function deg2Rad(deg) {
            return deg * Math.PI / 180
        }

        window.requestAnimationFrame(this.draw)
    }
}

export default App;
