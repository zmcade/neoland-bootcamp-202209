const express = require('express')
const searchHttpCats = require('./logic/searchHttpCats')

const app = express()

app.use(express.static('public'))

app.get('/login', (req, res) => {
    res.status(200)
    res.setHeader('Content-Type', 'text/html')
    res.send(`<html>
                <head>
                    <title>Http Cats</title>
                </head>
                <body> 
                    <h1>Search</h1>
                    <form action="/search">
                        <input type="text" name="q">
                        <button>Search</button>
                    </form>
                    <a href="/register">Register</a>
                </body>
            </html>`)
})

// http://localhost/search?q=C
app.get('/search', (req, res) => {
    const { q } = req.query

    searchHttpCats(q, (error, cats) => {
        if (error) {
            res.status(500)
            res.setHeader('Content-Type', 'text/html')
            res.send(`<html>
                <head>
                    <title>Http Cats</title>
                </head>
                <body>
                    <h1>Error: ${error.message}</h1>
                </body>
            </html>`)

            return
        }

        res.status(200)
        res.setHeader('Content-Type', 'text/html')
        res.send(`<html>
                <head>
                    <title>Http Cats</title>
                </head>
                <body>
                    <h1>Results</h1>
                    <ul>
                        ${cats.reduce((lis, cat) => {
            return lis + `<li>
                                <img src="${cat.imageUrl}" />
                                <h2>${cat.code}</h2>
                                <p>${cat.text}</p>
                            </li>`
        }, '')}
                    </ul>
                </body>
            </html>`)
    })
})

app.listen(80)