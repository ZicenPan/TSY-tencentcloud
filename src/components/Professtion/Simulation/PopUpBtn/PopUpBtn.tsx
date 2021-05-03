import React from "react";
import ReactModal from "react-modal";
import ReactTooltip from "react-tooltip";

import ResourcePoolContent from './ResourcePoolContent/ResourcePoolContent'
import TaskDescContent from './TaskDescContent/TaskDescContent'
import OpGuideContent from './OpGuideContent/OpGuideContent'

import {closeBtnUrl} from '../../../../assets/cdnUrlConfig'
import './PopUpBtn.scss'



interface Props {
    name: string;
    content: string;
    stage: number;
    data: any;
    changeStage: number;
    logoUrl: string
    logoLightUrl: string
}

interface State {
    showModal: boolean;
    mouseEnter:boolean;
}

export default class PopUpBtn extends React.Component<Props, State> {
  fooRef = null
  msg = ""
  hasOpenModal = false
  constructor(props: any) {
    super(props);
    this.state = {
      showModal: false,
      mouseEnter: false,
    };

    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleOnMouseEnter = this.handleOnMouseEnter.bind(this);
    this.fooRef = React.createRef();
  }

  componentDidMount () {
    ReactModal.setAppElement("body");

  }

  handleOpenModal() {
    this.setState({ showModal: true });
    this.hasOpenModal = true
  }

  handleCloseModal() {
    this.setState({ showModal: false });
    this.hasOpenModal = false
  }

  handleOnMouseEnter(status:boolean) {
    this.setState({ mouseEnter:status})
    console.log("handleOnMouseEnter")
  }

  getModelContent() {
    switch (this.props.name) {
      case "任务描述":
          return(
            <TaskDescContent content={this.props.content}/>
          )
      case "操作指引":
          return(
            <OpGuideContent opGuide={this.props.content}/>
          )
      case "资源库":
        return(
          <ResourcePoolContent stage={this.props.stage} data={this.props.data} />
        )
    }
  }

  getContext() {
    switch (this.props.name) {
      case "任务描述": {
        this.msg = ""
        break
      }
      case "操作指引": {
        this.msg = ""
        break
      }
      case "资源库": {
        // 获得提示信息
        let name = ""
        for (let i = 1; i < this.props.data.length; i++) {
          if(this.props.data[i].rid === this.props.stage) {
              name = this.props.data[i].name
          }
          
        }
        this.msg =  name!==""?"你的“" + name + "”已经更新并保存":""
        console.log(this.msg)
        // 获得图片
        break
      }
    }
  }
 

  render() {
    // 获得各个按钮所需信息
    this.getContext()
    
    if (this.props.changeStage === 1) {
      // ReactTooltip.show(this.fooRef) 
      if (!this.hasOpenModal&&!this.state.mouseEnter) {
        ReactTooltip.show(this.fooRef) // 展示的是上一次render中的msg

        // 计时器3秒消失
        setTimeout(() => {
          ReactTooltip.hide(this.fooRef)
        }, 3000)
      } else 
        this.msg= ""
    }
    
    console.log(this.props.changeStage)
    return (
      <div className="PopUpBtn-container">
        <button className="PopUpBtn d-flex flex-row"  
          ref={ref => {this.fooRef = ref}} 
          onClick={this.handleOpenModal}  
          data-event = "null" 
          data-effect ="solid" 
          data-type = "info" 
          data-event-off = "click" 
          data-tip = {this.msg} 
          data-place="right"
          onMouseEnter={()=>{this.handleOnMouseEnter(true)}}
          onMouseLeave={()=>{this.handleOnMouseEnter(false)}}
        >
          <img className = "PopUpBtn-Log mt-1" src={this.state.mouseEnter?this.props.logoLightUrl:this.props.logoUrl} alt="logo"/>
          <p className="ml-10" id={this.state.mouseEnter?"PopUpBtn-Name-light":"PopUpBtn-Name"}>{this.props.name}</p>
        </button>
        <ReactTooltip/>

        <ReactModal
          isOpen={this.state.showModal}
          contentLabel="onRequestClose Example"
          onRequestClose={this.handleCloseModal}
          className="PopUpBtn-Modal centered "
          overlayClassName="PopUpBtn-Overlay"
        > 
          <div className="d-flex flex-column">
            <img src={closeBtnUrl} className="align-self-end PopUpBtn-closeLogo" onClick={this.handleCloseModal}/>
            <div id="ReactModal-content">
              {this.getModelContent()}
            </div>
            
            {this.props.name!=="资源库"?<button className="btn btn-blue mt-40 btn-right align-self-end"onClick={this.handleCloseModal}>明白了</button>:<div className="mt-80"/>}
          </div>
          
        </ReactModal>
      </div>
      
    );
  }
}