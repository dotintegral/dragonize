import React from "react";
import { Provider } from "react-redux";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";

import store from "../../store";
import Curve from "../Curve/Curve";
import Menu from "../Menu/Menu";

import { MainContainer, CurveColumn, MenuColumn } from "./layout.styled";

const theme = createMuiTheme({
  palette: {
    type: "dark"
  }
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <MainContainer>
          <MenuColumn>
            <Menu />
          </MenuColumn>
          <CurveColumn>
            <Curve />
          </CurveColumn>
        </MainContainer>
      </Provider>
    </ThemeProvider>
  );
}

export default App;
