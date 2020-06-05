import * as Http from "http";
import * as Url from "url";
import * as Mongo from "mongodb";

export namespace L06_Haushilfe {
  let server: Http.Server = Http.createServer();
  console.log(server);


  let port : number | string | undefined = process.env.PORT;
    if (port == undefined)
        port = 5001;

        console.log("Server starting on port" + port);

  server.listen(port);
  server.addListener("request", handleRequest);

  function handleRequest (_request: Http.IncomingMessage, _response: Http.ServerResponse): void {
      console.log("Whats up?");

      if(_request.url) {
          let url: Url.UrlWithParsedQuery = Url.parse(_request.url, true);
          console.log(url.query);
      }

      _response.setHeader("content-type", "text/html; charset=utf-8");
      _response.setHeader("Acces-Control-Allow-Origin", "*");
      _response.write("This is my response");
      _response.end();
  }
}