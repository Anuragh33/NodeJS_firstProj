const fs = require("fs")

const http = require("http")

const url = require("url")

const replaceTemplate = (temp, product) => {
  let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName)
  output = output.replace(/{%IMAGE%}/g, product.image)
  output = output.replace(/{%PRICE%}/g, product.price)
  output = output.replace(/{%FROM%}/g, product.from)
  output = output.replace(/{%NUTRIENTS%}/g, product.nutrients)
  output = output.replace(/{%ID%}/g, product.id)
  output = output.replace(/{%DESCRIPTION%}/g, product.description)
  output = output.replace(/{%QUANTITY%}/g, product.quantity)

  if (!product.organic)
    output = output.replace(/{%NOT_ORGANIC%}/g, "not-organic")

  return output
}

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

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8")

const dataObj = JSON.parse(data)

const server = http.createServer((req, res) => {
  const { pathname, searchParams } = new URL(req.url, "http://127.0.0.1:7700")
  const query = Object.fromEntries(searchParams)

  if (pathname === "/" || pathname === "/overview") {
    res.writeHead(200, { "Content-type": "text/html" })

    const cardsHTML = dataObj
      .map((el) => replaceTemplate(templateCard, el))
      .join("")

    const output = templateOverview.replace("{%PRODUCT_CARDS%}", cardsHTML)

    res.end(output)
  }

  ///////////////////////////////////////////////////
  else if (pathname === "/api") {
    res.writeHead(200, { "Content-type": "application/json" })
    res.end(data)
  }

  ///////////////////////////////////////////////////
  else if (pathname === "/product") {
    res.writeHead(200, { "Content-type": "text/html" })
    const product = dataObj[query.id]
    const output = replaceTemplate(templateProduct, product)
    res.end(output)
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
