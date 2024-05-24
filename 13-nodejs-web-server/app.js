const http = require("http");
const fs = require("fs");
const port = 3000;

const renderHTML = (path, res) => {
  fs.readFile(path, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.write("Error File Not Found!");
    } else {
      res.write(data);
    }
    res.end();
  });
};

http
  .createServer((req, res) => {
    const url = req.url;

    res.writeHead(200, {
      "Content-Type": "text/html",
    });
    if (url === "/") {
      renderHTML("./html/index.html", res);
    } else if (url === "/contact") {
      renderHTML("./html/contact.html", res);
    } else if (url === "/about") {
      renderHTML("./html/about.html", res);
    } else {
      renderHTML("./html/else.html", res);
    }
    
  })
  .listen(port, () => {
    console.log(`listening on port ${port}...`);
  });
