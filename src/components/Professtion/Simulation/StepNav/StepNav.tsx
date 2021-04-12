import React from "react";


import "@/scss/style.scss";
import "./StepNav.scss";

interface Props {
  stage: number,
  curStage:number,
  curStep:number,
  step: number,
  stepInfo: any,
  handleChangeStep: Function
}

// //后续可能会有点击stage编号跳转的需求
// interface State {
//   cur: number
// }

class StepNav extends React.Component<Props, {}> {
  // constructor(props: any) {
  //   super(props)
  //   this.state = {
  //     cur: 0,
  //   };
// }


  render() {

    // 组装场景
    const stepBars = [];
    for (let i = 0; i < this.props.stepInfo.length; i++) {

        if (this.props.curStep === i) {
          stepBars.push(
            <li
              key={"stepInfo"+i.toString()} 
              className=" StepNav-font-blue mt-10"
              onClick={()=>{this.props.handleChangeStep(i)}}
            >
                {this.props.stepInfo[i].name}
            </li>
          );
        } else {
            if (i <= this.props.step || this.props.curStage < this.props.stage) {
              stepBars.push(
                <p
                  key={"stepInfo"+i.toString()} 
                  className=" StepNav-font-blue mt-10"
                  onClick={()=>{this.props.handleChangeStep(i)}}
                >
                    {this.props.stepInfo[i].name}
                </p>
              );
            } else {
              stepBars.push(
                <p
                  key={"stepInfo"+i.toString()} 
                  className=" StepNav-font-gley mt-10"
                >
                    {this.props.stepInfo[i].name}
                </p>
              );
            }

        }
    }

    return (

        <div className="d-flex flex-column ">
          <ul>
          {stepBars}
          </ul>
          
        </div>
    );
  }
}

export default StepNav;