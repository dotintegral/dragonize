import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Draggable from "react-draggable";

import { StyledKnob } from "./Knob.styled";

const Knob = ({ heightLimit }) => {
  const position = useSelector(state => state.knob);
  const dispatch = useDispatch();

  return (
    <Draggable
      position={{
        x: position.x - 6,
        y: position.y - 6
      }}
      scale={1}
      onDrag={() => {}}
      bounds={{ left: 0, top: 0, right: null, bottom: heightLimit }}
      onStop={(e, { x, y }) => {
        dispatch({
          type: "SET_KNOB",
          x: x + 6,
          y: y + 6
        });
      }}
    >
      <StyledKnob />
    </Draggable>
  );
};

export default Knob;
