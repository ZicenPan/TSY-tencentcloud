import React from "react";
import PropTypes from "prop-types";
import img from '@/assets/exitIcon.png';

import "@/scss/style.scss";
import "./TopBar.css";

interface Props {
  stageStrs: Array<string>,
  curStage: number,
  stage: number,
  handleChangeType: Function
  handleChangeCurStage: Function
}

// //后续可能会有点击stage编号跳转的需求
// interface State {
//   cur: number
// }

class TopBar extends React.Component<Props, {}> {
  constructor(props: any) {
    super(props)
    this.handleClickStageBar = this.handleClickStageBar.bind(this)
}
  

  componentDidMount() {
    console.log(this.props);
  } 

  handleClickStageBar(i) {
    this.props.handleChangeCurStage(i)
    this.props.handleChangeType("simulation")
  }

  render() {

    // 组装场景
    const stageNum:number = this.props.stageStrs.length;
    const stagesBars = [];
    for (let i = 1; i <= stageNum; i++) {
        let firstBarStyle = {}
 
        if (i <= this.props.stage) {
          stagesBars.push(
            <div 
              key={"topbar"+i.toString()} 
              className="number-circle-blue ml-40" 
              onClick={()=>{this.handleClickStageBar(i)}}
            >
              {i}
            </div>
          );
        } else {
          stagesBars.push(
            <div 
              key={"topbar"+i.toString()} 
              className="number-circle-grey ml-40" 
              onClick={()=>{this.handleClickStageBar(i)}}
            >
              {i}
            </div>
            );
        }
        if (this.props.curStage === i) {
          stagesBars.push(<p key={"topbarstr"+i.toString()} className="ml-20 mt-10" style={{alignSelf: "center"}}>{this.props.stageStrs[i-1]}</p>);
        } 

    }

    return (
      <div className="progress-bar-top fixed-top bg-white" id="topbar-div-topbar">
        <div className="d-flex flex-row">
          <img src={img} alt="Logo" className="topbar-exit-logo" onClick={()=>{this.props.handleChangeType("sketch")}}/>
            {/* <span className="circle-blue" /> */}
          <div className='d-flex flex-row m-auto'>
            {stagesBars}
          </div>
          

          <div className="topbar-video">
            <a>
              <button id="bannerBtn" type="button" className="btn btn-blue" onClick={()=>{this.props.handleChangeType("professtionVideo")}}>
                产品经理视频
              </button>
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default TopBar;
