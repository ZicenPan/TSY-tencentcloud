/* eslint-disable */

import React, { Component } from 'react'
import '../../scss/style.scss'

import a from '../../assets/exitIcon.png'

interface Props {
    data: any
    handleNext: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

interface State {
    num: number
    img: any
}

export default class Selection extends Component<Props, State> {
    constructor(props: any) {
        super(props)
        this.state = {
            num: 0,
            img: ''
        }
    }

    renderItem = (id: number, imgName: string) => {
        const requestImageFile = require.context('./../../assets/', true, /.png$/)

        return (
            <div className="sel mt-20">
                <div className="d-flex flex-row">
                    <img
                        src="https://fyp-web-1gdzo8ub179215dc-1304731661.tcloudbaseapp.com/tys-website-assets/companyIcons/Bilibili.png"
                        // src={require(`../../assets/${imgName}.png`)}
                        width="50"
                        height="50"
                        alt="logo1"
                    />
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
                    {this.renderItem(0, 'exitIcon')}
                    {this.renderItem(1, 'exitIcon')}
                    {this.renderItem(2, 'exitIcon')}
                    {this.renderItem(3, 'exitIcon')}
                    {this.renderItem(4, 'exitIcon')}
                    {this.renderItem(5, 'exitIcon')}
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
