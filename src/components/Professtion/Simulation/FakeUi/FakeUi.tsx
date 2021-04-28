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

    this.handleHit = this.handleHit.bind(this)
}
    handleHit() {
        if (this.state.num >= this.props.data.length - 1)
            return
        
            this.setState({
                num: this.state.num + 1,
            });
    }   

    render() {
        let width = 300
        if ( this.props.data[this.state.num].hasOwnProperty("width"))
            width = this.props.data[this.state.num].width
        let hitArea = <div/>
        if (this.props.data[this.state.num].hit_flag === 1) {
            const hitLeft = this.props.data[this.state.num].offset_left
            const hitTop = this.props.data[this.state.num].offset_top
            const hit_width = this.props.data[this.state.num].hit_width
            const hit_height = this.props.data[this.state.num].hit_height
            

            const fakeUiHitStyle =
            {
                position: 'absolute' as 'absolute',
                left: hitLeft.toString()+'%',
                top: hitTop.toString()+'%',
                width: hit_width.toString()+'%',
                height: hit_height.toString()+'%',
                zIndex: 9999,
                opacity: 0.5,
                cursor: 'pointer',
                backgroundColor: 'blue',
            }
    
            hitArea = <div style={fakeUiHitStyle} onClick={()=>this.handleHit()}/>
        }

        const fakeUiContainerStyle = 
        {
            position: 'relative' as 'relative',
            width:width
        }
        return (
            <div className="fakeui-container"  style={fakeUiContainerStyle}>
                <img className="fakeui-ui" src = {this.props.data[this.state.num].url} onClick={()=>{if(this.props.data[this.state.num].hit_flag===0)this.handleHit()}}/>
                    {hitArea}
                
            </div>
        )
    }
}