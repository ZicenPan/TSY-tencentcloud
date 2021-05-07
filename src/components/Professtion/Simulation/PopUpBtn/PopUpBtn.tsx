import React from "react";
import ReactModal from "react-modal";
import ReactTooltip from "react-tooltip";

import ResourcePoolContent from './ResourcePoolContent/ResourcePoolContent'
import TaskDescContent from './TaskDescContent/TaskDescContent'
import OpGuideContent from './OpGuideContent/OpGuideContent'
const { forwardRef, useRef, useImperativeHandle } = React;
import {closeBtnUrl} from '../../../../assets/cdnUrlConfig'
import './PopUpBtn.scss'



interface Props {
    name: string;
    content: string;
    stage: number;
    data: any;
    showTooltip: boolean;
    logoUrl: string;
    logoLightUrl: string;
    handleNext:Function
    autoPopFlag: boolean
}

interface State {
    showModal: boolean;
    mouseEnter:boolean;
}

export default class PopUpBtn extends React.Component<Props, State> {
  tooltipRef = null
  msg = ""
  hasClickBtn = false
  constructor(props: any) {
    super(props);
    this.state = {
      showModal: false,
      mouseEnter: false,
    };

    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleOnMouseEnter = this.handleOnMouseEnter.bind(this);
    this.handleClickBtn = this.handleClickBtn.bind(this)
    this.tooltipRef = React.createRef();
  }

  componentDidMount () {
    ReactModal.setAppElement("body");
  }

  handleOpenModal() {
    this.setState({ showModal: true });
    this.hasClickBtn = true
  }

  handleCloseModal() {
    this.setState({ showModal: false });
    this.hasClickBtn = false
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
      case "通讯录": {
        this.msg = "你收到了一条信息"
      }
    }
  }
 
  handleClickBtn() {
    this.hasClickBtn = true
    switch (this.props.name) {
      case "任务描述": {
        this.handleOpenModal()
        break
      }
      case "操作指引": {
        this.handleOpenModal()
        break
      }
      case "资源库": {
        this.handleOpenModal()
        break
      }
      case "通讯录": {
        this.props.handleNext("mailList")
        break
      }
    }
  }

  handleTooltip() {
    ReactTooltip.rebuild();
    switch (this.props.name) {
      case "任务描述": {
        break
      }
      case "操作指引": {
        break
      }
      case "资源库": {
        if (this.props.showTooltip) {
          // ReactTooltip.show(this.tooltipRef) 
          if (!this.hasClickBtn&&!this.state.mouseEnter) {
            ReactTooltip.show(this.tooltipRef) // 展示的是上一次render中的msg
    
            // 计时器3秒消失
            setTimeout(() => {
              ReactTooltip.hide(this.tooltipRef)
            }, 3000)
          } else 
            this.msg= ""
        }
        break
      }
      case "通讯录": {
        // ReactTooltip.show(this.tooltipRef) 
        if (this.props.showTooltip) {
          // ReactTooltip.show(this.tooltipRef) 
          if (!this.state.mouseEnter) {
            ReactTooltip.show(this.tooltipRef) // 展示的是上一次render中的msg
            console.log("通讯录")
          } else 
            this.msg= ""
        }
        break
      }
    }
  }

  // 处理自动的弹窗
  handleAutoPop() {
    switch (this.props.name) {
      case "任务描述": {
        break
      }
      case "操作指引": {
        break
      }
      case "资源库": {
        break
      }
      case "通讯录": {
        break
      }
    }
  }

  render() {
    // 获得各个按钮所需信息
    this.getContext()
    
    // 处理弹窗
    if (this.props.showTooltip)
      this.handleTooltip()
    
    return (
      <div className="PopUpBtn-container">
        <button className="PopUpBtn d-flex flex-row"  
          ref={ref => {this.tooltipRef = ref}} 
          onClick={this.handleClickBtn}  
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