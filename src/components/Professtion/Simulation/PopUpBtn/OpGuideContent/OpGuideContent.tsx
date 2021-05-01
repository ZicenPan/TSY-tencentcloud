import React from "react";


import "@/scss/style.scss";
import "./OpGuideContent.scss";
import {lightLogoUrl} from "../../../../../assets/cdnUrlConfig"

interface Props {
    opGuide: any
}

// interface State {
//     content: string
// }

export default class OpGuideContent extends React.Component<Props, {}> {
//   constructor(props: any) {
//     super(props)
//     this.state = {
//         content: "",
//     };
    
    getContent() {
        if (!this.props.opGuide)
            return (
                <p className="mt-20">
                    暂无操作指引，骚年自己摸索吧
                </p>
            )
        
        let words = <div/>
        let img = <div/>
        if (this.props.opGuide.words) {
            words =<p className="mt-20">{this.props.opGuide.words}</p>
        }

        if (this.props.opGuide.img) {
            img = <div className="OpGuideContent-img-container">
                    <img className="OpGuideContent-img" src={this.props.opGuide.img}/>
                 </div>
        }

        return (
            <div className="mt-20">
                {words}
                {img}
            </div>
        )
    }
    
    render() {
        return (
            <div>
                <div className="d-flex flex-row">
                    <img src={lightLogoUrl} alt="logo" />
                    <h2 className="ml-10">操作指引</h2>
                </div>
                {this.getContent()}
            </div>

        )
    }
}