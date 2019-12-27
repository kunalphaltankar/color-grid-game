import React from "react";
import "./Colors.css";
import Node from "./Node/Node";

export default class Colors extends React.Component {
	constructor() {
		super();
		this.state = {
			grid: [],
			colorMatrix: [],
			anyColorFromColorMatrix: null,
			findMatch: false,
			score: 0,
			gridSize: 5,
			highScore: 0
		};

		this.highlightMatchingColors = event => {
			this.setState({ findMatch: true });
		};

		this.checkMatch = color => {
			if (color === this.state.anyColorFromColorMatrix) {
				this.setState(
					{
						score: this.state.score + 20
					},
					function() {
						this.state.score > this.state.highScore
							? this.setState({ highScore: this.state.score })
							: console.log(
									"this.state.score <= this.state.highScore"
							  );
					}
				);
				this.setState(initColorsGrid(this.state.gridSize));
				this.setState({ findMatch: false });
			} else {
				this.setState({ score: this.state.score - 5 });
			}
		};
	}

	componentDidMount() {
		const {
			grid,
			colorMatrix,
			anyColorFromColorMatrix,
			gridSize
		} = initColorsGrid(this.state.gridSize);

		this.setState({
			grid,
			colorMatrix,
			anyColorFromColorMatrix,
			gridSize
		});
	}

	handleChangeColor() {
		this.setState(initColorsGrid(this.state.gridSize));
		this.setState({
			findMatch: false,
			score: 0
		});
	}

	handleLevels = gridSize => {
		this.setState({ gridSize, highScore: 0 }, function() {
			this.handleChangeColor();
		});
	};

	renderGrid() {
		return (
			<div className="grid">
				{this.state.grid.map((row, rowid) => {
					return (
						<div key={rowid}>
							{row.map((node, nodeid) => {
								return (
									<Node
										key={nodeid}
										row={node.row}
										col={node.col}
										color={
											this.state.colorMatrix[node.row][
												node.col
											]
										}
										isRandomNode={
											this.state.findMatch
												? this.state.colorMatrix[
														node.row
												  ][node.col] ===
												  this.state
														.anyColorFromColorMatrix
												: false
										}
										checkMatch={this.checkMatch}
									/>
								);
							})}
						</div>
					);
				})}
			</div>
		);
	}

	render() {
		return (
			<div className="Colors container">
				<h3>Where Am I?</h3>
				<div className="score">
					<label id="left">Your Score: {this.state.score}</label>
					<label id="right">HighScore: {this.state.highScore}</label>
				</div>
				<div>
					<button
						className="waves-effect waves-light btn"
						onClick={() => this.handleChangeColor()}
					>
						Change Colors
					</button>
				</div>
				{this.renderGrid()}
				<Node
					isRandomNode={true}
					color={this.state.anyColorFromColorMatrix}
					highlightMatchingColors={this.highlightMatchingColors}
				></Node>
				<div>
					<label id="info">Find above tile in the Color Grid.</label>
				</div>

				<div className="levels">
					<button
						className="waves-effect waves-teal btn-flat"
						onClick={() => this.handleLevels(5)}
					>
						Easy
					</button>
					<button
						className="waves-effect waves-teal btn-flat"
						onClick={() => this.handleLevels(10)}
					>
						Medium
					</button>
					<button
						className="waves-effect waves-teal btn-flat"
						onClick={() => this.handleLevels(15)}
					>
						Hard
					</button>
				</div>
			</div>
		);
	}
}

const initColorsGrid = gridSize => {
	const grid = [];
	const colorMatrix = [];
	for (let row = 0; row < gridSize; row++) {
		const currentRow = [];
		const currentRowColor = [];
		for (let col = 0; col < gridSize; col++) {
			currentRow.push(nodeCoordinates(row, col));
			currentRowColor.push(randomColor());
		}
		grid.push(currentRow);
		colorMatrix.push(currentRowColor);
	}
	const anyColorFromColorMatrix =
		colorMatrix[getRandomIndex(gridSize)][getRandomIndex(gridSize)];
	return { grid, colorMatrix, anyColorFromColorMatrix, gridSize };
};

const nodeCoordinates = (row, col) => {
	return {
		row,
		col
	};
};

const randomColor = () =>
	"#" +
	Math.random()
		.toString(16)
		.substr(-6);

const getRandomIndex = modOf => {
	return (
		parseInt(
			Math.random()
				.toString()
				.substr(-1)
		) % modOf
	);
};
