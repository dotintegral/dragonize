import React from 'react'
import { connect } from 'react-redux'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'

class Menu extends React.Component {
  constructor(props) {
    super(props)
    const {curveProps} = props

    this.state = {
      ratio1: curveProps.ratio1,
      ratio2: curveProps.ratio2
    }

    this.onSubmit = this.onSubmit.bind(this)
  }

  onSubmit() {
    this.props.triggerDraw({
      ratio1: this.state.ratio1,
      ratio2: this.state.ratio2
    })
  }

  render() {
    const {curveProps} = this.props
    const buttonStyle = {
      margin: '20px auto',
      display: 'block'
    }

    return (
      <div className="menu">
        <TextField
          floatingLabelText="Ratio 1"
          defaultValue={this.state.ratio1}
          onChange={(event, val) => this.setState({ratio1: val})}/>
        <TextField
          floatingLabelText="Ratio 2"
          defaultValue={this.state.ratio2}
          onChange={(event, val) => this.setState({ratio2: val})}/>
        <RaisedButton
          label="DRAW!"
          style={buttonStyle}
          onClick={this.onSubmit} />
      </div>
    )
  }
}

const mapStateToProps = ({curve}) => ({
  curveProps: curve
})

const mapDispatchToProps = (dispatch) => {
  return {
    triggerDraw: ({ratio1, ratio2}) => dispatch({
      type: 'DRAW',
      ratio1,
      ratio2
    })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu)
