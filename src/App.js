import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
    state = {
        time: 50 * 60,
    }

    componentDidMount() {
        this.timer = setInterval(() => {
            const {time} = this.state

            if (time > 1) {
                this.setState({
                    time: time - 1,
                })
            }
            else {
                clearInterval(this.timer)
            }

        }, 1000)
    }

    formatTime(time) {
        const minutes = this.prefix(~~(time / 60))
        const seconds = this.prefix(time % 60)

        return {minutes, seconds}
    }

    prefix(num) {
        return num > 10 ? num + '' : '0' + num
    }

    render() {
        const {minutes, seconds} = this.formatTime(this.state.time)

        return (
            <div className="Time">
                {`${minutes}:${seconds}`}
            </div>
        )
    }
}

export default App;
