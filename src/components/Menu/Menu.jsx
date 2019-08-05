import React from "react";
import { useSelector, useDispatch } from "react-redux";

import PredefinedCurves from "../PredefinedCurves/PredefinedCurves";
import { MenuContainer, StyledInput } from "./Menu.styled";

const Menu = () => {
  const ratio1 = useSelector(state => state.curve.ratio1);
  const ratio2 = useSelector(state => state.curve.ratio2);
  const step = useSelector(state => state.curve.step);
  const dispatch = useDispatch();

  return (
    <MenuContainer>
      <StyledInput
        label="Ratio 1"
        value={ratio1}
        onChange={e =>
          dispatch({
            type: "DRAW",
            ratio1: parseFloat(e.target.value)
          })
        }
      />

      <StyledInput
        label="Ratio 2"
        value={ratio2}
        onChange={e =>
          dispatch({
            type: "DRAW",
            ratio2: parseFloat(e.target.value)
          })
        }
      />

      <StyledInput
        label="Steps"
        value={step}
        onChange={e =>
          dispatch({
            type: "DRAW",
            step: parseInt(e.target.value)
          })
        }
      />

      <PredefinedCurves />
    </MenuContainer>
  );
};

export default Menu;
