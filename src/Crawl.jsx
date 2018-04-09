const jsdom = require("jsdom");
const { JSDOM } = jsdom;

class Crawl {
    
    processProduct = (product_url_address) => {
        const request_promise = require('request-promise');
        request_promise({
            uri: product_url_address,
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
            const price = document.querySelector(".price-including-tax .price");
            const abv = document.querySelector(".abv span");
            const size = document.querySelector(".bottleSize span");
            const result = [name.textContent, price.textContent, abv.textContent, size.textContent];
            console.log(result);
            return result;
        })
        .catch(function(err) {
            console.log("Error: " + err);
        });
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
            hrefsAll.map(hrefs => {
                console.log(this.processProduct(hrefs.href));
            });
        })
        .catch(function(err) {
            console.log("Error: " + err);
        });
    }

}

export default Crawl;
