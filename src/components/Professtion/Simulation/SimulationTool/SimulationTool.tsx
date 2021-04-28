import React from "react";


import "@/scss/style.scss";
import "./SimulationTool.scss";
import { url } from "node:inspector";


interface Props {
    handleGetToolData: Function
}

interface State {
    content: string
}

export default class SimulationTool extends React.Component<Props, State> {
  inputRef = null
  constructor(props: any) {
    super(props)
    this.state = {
        content: "",
    };
    

    this.inputRef= React.createRef();
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleContentChange = this.handleContentChange.bind(this)
    
}
    
    handleContentChange = (e) => {
        this.setState({
            content: e.target.value
        })
    }

    handleSubmit (){
        this.props.handleGetToolData(this.state.content)
    }

    render() {
        console.log("remder")
        console.log(this.props)
        return (
            <div>
                <button type='submit' className="btn btn-white" onClick={this.handleSubmit}>Submit</button>
               <textarea  name= "handy" ref={this.inputRef} value={this.state.content} onChange={this.handleContentChange} />
            </div>
        )
    }
}