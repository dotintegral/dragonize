import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import Knob from "../Knob/Knob";
import { toCanvasCoords, toCurveCoords } from "../../utils/scale";

import logic from "./logic.js";
import { CurveWrapper } from "./Curve.styled";

class Curve extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      width: 1000,
      height: 1000,
      knobX: 1,
      knobY: 1
    };

    this.draw = this.draw.bind(this);
    this.drawPath = this.drawPath.bind(this);
    this.resize = this.resize.bind(this);
    this.onKnobChange = this.onKnobChange.bind(this);
  }

  draw() {
    const { curveProps } = this.props;
    const paths = logic.getPaths({
      ratio1: curveProps.ratio1,
      ratio2: curveProps.ratio2,
      steps: 20
    });

    const path = paths[this.props.curveProps.step];

    const canvas = document.querySelector("#curve");
    const context = canvas.getContext("2d");

    context.clearRect(0, 0, canvas.width, canvas.height);

    if (curveProps.initialTriangle) {
      this.drawPath(context, paths[0], "#e0e0e0");
      this.drawPath(context, paths[1], "#e0e0e0");
    }

    this.drawPath(context, path, "#fff");
  }

  drawPath(context, path, color) {
    const calculateCoords = toCanvasCoords(this.props.canvasProps);

    const start = path[0];
    context.beginPath();
    context.moveTo(...calculateCoords(start));

    path.forEach(point => {
      context.lineTo(...calculateCoords(point));
    });

    context.strokeStyle = color;
    context.stroke();
  }

  resize() {
    const canvas = document.querySelector("#curve");
    const parent = canvas.parentElement;
    const { width, height } = parent.getBoundingClientRect();
    const { canvasProps } = this.props;

    if (width !== canvasProps.width || height !== canvasProps.height) {
      canvas.width = width;
      canvas.height = height;

      this.props.resize({
        width,
        height
      });
    }
  }

  componentDidMount() {
    window.addEventListener("resize", this.resize);
    this.resize();
    this.draw();
  }

  componentWillUnmount() {
    window.removeEventListener(this.resize);
  }

  componentDidUpdate() {
    this.resize();
    this.draw();
  }

  onKnobChange(position) {
    const coords = toCurveCoords(this.props.canvasProps)(position);

    console.log(coords);
  }

  render() {
    return (
      <CurveWrapper>
        <Knob
          onChange={this.onKnobChange}
          heightLimit={Math.floor(this.props.canvasProps.height / 2)}
        />
        <canvas id="curve" className="curve" width={1000} height={1000} />
      </CurveWrapper>
    );
  }
}

Curve.propTypes = {
  curveProps: PropTypes.object,
  canvasProps: PropTypes.object
};

const mapStateToProps = ({ curve, canvas, knob }) => ({
  curveProps: curve,
  canvasProps: canvas,
  knobProps: knob
});

const mapDispatchToProps = dispatch => ({
  resize: size =>
    dispatch({
      type: "RESIZE",
      ...size
    })
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Curve);
