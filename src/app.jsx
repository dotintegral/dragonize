import React from 'react'
import {Provider} from 'react-redux'
import store from './store'

import Curve from './components/Curve'

import 'styles/index.scss'

export default class App extends React.Component {
  render() {
    console.log('store', store)
    return (
      <Provider store={store}>
        <div className="columns">
          <Curve />
          <div className="menu" />
        </div>
      </Provider>
    )
  }
}
