import React, { Component } from 'react';

const jsdom = require("jsdom");
const { JSDOM } = jsdom;

class Product extends Component {
	constructor(props){
		super(props);
		this.state = {
			loaded: false
		}
	}

	componentDidMount() {
		const request_promise = require('request-promise');
        request_promise({
            uri: this.props.href,
            method: 'GET',
            resolveWithFullResponse: true,
            headers: {
                'Accept': '*/*',
                'Content-Type': 'text/plain',
                'User-Agent': 'Request-Promise'
            }
        })
		.then((response) => {
			const dom = new JSDOM(response.body, { includeNodeLocations: true });
        	const document = dom.window.document;
        	const name = document.querySelector(".product-name *");
        	let price = document.querySelector(".price-including-tax .price");
        	let abv = document.querySelector(".abv span");
        	const size = document.querySelector(".bottleSize span");
        	if(name && price && abv && size){
            	price = price.textContent.replace(/[ \t\n]*/g,'');
            	abv = abv.textContent.replace(/\%/i,''); // in percent
            	const result = [name.textContent, price, abv, size.textContent];
				this.setState({
					name: name.textContent, 
					price,
					abv,
					size: size.textContent,
					loaded: true
				});
        	}
		})
		.catch(function(err) {
            console.log("Error: " + err);
        });
	}

	componentWillUnmount() {
		// TODO: cancel http asynch request
	}
	
	render () {
		if(this.state.loaded === false){
			return null;
		}
		return (
			<div id={this.state.name}>
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
			</div>
		);
	}
}

export default Product;

