import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import logic from "./logic.js";

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

  getScaleParams() {
    const { width, height } = this.state;
    const min = Math.min(width, height) * this.props.canvasProps.zoom;
    const scale = min / 2;
    const marginTop = min / 4 + (height - min) / 2;
    const marginLeft = min / 4 + (width - min) / 2;

    return {
      scale,
      marginTop,
      marginLeft
    };
  }

  drawPath(context, path, color) {
    const { scale, marginTop, marginLeft } = this.getScaleParams();

    const start = path[0];
    context.beginPath();
    context.moveTo(start.x * scale + marginLeft, start.y * scale + marginTop);

    path.forEach(point => {
      context.lineTo(point.x * scale + marginLeft, point.y * scale + marginTop);
    });

    context.strokeStyle = color;
    context.stroke();
  }

  resize() {
    const canvas = document.querySelector("#curve");
    const { width, height } = canvas.getBoundingClientRect();

    if (width !== this.state.width || height !== this.state.height) {
      canvas.width = width;
      canvas.height = height;

      this.setState({
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

  render() {
    const { scale, marginTop, marginLeft } = this.getScaleParams();

    const knobProps = {
      top: this.state.knobY * scale + marginTop,
      left: this.state.knobX * scale + marginLeft
    };

    return (
      <div className="curveWrapper">
        <canvas id="curve" className="curve" width="1000" height="1000" />
      </div>
    );
  }
}

Curve.propTypes = {
  curveProps: PropTypes.object,
  canvasProps: PropTypes.object
};

const mapStateToProps = ({ curve, canvas }) => ({
  curveProps: curve,
  canvasProps: canvas
});

export default connect(mapStateToProps)(Curve);
