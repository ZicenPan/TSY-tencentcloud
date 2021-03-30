import React from 'react'
import { Dustbin } from './Dustbin'
import { Box } from './Box'
import '../../scss/style.scss'

interface Props {
    data: any
    handleNext: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

interface State {
    num: number
    img: any
}

export default class Match extends React.Component<Props, State> {
    constructor(props: any) {
        super(props)
        this.state = {
            num: 0,
            img: ''
        }
    }

    render() {
        console.log(this.props.data)
        const items = this.props.data.content.map((item: any) => {
            if (item.type === 'dustbin') {
                return (
                    <div
                        className="align-self-center"
                        style={{ overflow: 'hidden', clear: 'both', marginLeft: '10px' }}
                    >
                        <Dustbin />
                    </div>
                )
            } else {
                return <p style={{ lineHeight: 2.5 }}>{item.data}</p>
            }
        })
        const boxes = this.props.data.boxes.map((item: any, index: number) => {
            return <Box key={index} name={item.name} />
        })
        return (
            <div>
                <h2 className="mt-160">{this.props.data.name}</h2>
                <div className="mt-40 d-flex flex-row flex-wrap">{items}</div>
                <div
                    className="d-flex justify-content-center mt-80"
                    style={{ overflow: 'hidden', clear: 'both' }}
                >
                    {boxes}
                </div>
            </div>
        )
    }
}
