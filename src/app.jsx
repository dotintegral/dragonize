import React from 'react'
import {Provider} from 'react-redux'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import store from './store'

import Curve from './components/Curve'
import Menu from './components/Menu'

import 'styles/index.scss'

export default class App extends React.Component {
  render() {
    return (
      <MuiThemeProvider>
        <Provider store={store}>
          <div className="columns">
            <Curve />
            <Menu />
          </div>
        </Provider>
      </MuiThemeProvider>
    )
  }
}
