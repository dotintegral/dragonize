import React from "react";
import PropTypes from "prop-types";
import Draggable from "react-draggable";

const knobSize = 15;

class Knob extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			top: props.top,
			left: props.left
		};
	}

	updatePosition() {
		if (
			this.props.top !== this.state.top &&
			this.props.left !== this.state.left
		) {
			this.setState({
				top: this.props.top,
				left: this.props.left
			});
		}
	}

	componentDidMount() {
		this.updatePosition();
	}

	componentDidUpdate() {
		this.updatePosition();
	}

	render() {
		const knobStyles = {
			width: knobSize,
			height: knobSize
		};

		return (
			<Draggable
				position={{ x: this.state.left - 7, y: this.state.top - 7 }}
				onDrag={(e, { x, y }) => this.props.onDrag({ left: x + 7, top: y + 7 })}
				onStop={(e, { x, y }) => this.props.onDrop({ left: x + 7, top: y + 7 })}
			>
				<div className="knob" style={knobStyles} />
			</Draggable>
		);
	}
}

Knob.propTypes = {
	top: PropTypes.number,
	left: PropTypes.number,
	onDrag: PropTypes.func,
	onDrop: PropTypes.func
};

export default Knob;
