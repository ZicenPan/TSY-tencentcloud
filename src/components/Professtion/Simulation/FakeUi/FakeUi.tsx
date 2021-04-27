import React from "react";


import "@/scss/style.scss";
import "./FakeUi.scss";
import { url } from "node:inspector";

interface Props {
    data:any
}

interface State {
    num: number
}

export default class FakeUi extends React.Component<Props, State> {
  constructor(props: any) {
    super(props)
    this.state = {
        num: 0,
    };

    this.handleHitArea = this.handleHitArea.bind(this)
}
    handleHitArea() {
        
        this.setState({
            num: this.state.num + 1,
        });
    }   

    render() {
        
        let hitArea = <div/>
        if (this.props.data[this.state.num].hit_flag === 1) {
            const hitLeft = this.props.data[this.state.num].offset_left
            const hitTop = this.props.data[this.state.num].offset_top
            const width = this.props.data[this.state.num].width
            const height = this.props.data[this.state.num].height

            const fakeUiHitStyle =
            {
                position: 'absolute' as 'absolute',
                left: hitLeft.toString()+'%',
                top: hitTop.toString()+'%',
                width: width.toString()+'%',
                height: height.toString()+'%',
                zIndex: 9999,
                opacity: 0.5,
                cursor: 'pointer',
                backgroundColor: 'blue',
            }
    
            hitArea = <div style={fakeUiHitStyle} onClick={this.handleHitArea}/>
        }
        return (
            <div className="fakeui-container">
                <img className="fakeui-ui" src = {this.props.data[this.state.num].url}/>

                    {hitArea}

                
            </div>
        )
    }
}