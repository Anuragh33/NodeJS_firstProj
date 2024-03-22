const fs = require("fs")

const http = require("http")

const url = require("url")

////////////////////////////////////////////
//file

// fs.readFile("./txt/start.txt", "utf-8", (err, data) => {
//   fs.readFile(`./txt/${data}.txt`, "utf-8", (err, data1) => {
//     fs.readFile("./txt/append.txt", "utf-8", (err, data2) => {
//       // console.log(data2)

//       fs.writeFile(
//         "./txt/tt.txt",
//         `${data1}\n${data}\n${data1}`,
//         "utf-8",
//         (err) => {
//           console.log("file is done")
//         }
//       )
//     })
//   })
// })

/////////////////////////////////////////
//server

const server = http.createServer((req, res) => {
  const pathName = req.url
  if (pathName === "/" || pathName === "/overview") {
    res.end("Hello, this is OVERVIEW!")
  } else if (pathName === "/api") {
    fs.readFile(`${__dirname}/dev-data/data.json`, "utf-8", (err, data) => {
      const productName = JSON.parse(data)
      res.writeHead(200, { "Content-type": "application/json" })
      res.end(data)
    })
  } else if (pathName === "/product") {
    res.end("Hello, this is PRODUCT!")
  } else {
    res.writeHead(404, {
      "Content-type": "text/html",
    })
    res.end("<h1>The page cannot be found.</h1>")
  }
})

server.listen(7700, "127.0.0.1", () => {
  console.log("listeniing to the request on the port 7700 ")
})
