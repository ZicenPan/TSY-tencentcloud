import React, { Component } from 'react'

import './Conversation.scss'

import characterImg from "@/assets/Character.png"

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
        let speaker = this.lookupConvo(this.state.num).speaker
        let speakerClassName = speaker==="用户"?"convo-speaker-user":"convo-speaker-others"
        let containerClassName = speaker==="用户"?"convo-container-user":"convo-container-others"
        let characterImgDom = speaker!=="用户"?<img className="conversation-character" src = {characterImg}/>:<div/>
        return (
                <div className="convo-container">
                    <div className={containerClassName}>
                        <button className="convo-speaker"  id={speakerClassName} >
                            <h2 className="text-center">{speaker}</h2>
                        </button>
                        <div>
                            <button onClick={this.nextConvo} type="submit" className="convo-content">
                                <h2>{this.lookupConvo(this.state.num).content}</h2>
                            </button>
                        </div>

                    </div>
                    <div className="mt-40">
                        <h4 className="text-grey-dark text-center">点击空白区域继续</h4>
                    </div>
                    {/* {characterImgDom} */}
                    
                </div>

        )
    }
}

export default Conversation
