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
//SERVER

const replaceTemplate = (temp, product) => {
  let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName)

  output = temp.replace(/{%IMAGE%}/g, product.image)
  output = temp.replace(/{%PRICE%}/g, product.price)
  output = temp.replace(/{%FROM%}/g, product.from)
  output = temp.replace(/{%NUTRIENTS%}/g, product.nutrients)
  output = temp.replace(/{%ID%}/g, product.id)
  output = temp.replace(/{%DESCRIPTION%}/g, product.description)
  output = temp.replace(/{%QUNATITY%}/g, product.quantity)

  if (!product.organic)
    output = temp.replace(/{%NOT_Organic%}/g, "not - organic")

  return output
}

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8")

const templateOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  "utf-8"
)
const templateCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  "utf-8"
)

const templateProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  "utf-8"
)

const dataObj = JSON.parse(data)

const server = http.createServer((req, res) => {
  const pathName = req.url
  if (pathName === "/" || pathName === "/overview") {
    res.writeHead(200, { "Content-type": "text/html" })

    const cardsHTML = dataObj.map((el) => replaceTemplate(templateCard, el))

    res.end(templateOverview)
  }

  ///////////////////////////////////////////////////
  else if (pathName === "/api") {
    res.writeHead(200, { "Content-type": "application/json" })
    res.end(data)
  }

  ///////////////////////////////////////////////////
  else if (pathName === "/product") {
    res.writeHead(200, { "Content-type": "text/html" })
    res.end(templateProduct)
  }

  ///////////////////////////////////////////////////
  else {
    res.writeHead(404, { "Content-type": "text/html" })
    res.end("<h1>The page cannot be found.</h1>")
  }
})

server.listen(7700, "127.0.0.1", () => {
  console.log("listeniing to the request on the port 7700 ")
})
