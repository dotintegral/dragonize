import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'

class Menu extends React.Component {
  constructor(props) {
    super(props)
    const {curveProps} = props

    this.state = {
      ratio1: curveProps.ratio1.toFixed(4),
      ratio2: curveProps.ratio2.toFixed(4),
      step: curveProps.step
    }

    this.onSubmit = this.onSubmit.bind(this)
  }

  onSubmit() {
    this.props.triggerDraw({
      ratio1: this.state.ratio1,
      ratio2: this.state.ratio2,
      step: this.state.step
    })
  }

  render() {
    const incrementButtonStyle = {
      margin: '25px 0 20px',
      display: 'block'
    }
    const submitButtonStyle = {
      margin: '20px auto',
      display: 'block'
    }

    return (
      <div className="menu">
        <div className="ratioLine">
          <RaisedButton
            label="-"
            className="ratioIncrement"
            style={incrementButtonStyle}
            onClick={() => {
              this.setState({
                ratio1: (+this.state.ratio1 - 0.01).toFixed(4)
              }, this.onSubmit)
            }} />
          <TextField
            floatingLabelText="Ratio 1"
            className="ratioInput"
            value={this.state.ratio1}
            onChange={(event, val) => this.setState({ratio1: val})}/>
          <RaisedButton
            label="+"
            className="ratioIncrement"
            style={incrementButtonStyle}
            onClick={() => {
              this.setState({
                ratio1: (+this.state.ratio1 + 0.01).toFixed(4)
              }, this.onSubmit)
            }} />
        </div>
        <div className="ratioLine">
          <RaisedButton
            label="-"
            className="ratioIncrement"
            style={incrementButtonStyle}
            onClick={() => {
              this.setState({
                ratio2: (+this.state.ratio2 - 0.01).toFixed(4)
              }, this.onSubmit)
            }} />
          <TextField
            floatingLabelText="Ratio 2"
            className="ratioInput"
            value={this.state.ratio2}
            onChange={(event, val) => this.setState({ratio2: val})}/>
          <RaisedButton
            label="+"
            className="ratioIncrement"
            style={incrementButtonStyle}
            onClick={() => {
              this.setState({
                ratio2: (+this.state.ratio2 + 0.01).toFixed(4)
              }, this.onSubmit)
            }} />
        </div>
        <div className="ratioLine">
          <RaisedButton
            label="-"
            className="ratioIncrement"
            style={incrementButtonStyle}
            onClick={() => {
              this.setState({
                step: Math.max(Math.min((+this.state.step - 1), 20), 0)
              }, this.onSubmit)
            }} />
          <TextField
            floatingLabelText="Step"
            className="ratioInput"
            value={this.state.step}
            onChange={(event, val) => this.setState({step: val})}/>
          <RaisedButton
            label="+"
            className="ratioIncrement"
            style={incrementButtonStyle}
            onClick={() => {
              this.setState({
                step: Math.max(Math.min((+this.state.step + 1), 20), 0)
              }, this.onSubmit)
            }} />
        </div>
        <RaisedButton
          label="DRAW!"
          style={submitButtonStyle}
          onClick={this.onSubmit} />
      </div>
    )
  }
}

Menu.propTypes = {
  curveProps: PropTypes.object,
  triggerDraw: PropTypes.func,
}

const mapStateToProps = ({curve}) => ({
  curveProps: curve
})

const mapDispatchToProps = (dispatch) => {
  return {
    triggerDraw: ({ratio1, ratio2, step}) => dispatch({
      type: 'DRAW',
      ratio1,
      ratio2,
      step
    })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu)
