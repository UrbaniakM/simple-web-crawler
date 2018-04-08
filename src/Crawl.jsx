const jsdom = require("jsdom");
const { JSDOM } = jsdom;

class Crawl {

    crawlWebpage = () => {
        const request_promise = require('request-promise');
        request_promise({
            uri: 'https://domwina.pl/pol_m_Oferta-100.html',
            method: 'GET',
            resolveWithFullResponse: true,
            headers: {
                'Accept': '*/*',
                'Content-Type': 'text/plain',
                'User-Agent': 'Request-Promise'
            }
        })
        .then(function(response) {
            const dom = new JSDOM(response.body, { includeNodeLocations: true });
            const document = dom.window.document;
            const body = document.body;
            const hrefsAll = [...document.querySelectorAll(".product-name")];
            console.log(hrefsAll);
            hrefsAll.map(hrefs => {
                console.log(dom.nodeLocation(hrefs));
                console.log(hrefs.href);
            });
        })
        .catch(function(err) {
            console.log("Error: " + err);
        });
    }

}

export default Crawl;
