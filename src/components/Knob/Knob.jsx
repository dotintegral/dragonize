import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Draggable from "react-draggable";

import { StyledKnob } from "./Knob.styled";

const Knob = ({ heightLimit, onChange }) => {
  const position = useSelector(state => state.knob);
  const dispatch = useDispatch();

  return (
    <Draggable
      position={{
        x: position.x - 7,
        y: position.y + 7
      }}
      scale={1}
      onDrag={() => {}}
      bounds={{ left: 0, top: 0, right: null, bottom: heightLimit }}
      onStop={(e, { x, y }) => {
        const coords = {
          x: x + 7,
          y: y - 7
        };

        dispatch({
          type: "MOVE_KNOB",
          ...coords
        });
        onChange(coords);
      }}
    >
      <StyledKnob />
    </Draggable>
  );
};

export default Knob;
