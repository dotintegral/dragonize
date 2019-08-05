import React from "react";
import { useSelector, useDispatch } from "react-redux";

import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import { StyledFormControl } from "./PredefinedCurves.styled";

const onChange = ({ curves, dispatch }) => e => {
  const name = e.target.value;

  if (name === "Custom") {
    return;
  }

  const choosenCurve = curves.find(c => c.name === name);

  if (!choosenCurve) {
    return;
  }

  dispatch({
    type: "DRAW",
    ratio1: choosenCurve.ratio1,
    ratio2: choosenCurve.ratio2
  });
};

const PredefinedCurves = () => {
  const ratio1 = useSelector(state => state.curve.ratio1);
  const ratio2 = useSelector(state => state.curve.ratio2);
  const curves = useSelector(state => state.predefinedCurves);
  const dispatch = useDispatch();

  const existingCurve = curves.find(
    c => c.ratio1 === ratio1 && c.ratio2 === ratio2
  );

  const value = existingCurve ? existingCurve.name : "Custom";

  return (
    <div>
      <StyledFormControl>
        <InputLabel>Predefined Curves</InputLabel>
        <Select value={value} onChange={onChange({ curves, dispatch })}>
          {curves.map(c => (
            <MenuItem value={c.name}>{c.name}</MenuItem>
          ))}
          <MenuItem value="Custom">Custom</MenuItem>
        </Select>
      </StyledFormControl>
    </div>
  );
};

export default PredefinedCurves;
