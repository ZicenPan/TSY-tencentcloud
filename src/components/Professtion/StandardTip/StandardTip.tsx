import React from "react";


import "@/scss/style.scss";
import "./StandardTip.scss";
import {StandardTipCloseLogo,StandardTipOpenLogo,closeBtnUrl} from "../../../assets/cdnUrlConfig"

interface Props {
    standardMsg:string
}

interface State {
    showFrame:boolean
}

export default class StandardTip extends React.Component<Props, State> {
  constructor(props: any) {
        super(props)
        this.state = {
            showFrame: true,
        };
        this.handleChangeShowFrame = this.handleChangeShowFrame.bind(this)
    }



    handleChangeShowFrame(showFrame:boolean) {
        this.setState({
            showFrame:showFrame
        })
    }

    getBtnContent() {
        if (this.state.showFrame) {
            return(
                <button className="d-flex flex-column StandardTip-openBtn">
                    <img className = "align-self-end StandardTip-close" src={closeBtnUrl} onClick={()=>{this.handleChangeShowFrame(false)}}/>
                    <div className="d-flex flex-row align-self-start">
                        <img src={StandardTipOpenLogo}/>
                        <h2 className="ml-10 StandardTip-title">评价标准</h2>
                    </div>

                    <div className="StandardTip-msg">
                        {this.props.standardMsg}
                    </div>
                </button>
            )
        } else {
            return(
                <button className="StandardTip-closeBtn"  onClick={()=>{this.handleChangeShowFrame(true)}}>
                    <img className="ml-10" src={StandardTipCloseLogo}/>
                </button>
            )
        }
    }

    render() {

        return (
            <div className="StandardTip-container">
                {this.getBtnContent()}
            </div>
        )

    }
}