import React from 'react'
import {Provider} from 'react-redux'
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import store from './store'

import Curve from './components/Curve'
import Menu from './components/Menu'

import 'styles/index.scss'

console.log('theme', darkBaseTheme)

const theme = Object.assign(
  {},
  ...darkBaseTheme,
  {
    palette: {
      "primary1Color": "#B2DFDB",
      "primary2Color": "#B2DFDB",
      "primary3Color": "#757575",
      "accent1Color": "#ff4081",
      "accent2Color": "#f50057",
      "accent3Color": "#ff80ab",
      "textColor": "rgba(255, 255, 255, 1)",
      "secondaryTextColor": "rgba(255, 255, 255, 0.7)",
      "alternateTextColor": "#303030",
      "canvasColor": "#303030",
      "borderColor": "rgba(255, 255, 255, 0.5)",
      "disabledColor": "rgba(255, 255, 255, 0.5)",
      "pickerHeaderColor": "rgba(255, 255, 255, 0.12)",
      "clockCircleColor": "rgba(255, 255, 255, 0.12)"
    }
  }
)

export default class App extends React.Component {
  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(theme)}>
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
