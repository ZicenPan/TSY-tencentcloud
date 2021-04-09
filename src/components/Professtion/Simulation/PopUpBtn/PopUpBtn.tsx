import React from "react";
import ReactModal from "react-modal";
import './PopUpBtn.css'
import ResourcePoolContent from './ResourcePoolContent/ResourcePoolContent'
import ReactTooltip from "react-tooltip";

interface Props {
    name: string;
    content: string;
    stage: number;
    data: any;
    changeStage: number;
}

interface State {
    showModal: boolean;
}

export default class PopUpBtn extends React.Component<Props, State> {
  fooRef = null
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
            <div>
                <h2>{this.props.name}</h2>
                <p className="mt-20">{this.props.content}</p>
            </div>
          )
      case "操作指引":
          return(
            <div>
                <h2>{this.props.name}</h2>
                <p className="mt-20">{this.props.content}</p>
          </div>
          )
      case "资源库":
        return(
          <ResourcePoolContent stage={this.props.stage} data={this.props.data} />
        )
    }
  }

  getTipMsg() {
    switch (this.props.name) {
      case "任务描述":
          return ""
      case "操作指引":
          return ""
      case "资源库": {
        let name = ""
        for (let i = 1; i < this.props.data.length; i++) {
          if(this.props.data[i].rid === this.props.stage) {
              name = this.props.data[i].name
          }
          
        }
        return "你的“" + name + "”已经更新并保存"
      }
    }
  }
 

  render() {
    // 获得提示框内容
    let msg = this.getTipMsg()
    // 处理提示框消息
    if(this.props.changeStage === 1) {
      if (this.state.showModal) {
        ReactTooltip.hide(this.fooRef)
        msg = ""
      } else {
        ReactTooltip.show(this.fooRef)
      }
    } else {
      ReactTooltip.hide(this.fooRef)
    }

    return (
      <div>
        <button className="btn btn-white"  ref={ref => {this.fooRef = ref}} onClick={this.handleOpenModal}  data-event = "null" data-effect ="solid" data-type = "info" data-event-off = "click" data-tip = {msg} data-place="right">
          <p>{this.props.name}</p>
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