import React from "react";
import PropTypes from "prop-types";

import "../../scss/style.scss";

class TopBar extends React.Component {
  state = {
    cur: 0,
  };
  componentDidMount() {
    console.log(this.state);
  }
  // displayC = () => {
  //   if (this.state.cur == 0) {
  //     return;
  //   }
  //   console.log("here");
  //   return <div>{this.props.content}</div>;
  // };
  render() {
    return (
      <section className="progress-bar-top fixed-top bg-white">
        <div className="d-flex flex-row">
            <span className="circle-blue" />
          <div className="number-circle-blue" style={{marginLeft: 380}}>1</div>
          <p className="ml-20" style={{alignSelf: "center"}}>接受需求</p>
          <div className="number-circle-grey ml-40">2</div>
          <div className="number-circle-grey ml-40">3</div>
          <div className="number-circle-grey ml-40">4</div>
          <div className="number-circle-grey ml-40">5</div>
          <div className="number-circle-grey ml-40">6</div>
          <div className="ml-auto">
            <a href="/sim">
              <button id="bannerBtn" type="button" className="btn btn-blue">
                业内人士分享视频
              </button>
            </a>
          </div>
        </div>
      </section>
    );
  }
}

export default TopBar;
