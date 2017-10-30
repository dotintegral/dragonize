import React from 'react'
import { connect } from 'react-redux'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'

const Menu = ({curveProps}) => {
  const buttonStyle = {
    margin: '20px auto',
    display: 'block'
  }

  return (
    <div className="menu">
      <TextField
        floatingLabelText="Ratio 1"
        defaultValue={curveProps.ratio1} />
      <TextField
        floatingLabelText="Ratio 2"
        defaultValue={curveProps.ratio2} />
      <RaisedButton label="DRAW!" style={buttonStyle} />
    </div>
  )
}

const mapStateToProps = ({curve}) => ({
  curveProps: curve
})

export default connect(mapStateToProps)(Menu)
