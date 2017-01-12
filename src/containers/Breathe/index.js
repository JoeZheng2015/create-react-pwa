import './index.css'
import React, { Component } from 'react'
import Circle from './Circle'
import {createCounter, second2minute, formatNumber} from '../../utils/helpers'

export default class Breathe extends Component {
    state = {
        elapse: 0,
    }

    render() {
        const {elapse} = this.state
        const {minute, second} = second2minute(elapse)

        return (
            <div className="Breathe">
                <div className="elapse">
                    <span className="minute">{minute}</span>
                    <span className="second">{formatNumber(second)}</span>
                </div>
                <Circle
                    animationElapse={this.setElapse}
                    />
            </div>
        )
    }

    setElapse = (elapse) => {
        this.setState({
            elapse: ~~(elapse / 1000),
        })
    }
}