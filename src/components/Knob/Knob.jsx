import React from "react";
import Draggable from "react-draggable";

import { StyledKnob } from "./Knob.styled";

const Knob = () => {
  return (
    <Draggable
      defaultPosition={{ x: 0, y: 0 }}
      scale={1}
      onStart={() => {}}
      onDrag={() => {}}
      onStop={() => {}}
    >
      <StyledKnob />
    </Draggable>
  );
};

export default Knob;
