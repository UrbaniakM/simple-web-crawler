import React, { Component } from 'react';

import Product from './Product.jsx'

const jsdom = require("jsdom");
const { JSDOM } = jsdom;

class ProductsList extends Component {
	constructor(props){
		super(props);
		this.state = {
			loaded: false
		}
	}

	componentDidMount() {
		const request_promise = require('request-promise');
        request_promise({
            uri: 'https://www.whiskyshop.com/single-malt-scotch-whisky', // TODO: https://www.whiskyshop.com/single-malt-scotch-whisky?p=1 -> ?p=5
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
            const hrefsAll = [...document.querySelectorAll(".product-item-information > a")];
			const hrefs = []
			hrefsAll.forEach( (href) => {
				hrefs.push(href.href);
			});
            this.setState({
				products: hrefs,
				loaded: true
            });
        })
        .catch(function(err) {
            console.log("Error: " + err);
        });
	}
	
	render () {
		if(!this.state.loaded){
			return null;
		}
		const products = [];
		this.state.products.forEach( (product) => {
			products.push(
				<Product href={product} />
			);
		});
		return (
			<div id="ProductList">{products}</div>
		);
	}
}

export default ProductsList;

