"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Http = require("http");
const Url = require("url");
var L06_Haushilfe;
(function (L06_Haushilfe) {
    let server = Http.createServer();
    console.log(server);
    let port = process.env.PORT;
    if (port == undefined)
        port = 5001;
    console.log("Server starting on port" + port);
    server.listen(port);
    server.addListener("request", handleRequest);
    function handleRequest(_request, _response) {
        console.log("Whats up?");
        if (_request.url) {
            let url = Url.parse(_request.url, true);
            console.log(url.query);
        }
        _response.setHeader("content-type", "text/html; charset=utf-8");
        _response.setHeader("Acces-Control-Allow-Origin", "*");
        _response.write("This is my response");
        _response.end();
    }
})(L06_Haushilfe = exports.L06_Haushilfe || (exports.L06_Haushilfe = {}));
//# sourceMappingURL=Server.js.map