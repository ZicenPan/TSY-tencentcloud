import React, { Component } from 'react'
import '../../scss/style.scss'

interface Props {
    data: any
    handleNext: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

interface State {
    num: number
}

export default class Selection extends Component<Props, State> {
    constructor(props: any) {
        super(props)
        this.state = {
            num: 0
        }
    }

    renderItem = (id: number) => {
        return (
            <div className="sel mt-20">
                <div className="d-flex flex-row">
                    <span className="fake-img sel-icon" />
                    <div className="ml-20">
                        <h3>{this.props.data.content[id].title}</h3>
                        <p className="mt-10">{this.props.data.content[id].description}</p>
                    </div>
                </div>
            </div>
        )
    }
    render() {
        return (
            <div className="mt-40">
                <h2>{this.props.data.name}</h2>
                <div className="d-flex justify-content-around flex-wrap mt-20">
                    {this.renderItem(0)}
                    {this.renderItem(1)}
                    {this.renderItem(2)}
                    {this.renderItem(3)}
                    {this.renderItem(4)}
                    {this.renderItem(5)}
                </div>
                <div className="mt-40 ml-at">
                    <button
                        onClick={this.props.handleNext}
                        type="submit"
                        className="btn btn-blue"
                        style={{ left: '70%' }}
                    >
                        Next
                    </button>
                </div>
            </div>
        )
    }
}
