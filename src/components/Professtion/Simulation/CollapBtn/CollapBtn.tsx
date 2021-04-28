import React from 'react'
import '@/scss/style.scss'
import {seachLogoUrl} from "../../../../assets/cdnUrlConfig"

import './CollapBtn.scss'
import { ThisTypeNode } from 'typescript'
interface Props {
    name: string
    content: string
}

interface State {
    display: boolean
}

class CollapBtn extends React.Component<Props, State> {
    constructor(props: any) {
        super(props)
        this.state = {
            display: false
        }
    }

    handleClk = (event: any) => {
        event.preventDefault()
        this.setState({
            display: !this.state.display
        })
    }
    displayC = () => {
        if (this.state.display) {
            let content = this.props.content;
            let lines = content.split('-');
            let ulist = [];
            if(lines.length === 1) { // Not a list
                return <div className="CollapBtn-content">{this.props.content}</div>
            } else {
                for(let line of lines) {
                    if(line.length === 0)
                        continue;
                    let line_content =  line.split("：");
                    ulist.push(
                    <li className="Ulist" key={line_content[0]}>
                        <div className="lihead">{line_content[0] + "："}</div>{line_content[1]}
                    </li>);
                }
                return <div className="CollapBtn-content"><ul>{ulist}</ul></div>
            }
        }
        return
    }
    render() {
        return (
            <div className="mt-40 d-flex flex-column CollapBtn-container">
                <button onClick={this.handleClk} type="submit" className="btn btn-clp">
                    <h2>{this.props.name}</h2>
                </button>
                <span><img src={seachLogoUrl} alt="seach btn"/></span>
                <div className="mt-40 ">{this.displayC()}</div>
            </div>
        )
    }
}

export default CollapBtn
