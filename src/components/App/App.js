import React from "react";
import { Provider } from "react-redux";

import store from "../../store";
import Curve from "../Curve";

function App() {
  return (
    <Provider store={store}>
      <div className="App" style={{ background: "#545a56" }}>
        <Curve />
      </div>
    </Provider>
  );
}

export default App;
