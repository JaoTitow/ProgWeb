const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
    res.send('iniciun')
    req.requestTime = Date.now()
    console.log(`[${new Date().toISOString()}] Acessado: ${req.method} ${req.url}`);
})

app.get('/about', (req, res) => {
    res.send('about')
    req.requestTime = Date.now()
    console.log(`[${new Date().toISOString()}] Acessado: ${req.method} ${req.url}`);
})

app.post('/data', (req, res) => {
    res.send('data')
    req.requestTime = Date.now()
    console.log(`[${new Date().toISOString()}] Acessado: ${req.method} ${req.url}`);
})

app.get('/users', (req, res) => {
    res.send('users')
    req.requestTime = Date.now()
    console.log(`[${new Date().toISOString()}] Acessado: ${req.method} ${req.url}`);
})

app.get('/users/signin/:userid', (req, res) => {
    res.send(`Bem vindo ${req.params.userid}!`)
    req.requestTime = Date.now()
    console.log(`[${new Date().toISOString()}] Acessado: ${req.method} ${req.url}`);
})

app.get('/users/signin', (req, res) => {
    res.redirect('/users/signup')
    req.requestTime = Date.now()
    console.log(`[${new Date().toISOString()}] Acessado: ${req.method} ${req.url}`);
})

app.get('/users/signup', (req, res) => {
    res.send('signup')
    req.requestTime = Date.now()
    console.log(`[${new Date().toISOString()}] Acessado: ${req.method} ${req.url}`);
})

app.use((req, res) => {
    res.status(404).send(`
      <h1>404 - Página não encontrada</h1>
      <p>A página que você está procurando não existe.</p>
      <a href="/">Voltar para a página inicial</a>
    `)
  })
  
  app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
  })

app.listen(3000, () =>{
    console.log('Server running...')
})