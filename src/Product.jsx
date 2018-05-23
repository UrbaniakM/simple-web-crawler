import React, { Component } from 'react';

class Product extends Component {
	constructor(props){
		super(props);
		this.state = {
			name: '',
			abv: 0,
			price: 0,
			size: 0,
			loaded: false
		}
	}

	componentDidMount() {
		// TODO: load
	}
	
	render () {
		return (
			<table>
				<tbody>
					<tr>
						<td>Name</td>
						<td>{this.state.name}</td>
					</tr>
					<tr>
						<td>ABV</td>
						<td>{this.state.abv}</td>
					</tr>
					<tr>
						<td>Size</td>
						<td>{this.state.size}</td>
					</tr>
					<tr>
						<td>Price</td>
						<td>{this.state.price}</td>
					</tr>
				</tbody>
			</table>
		);
	}
}

export default Product;

