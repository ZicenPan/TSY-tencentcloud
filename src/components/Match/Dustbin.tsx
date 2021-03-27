import React, { CSSProperties } from "react";
import { useDrop } from "react-dnd";
import { ItemTypes } from "./ItemTypes";
const style : CSSProperties= {
  height: "3rem",
  width: "7rem",
  marginRight: "1.5rem",
  marginBottom: "1.5rem",
  color: "black",
  padding: "1rem",
  textAlign: "center",
  fontSize: "1rem",
  lineHeight: "normal",
  float: "left"
};
export const Dustbin = () => {
  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.BOX,
    drop: () => ({ name: "Dustbin" }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop()
    })
  }));
  const isActive = canDrop && isOver;
  let backgroundColor = "white";
  if (isActive) {
    backgroundColor = "darkgreen";
  } else if (canDrop) {
    backgroundColor = "darkkhaki";
  }
  return (
    <div
      ref={drop}
      role="Dustbin"
      style={{ ...style, backgroundColor, border: "solid 1px black" }}
    >
      {isActive ? "" : ""}
    </div>
  );
};
