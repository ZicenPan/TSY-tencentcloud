import React from "react";


import "@/scss/style.scss";
import "./TaskDescContent.scss";
import {lightLogoUrl} from "../../../../../assets/cdnUrlConfig"

interface Props {
    content: string
}

// interface State {
//     content: string
// }

export default class TaskDescContent extends React.Component<Props, {}> {
//   constructor(props: any) {
//     super(props)
//     this.state = {
//         content: "",
//     };
    

    render() {
        return (
            <div>
                <div className="d-flex flex-row">
                    <img src={lightLogoUrl} alt="logo" />
                    <h2 className="ml-10">任务描述</h2>
                </div>
                <p className="mt-20">{this.props.content}</p>
            </div>

        )
    }
}