import React from "react";
import PropTypes from "prop-types";
import img from '@/assets/exitIcon.png';

import "@/scss/style.scss";
import "./TopBar.css";

interface Props {
  stageStrs: Array<string>,
  cur: number,
  handleChangeType: Function
}

// //后续可能会有点击stage编号跳转的需求
// interface State {
//   cur: number
// }

class TopBar extends React.Component<Props, {}> {
  // constructor(props: any) {
  //   super(props)
  //   this.state = {
  //     cur: 0,
  //   };
// }

  componentDidMount() {
    console.log(this.props);
  } 
  // displayC = () => {
  //   if (this.state.cur == 0) {
  //     return;
  //   }
  //   console.log("here");
  //   return <div>{this.props.content}</div>;
  // };

  render() {

    // 组装场景
    const stageNum:number = this.props.stageStrs.length;
    const stagesBars = [];
    for (let i = 1; i <= stageNum; i++) {
        let firstBarStyle = {}
        if (i === 1)
          firstBarStyle = {marginLeft: 380};
        if (this.props.cur === i) {
          stagesBars.push(<div key={"topbar"+i.toString()} className="number-circle-blue ml-40" style={firstBarStyle}>{i}</div>);
          stagesBars.push(<p key={"topbarstr"+i.toString()} className="ml-20" style={{alignSelf: "center"}}>{this.props.stageStrs[i-1]}</p>);
        } else {
          stagesBars.push(<div key={"topbar"+i.toString()} className="number-circle-grey ml-40" style={firstBarStyle}>{i}</div>);
        }

    }

    return (
      <section className="progress-bar-top fixed-top bg-white div-topbar">
        <div className="d-flex flex-row ">
          <img src={img} alt="Logo" />
            {/* <span className="circle-blue" /> */}
  
          {stagesBars}

          <div className="ml-auto">
            <a>
              <button id="bannerBtn" type="button" className="btn btn-blue" onClick={()=>{this.props.handleChangeType("sketch")}}>
                个人中心
              </button>
            </a>
          </div>
        </div>
      </section>
    );
  }
}

export default TopBar;
