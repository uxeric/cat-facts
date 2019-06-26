const PORT = process.env.PORT || 9001

const http = require('http')
const fetch = require('node-fetch')
const fs = require('fs')
const cat_facts = JSON.parse(fs.readFileSync('./facts.json', 'utf8')).all
const cat_pics_api_url = 'https://api.thecatapi.com/v1/images/search?size=full'

const server = http.createServer()
server.listen(PORT)
server.on('request', main)

async function main ( req, res ) {
  let photo_url = await cat_photo_url()
  let fact = await random_cat_fact()

  res.end(`
    <html>
      <head>
        <title>Camila's Random Cat Facts</title>
        <style>
          .content {
            max-width: 600px;
            margin: 25px auto;
          }
          .kitty-picture {
            max-width: 400px;
          }
          p {
            line-height: 1.45;
          }
        </style>
      </head>
      <body>
        <div class="content">
          <h1>Camila's Random Cat Facts</h2>
          <img class="kitty-picture" src="${photo_url}" alt="Kitty Picture">
          <h2>Did you know?</h4>
          <p>${fact}</p>
          <h3>It's a fact ... a cat fact!</o>
        </div>
      </body>
    </html>
`)
}

async function cat_photo_url () {
  let response = await fetch(cat_pics_api_url)
  let data = await response.json()

  return data[0].url
}

async function random_cat_fact () {
  let total_facts = cat_facts.length
  let random_fact_index = Math.floor(Math.random() * total_facts) + 1 
  let cat_fact = cat_facts[random_fact_index].text

  return cat_fact
}
