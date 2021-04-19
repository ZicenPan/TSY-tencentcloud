import React from "react";
import ReactModal from "react-modal";
import ReactTooltip from "react-tooltip";

import ResourcePoolContent from './ResourcePoolContent/ResourcePoolContent'
import TaskDescContent from './TaskDescContent/TaskDescContent'
import OpGuideContent from './OpGuideContent/OpGuideContent'

import './PopUpBtn.css'




interface Props {
    name: string;
    content: string;
    stage: number;
    data: any;
    changeStage: number;
    logoUrl: string
}

interface State {
    showModal: boolean;
}

export default class PopUpBtn extends React.Component<Props, State> {
  fooRef = null
  msg = ""
  constructor(props: any) {
    super(props);
    this.state = {
      showModal: false,
    };

    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.fooRef = React.createRef();
  }

  componentDidMount () {
    ReactModal.setAppElement("body");

  }

  handleOpenModal() {
    this.setState({ showModal: true });
    ReactTooltip.hide(this.fooRef)
  }

  handleCloseModal() {
    this.setState({ showModal: false });
  }

  getModelContent() {
    switch (this.props.name) {
      case "任务描述":
          return(
            <TaskDescContent content={this.props.content}/>
          )
      case "操作指引":
          return(
            <OpGuideContent content={this.props.content}/>
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
        this.msg =  "你的“" + name + "”已经更新并保存"

        // 获得图片
        break
      }
    }
  }
 

  render() {
    // 获得各个按钮所需信息
    this.getContext()


    // 处理提示框消息
    if(this.props.changeStage === 1) {
      if (this.state.showModal) {
        ReactTooltip.hide(this.fooRef)
        this.msg = ""
      } else {
        ReactTooltip.show(this.fooRef)
      }
    } else {
      ReactTooltip.hide(this.fooRef)
    }



    return (
      <div>
        <button className="PopUpBtn d-flex flex-row"  ref={ref => {this.fooRef = ref}} onClick={this.handleOpenModal}  data-event = "null" data-effect ="solid" data-type = "info" data-event-off = "click" data-tip = {this.msg} data-place="right">
          <img className = "PopUpBtn-Logo" src={this.props.logoUrl} alt="logo"/>
          <p className="ml-10 PopUpBtn-Name">{this.props.name}</p>
        </button>
        <ReactTooltip/>
        <ReactModal
          isOpen={this.state.showModal}
          contentLabel="onRequestClose Example"
          onRequestClose={this.handleCloseModal}
          className="Modal centered"
          overlayClassName="Overlay"
        > 
          {this.getModelContent()}
          <button className="btn btn-blue mt-40 btn-right"onClick={this.handleCloseModal}>明白了</button>
        </ReactModal>
      </div>
    );
  }
}