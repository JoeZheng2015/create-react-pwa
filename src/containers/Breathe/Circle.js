import React, { Component } from 'react'
import {createDrawSmallCircle, createDrawBorder} from './canvasUtils'

export default class Circle extends Component {
    static defaultProps = {
        scale: 1.4,
        innerRadius: 108,
        outerRadius: 116.5,
        outerBorder: 4,
        startDegree: -90,
        smallCircleRadius: 5,
        colorStop1: '#86b4ea',
        colorStop2: '#7a4ee8',
        stopPoints: [
            {
                duration: 4,
                color: '#3478dd',
            },
            {
                duration: 2,
                color: '#8c7d76',
            },
            {
                duration: 4,
                color: '#793beb',
            }
        ]
    }

    animationStartTime = null

    render() {
        return (
            <canvas
                className="CanvasCircle"
                ref={this.didMount}
                />
        )
    }

    didMount = (canvas) => {
        this.init(canvas)
        window.requestAnimationFrame(this.draw)
    }

    init(canvas) {
        this.canvas = canvas
        window.ctx = this.ctx = canvas.getContext('2d')

        const {width, height} = this.computeSize()
        const ratio = this.computeScaleRatio()

        this.setSize(width, height, ratio, this.props.scale)

        Object.assign(this, {canvasHeight: height, canvasWidth: width, ratio})
    }

    computeSize() {
        const {outerBorder, outerRadius} = this.props
        const width = (outerBorder + outerRadius) * 2
        const height = (outerBorder + outerRadius) * 2

        return {width, height}
    }

    computeScaleRatio() {
        const {scale} = this.props
        const devicePixelRatio = window.devicePixelRatio || 1

        return devicePixelRatio * Math.ceil(scale)
    }

    computeCanvasSize(width, height, ratio, scale) {
        const canvasWidth = width * ratio * scale
        const canvasHeight = height * ratio * scale

        return {canvasWidth, canvasHeight}
    }

    setSize(width, height, ratio, scale) {
        const {canvas, ctx} = this

        canvas.width = width * ratio
        canvas.height = height * ratio
        ctx.scale(ratio, ratio)

        canvas.style.width = `${width}px`
        canvas.style.height = `${height}px`
    }

    draw = (timestamp) => {
        const {canvas, ctx, props, canvasWidth, canvasHeight} = this
        const {innerRadius, outerRadius, outerBorder, startDegree, smallCircleRadius, colorStop1, colorStop2, stopPoints} = props
        const x = canvasWidth / 2
        const y = canvasHeight / 2
        const totalDuration = stopPoints.reduce((acc, stopPoint) => acc += stopPoint.duration , 0)
        const length = outerRadius + outerBorder - smallCircleRadius

        ctx.clearRect(0, 0, canvas.width, canvas.height)

        // 画中间的圆
        const gradient = ctx.createLinearGradient(
            x + innerRadius / Math.SQRT2,
            y - innerRadius / Math.SQRT2,
            x - innerRadius / Math.SQRT2,
            y + innerRadius / Math.SQRT2
        )

        gradient.addColorStop(0, colorStop1)
        gradient.addColorStop(1, colorStop2)
        ctx.arc(x, y, innerRadius, 0, 2 * Math.PI)
        ctx.fillStyle = gradient
        ctx.fill()

        // 画边框
        const drawBorder = createDrawBorder({ctx, lineWidth: outerBorder, x, y, radius: outerRadius})
        stopPoints.reduce((durationAcc, stopPoint) => {
            const {duration, color} = stopPoint
            const beginDegree = startDegree + 360 * durationAcc / totalDuration
            durationAcc += duration
            const endDegree = startDegree + 360 * durationAcc / totalDuration
            drawBorder({beginDegree, endDegree, color})

            return durationAcc
        }, 0)

        // 画固定stop的点
        const drawSmallCircle = createDrawSmallCircle({ctx, x, y, radius: smallCircleRadius})
        stopPoints.reduce((durationAcc, stopPoint) => {
            const degree = startDegree + 360 * durationAcc / totalDuration
            drawSmallCircle({length, degree})

            return durationAcc + stopPoint.duration
        }, 0)

        // 让timestamp在0时，开始动画
        
        if (!this.animationStartTime) {
            this.animationStartTime = timestamp
        }
        const elapse = timestamp - this.animationStartTime
        this.props.animationElapse(elapse)

        // 画移动的stop点
        drawSmallCircle({length, degree: startDegree + 360 * elapse / (totalDuration * 1000)})

        this.scaleCircle(elapse)

        window.requestAnimationFrame(this.draw)
    }

    scaleCircle(elapse) {
        const {ctx} = this
        const {scale} = this.props

        const x = (elapse / 1000) % 10
        let ratio

        if (0 <= x && x < 4) {
            ratio = 0.1 * x + 1
        }
        else if (4 <= x && x < 6) {
            ratio = 1.4
        }
        else {
            ratio = -0.1 * x + 2
        }

        ctx.canvas.style.transform = `translate(-50%, -50%) scale(${ratio}, ${ratio})`
    }
}