import React from "react";
import { Dustbin } from "./Dustbin";
import { Box } from "./Box";
import '../../scss/style.scss'

export default function Match() {
  return (
    <div>
      <h2 className="mt-160">明确分析目标</h2>
      <div className="mt-40 d-flex flex-row flex-wrap">
        <p style={{ lineHeight: 2.5 }}>
          用户调研反映多数用户希望在”探元素社交软件“里增加表情反馈功能，该竞品分析报告旨在分析总结竞品表情反馈功能的
        </p>
        <div
          className="align-self-center"
          style={{ overflow: "hidden", clear: "both", marginLeft: "10px" }}
        >
          <Dustbin />
        </div>
        <div style={{ lineHeight: 2.5 }}> 、</div>
        <div
          className="align-self-center"
          style={{ overflow: "hidden", clear: "both", marginLeft: "10px" }}
        >
          <Dustbin />
        </div>
        <div style={{ lineHeight: 2.5 }}> 、</div>

        <div
          className="align-self-center"
          style={{ overflow: "hidden", clear: "both", marginLeft: "10px" }}
        >
          <Dustbin />
        </div>
        <p style={{ lineHeight: 2.5 }}>和己方产品的</p>
        <div
          className="align-self-center"
          style={{ overflow: "hidden", clear: "both", marginLeft: "10px" }}
        >
          <Dustbin />
        </div>
        <div style={{ lineHeight: 2.5 }}> 、</div>

        <div
          className="align-self-center"
          style={{ overflow: "hidden", clear: "both", marginLeft: "10px" }}
        >
          <Dustbin />
        </div>
        <div style={{ lineHeight: 2.5 }}> 。</div>
      </div>
      <div
        className="d-flex justify-content-center mt-80"
        style={{ overflow: "hidden", clear: "both" }}
      >
        <Box name="呈现方式" />
        <Box name="优缺点" />
        <Box name="用户价值" />
        <Box name="启发点" />
        <Box name="机会点" />
      </div>
    </div>
  );
}
