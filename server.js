const express = require('express')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.json())

app.post('/test', (req, res) => {
  console.log(req.body.message)
  res.send()
})

const PORT = 3000

app.listen(PORT, () => console.log(`Listening on port ${PORT}...`))
