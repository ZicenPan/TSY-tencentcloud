import React, { Component } from 'react'

interface Props {
    data: Array<any>
    id: number
    handleNext: Function
}

interface State {
    num: number
}

class Conversation extends Component<Props, State> {
    constructor(props: any) {
        super(props)
        this.state = {
            num: 0
        }
    }

    nextConvo = () => {
        this.setState(() => ({
            num: this.state.num + 1
        }))

        if (this.state.num >= this.props.data.length - 1) {
            this.props.handleNext()
        }
    }

    lookupConvo = (id: number) => {
        if (!this.props.data || !this.props.data[id]) {
            return {
                name: '...'
            }
        }
        return this.props.data[id]
    }

    render() {
        return (
            <div className="convo-container">
                <div className="btn convo-speaker">
                    <h2>{this.lookupConvo(this.state.num).speaker}</h2>
                </div>
                <div>
                    <button onClick={this.nextConvo} type="submit" className="convo-content">
                        <h2>{this.lookupConvo(this.state.num).content}</h2>
                    </button>
                </div>
                <div className="mt-40">
                    <h4 className="text-grey-dark text-center">点击空白区域继续</h4>
                </div>
            </div>
        )
    }
}

export default Conversation
