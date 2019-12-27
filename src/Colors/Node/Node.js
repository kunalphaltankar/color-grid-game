import React from "react";
import "./Node.css";

export default class Node extends React.Component {
	state = {
		randomNodeColor: null
	};

	render() {
		const styles = {
			backgroundColor: this.props.color
		};

		return this.props.isRandomNode ? (
			<div
				className="node randomnode"
				style={styles}
				onClick={this.props.highlightMatchingColors}
			></div>
		) : (
			<div
				className="node"
				style={styles}
				onClick={() => {
					this.props.checkMatch(this.props.color);
				}}
			></div>
		);
	}
}
