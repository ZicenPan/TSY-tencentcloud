import React from "react";


import "@/scss/style.scss";
import "./TestInput.scss";
import { url } from "node:inspector";


interface Props {
    inputContent:any
    handleSetInputData: Function
    fillFlag: boolean
}

interface State {
    content: string
}

export default class TestInput extends React.Component<Props, State> {
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
        this.props.handleSetInputData(this.state.content)
    }

    componentDidMount() {
        console.log(this.props.fillFlag)
        if (this.props.fillFlag) {
            this.setState({
                content: this.props.inputContent,
            });
            console.log("aaaaaa")
        }
        console.log("bbbbbb")
    }

    render() {
        console.log("remder")
        console.log(this.props)
        return (
            <div>
               <input type='text' name= "handy" ref={this.inputRef} value={this.state.content} onChange={this.handleContentChange} />
                    <button type='submit' onClick={this.handleSubmit}>Submit</button>
            </div>
        )
    }
}