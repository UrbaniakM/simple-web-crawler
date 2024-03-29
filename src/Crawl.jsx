const jsdom = require("jsdom");
const { JSDOM } = jsdom;

class Crawl {
    arrayOfProducts = []

    processProduct = (product_url_address) => {
        const request_promise = require('request-promise');
        // let ret = request_promise({
        // return ret.resolve ...
        return request_promise({
            uri: product_url_address,
            method: 'GET',
            resolveWithFullResponse: true,
            headers: {
                'Accept': '*/*',
                'Content-Type': 'text/plain',
                'User-Agent': 'Request-Promise'
            }
        })
    }

    getProductInfo = (response) => {
        const dom = new JSDOM(response.body, { includeNodeLocations: true });
        const document = dom.window.document;
        const name = document.querySelector(".product-name *");
        let price = document.querySelector(".price-including-tax .price");
        let abv = document.querySelector(".abv span");
        let size = document.querySelector(".bottleSize span");
        if(name && price && abv && size){
            price = price.textContent.replace(/[ \t\n]*/g,'');
            abv = abv.textContent.replace(/\%/i,''); // in percent
            size = size.textContent;
            let alcoholToPrice = abv * size.substring(0, size.length - 2) / 100 / price.substr(1);
            const result = {'name': name.textContent,'price': price, 'abv': abv, 'size': size, 'alcoholToPrice': alcoholToPrice};
            this.arrayOfProducts.push(result);
        }
    }

    crawlWebpage = () => {
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
            let arrayPromises = [];
            hrefsAll.map(hrefs => {
                arrayPromises.push(this.processProduct(hrefs.href));
            });
            Promise.all(arrayPromises).then((responses) => {
                responses.forEach((response) => {
                    this.getProductInfo(response);
                })
            })
            .then( () => {
                this.arrayOfProducts.sort((obj1,obj2) => {
                    if( obj1.alcoholToPrice > obj2.alcoholToPrice ) return -1;
                    if( obj1.alcoholToPrice < obj2.alcoholToPrice) return 1;
                    return 0;
                });
                console.log(this.arrayOfProducts);
                return this.arrayOfProducts;
            })
        })
        .catch(function(err) {
            console.log("Error: " + err);
        });
    }

}

export default Crawl;
